# Claude pull-request review

AIWA runs Claude only on pull requests, after the existing `test` job succeeds. Merging
to `main` remains a deliberate human action because Railway may deploy that merge
immediately.

## Model policy

- `aiwa-review-sonnet-5` (Claude Sonnet 5) with high effort is the default reviewer.
- Adding the `deep-review` label reruns CI and uses `aiwa-review-opus-5`
  (Claude Opus 5) instead.
- A deep review replaces the Sonnet run for that event; it does not pay for both models.

The dedicated aliases are resolved by AIWA's LiteLLM gateway to OpenRouter. The GitHub
runner performs only the Claude Code client work; inference runs upstream, not on GitHub
or on the LiteLLM VPS.

## Security and cost controls

The review job:

- runs on GitHub-hosted `ubuntu-latest`; this repository is public, so standard runner
  usage is not billed;
- ignores draft pull requests, forks, and authors outside
  `OWNER`/`MEMBER`/`COLLABORATOR`;
- uses a pinned Claude Code Action commit and a read-only checkout;
- can post PR comments but cannot write repository contents;
- reaches LiteLLM through an SSH tunnel with a pinned server host key;
- uses a dedicated SSH key restricted to forwarding `127.0.0.1:4000`;
- uses a dedicated LiteLLM virtual key restricted to the two review aliases, at most
  two parallel requests, and a `$25` budget per 30 days.

## Required repository configuration

An administrator must add:

| Kind | Name | Value |
| --- | --- | --- |
| Actions secret | `AIWA_REVIEW_SSH_KEY` | Private key for the restricted tunnel user |
| Actions secret | `AIWA_REVIEW_LITELLM_KEY` | Dedicated budget-limited LiteLLM virtual key |
| Actions variable | `AIWA_CLAUDE_REVIEW_ENABLED` | `true` after both secrets are present |

Keep the variable unset or set to `false` until both credentials and both model aliases
have passed a smoke test. No provider or SSH secret belongs in Git.
Set the variable back to `false` for an immediate reviewer kill switch.

## Spend visibility

Every run publishes the model, estimated cost, turn count, permission denials, and result
in two places:

- the GitHub Actions run summary;
- a short usage comment on the pull request.

The per-run value comes from Claude Code's `total_cost_usd` result and is an estimate.
LiteLLM enforces the dedicated `$25 / 30d` key budget; the OpenRouter billing dashboard
is authoritative for the provider charge.

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
