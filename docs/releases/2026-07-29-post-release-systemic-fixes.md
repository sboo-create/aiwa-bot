# AIWA post-release systemic fixes

## Production safety action

On 2026-07-29 `AIWA_VOICE_REPLY=0` was set for the Railway production
`worker`. Railway redeployed the unchanged production commit `7537197`; health
returned `ok`, the event writer was alive, and failures/dropped events remained
zero. Speech recognition and text replies remain enabled. Only the TTS copy is
disabled.

## Root causes and fixes

### Internal suggestions in visible replies

The parser accepted only one exact uppercase Russian marker. Providers can
return lowercase, Markdown, English, full-width punctuation, or append the
marker to the previous line.

The follow-up envelope is now parsed as protocol data with provider-tolerant
variants and stripped again at the final delivery boundary. This covers main
chat, onboarding, partner and direct reply paths.

### Static “about AIWA” response to ordinary complaints

The substring `зачем ты` was treated as an “about the product” intent. A
complaint such as “Зачем ты отправляешь заглушку?” therefore returned the static
capabilities card. That broad trigger is removed; explicit capability questions
still use the deterministic card.

### Audio differs from the visible text

The TTS fallback used a process-wide “last spoken text” map. A concurrent rich
message could replace the value before synthesis. The new implementation keeps
the exact visible text in the context of one voice request. TTS is opt-in and
remains disabled in production until an explicit text/audio parity canary
passes.

### Food confirmation and artwork

After a verified write the bot now adds a short deterministic macro analysis.
It uses only persisted calories and macros and does not add another LLM call,
latency or cost.

Drink classification now uses the record content as stronger evidence than a
wrong generated class. Existing records are repaired on read, so an old
“Кедровый кофе” entry gets the drink artwork without rewriting user history.
Mixed records such as “чай с сахаром, ватрушка” remain mixed.

An LLM title without nutritional or portion evidence is no longer enough to
write a row. This prevents generic zero-value records such as `Снек` or
`нет данных`; a narrow allowlist keeps legitimate zero-calorie water, tea and
coffee usable.

Unknown diary foods no longer fuzzy-match the small curated dish-image
manifest. Exact known dishes retain their image, beverages use the local drink
asset, and other unknown foods use the neutral local placeholder. Per-request
image generation is intentionally not part of the journal path.

The post-release image pipeline should be hybrid:

1. map the cleaned record to a stable taxonomy and canonical food id;
2. render a local category asset immediately;
3. enqueue one deduplicated background generation only when the canonical id
   has no approved image;
4. validate dimensions/content, convert to bounded WebP and publish through a
   versioned content-addressed cache;
5. reuse that asset across users and phrasings;
6. apply daily spend/concurrency limits plus a negative cache for generic,
   unsafe or unclassifiable labels.

Only the canonical food id and reviewed style prompt may leave the application;
raw user text, profile and chat history must not be sent to the image job.
Generation failure must never delay or fail the diary write.

### Mini-app navigation, dates and cache

The Telegram button URL for `Открыть дневник` carries `tab=food`, and the
bootstrap maps it to the food screen. Both the module entrypoint and its
transitive bundle import now carry the same release cache key. This matters
because i167 serves `/assets` as immutable: versioning only `main.js` could
leave the large imported bundle stale indefinitely.

The current date is supplied by the authenticated API in `Europe/Moscow`.
Questions such as `какая сегодня дата` are answered by deterministic server
code, never by the language model. Decimal quantities such as `0.35` are not
accepted by the date parser.

### Notifications

Morning summaries and proactive suggestions are now separate preferences.
Disabling a morning summary removes both preparation and delivery jobs; manual
`/today` and the mini app remain available. The setting is exposed in the mini
app and in the bot’s additional-settings menu.

### Pilates

Pilates is a first-class workout type in the activity logger instead of being
hidden under yoga. Suggested Pilates plans are mapped back to Pilates when
opened in the logger.

## Exercise media follow-up

Exercise GIFs should not be added as arbitrary remote links. The safe
implementation is a curated local manifest keyed by stable exercise IDs, with:

- owned or licensed media stored with the application;
- one short loop and one static fallback per exercise;
- movement name, contraindication note and accessibility caption;
- download-size limits and lazy loading;
- no user-dependent remote URL fetching.

No media files are included in this package because a licensed/approved asset
set has not been provided. The UI and training logic should not invent or
hotlink exercise demonstrations.

## Verification and rollout

Automated checks:

- Python compile check;
- JavaScript syntax check;
- 258 application and statistics tests;
- 18 focused regressions for the reported post-release cases.

The automated suite uses mocks and local SQLite databases: external AI calls
and test-model spend are `$0`.

Staging acceptance on i167:

1. Ask an ordinary question and verify no `СЛЕДУЮЩИЕ`/`Suggestions` marker is
   visible.
2. Send “Зачем ты отправляешь заглушку?” and verify it is answered as a
   complaint, not with the capabilities card.
3. Send a voice question: transcription and text reply must work; no audio copy
   should be sent while TTS is disabled.
4. Log `кедровый кофе 400 мл`; verify drink artwork, the correct meal slot and a
   short analysis.
5. Log `чай с сахаром и ватрушка`; verify it remains a mixed meal.
6. Toggle morning summaries off/on and verify both scheduler jobs disappear and
   reappear while proactive messages keep their independent value.
7. Open activity logging and record Pilates as Pilates.
8. Smoke-test male, cycle and non-cycle profiles plus food/activity/home
   navigation.

This package does not change the request worker, queues or provider-concurrency
architecture, so another large load run is not required. After staging
acceptance: open the PR, finish ordinary review/CI, merge, deploy Railway, then
verify health, Telegram smoke tests, notification scheduling and statistics.
