# Claude pull-request review

AIWA runs Claude only on pull requests, after the existing `test` job succeeds. Merging
to `main` remains a deliberate human action because Railway may deploy that merge
immediately.

## Model policy

- `aiwa-review-sonnet-5` (Claude Sonnet 5) with high effort is the default reviewer.
- When an allow-listed maintainer adds the `deep-review` label, that label event reruns
  CI and uses `aiwa-review-opus-5` (Claude Opus 5) instead.
- A deep review replaces the Sonnet run for that event; it does not pay for both models.
- Push and synchronize events always use Sonnet, even while the label remains. A new
  Opus review therefore requires an explicit maintainer label action for that revision.

The dedicated aliases are resolved by AIWA's LiteLLM gateway to OpenRouter. The GitHub
runner performs only the Claude Code client work; inference runs upstream, not on GitHub
or on the LiteLLM VPS.

## Security and cost controls

The review job:

- runs on GitHub-hosted `ubuntu-latest`; this repository is public, so standard runner
  usage is not billed;
- runs only for pull requests targeting `main`;
- ignores draft pull requests, forks, and authors outside
  `OWNER`/`MEMBER`/`COLLABORATOR`;
- sends the bounded PR diff in one forced-schema model request instead of running an
  open-ended coding agent;
- treats the pull-request title and diff as untrusted data;
- uses a read-only checkout and never executes code from the review step;
- can post PR comments but cannot write repository contents;
- reaches LiteLLM through an SSH tunnel with a pinned server host key;
- uses a dedicated SSH key restricted to forwarding `127.0.0.1:4000`;
- uses a dedicated LiteLLM virtual key restricted to the two review aliases, at most
  two parallel requests, and a `$25` budget per 30 days.
- skips a duplicate model call when the same model has already reviewed the same commit
  SHA.

## Required repository configuration

An administrator must add:

| Kind | Name | Value |
| --- | --- | --- |
| Actions secret | `AIWA_REVIEW_SSH_KEY` | Private key for the restricted tunnel user |
| Actions secret | `AIWA_REVIEW_LITELLM_KEY` | Dedicated budget-limited LiteLLM virtual key |
| Actions secret | `AIWA_REVIEW_REPORT_SSH_KEY` | Forced-command key that can read aggregate reviewer spend only |
| Actions variable | `AIWA_CLAUDE_REVIEW_ENABLED` | `true` after both secrets are present |
| Actions variable | `AIWA_CLAUDE_DEEP_REVIEW_ACTORS` | Comma-separated GitHub logins allowed to trigger Opus |
| Actions variable | `AIWA_CLAUDE_SPEND_ISSUE` | Issue number used as the aggregate spend dashboard |

Keep the variable unset or set to `false` until both credentials and both model aliases
have passed a smoke test. No provider or SSH secret belongs in Git.
Set the variable back to `false` for an immediate reviewer kill switch.

## Spend visibility

Every run publishes the model, request count, input/output tokens, and estimated cost in
two places:

- the GitHub Actions run summary;
- a short usage comment on the pull request.

The reviewer fetches current public OpenRouter token prices for the estimate and falls
back to configured prices if that lookup fails. LiteLLM enforces the dedicated
`$25 / 30d` key budget; the OpenRouter billing dashboard is authoritative for the
provider charge.

The separate `Claude reviewer spend` workflow publishes an aggregate dashboard to one
GitHub issue after each successful review and once daily. It reads LiteLLM's actual
spend logs through a second SSH key whose only permitted server command is the
root-owned reporting script. The dashboard shows today, 7-day and 30-day totals,
per-model usage, daily history, budget remaining, and the next reset. It never exports
prompts, model responses, API keys, or individual spend-log records.

For a strict pre-merge gate, require both `test` and `Claude review` in the `main` branch
ruleset. The reviewer reports findings; a human still decides whether they block merge.

## Delivery sequence

1. Develop and test in a feature branch.
2. Open a pull request; CI runs without touching Railway production.
3. After tests pass, Claude reviews the same PR revision.
4. For high-risk changes, add `deep-review` and exercise the exact commit in staging.
5. Merge only after CI, review, and the relevant staging checks are complete.
6. Treat the resulting Railway deployment as production and keep a rollback commit or
   release available.
