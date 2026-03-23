// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8cdcca2e3bc86e746257e256ec4543d5@o4510716852895744.ingest.de.sentry.io/4510716863709264",

  // No integrations on initial load — Replay is ~100KB and blocks LCP.
  // Errors are still captured automatically without Replay.
  integrations: [],

  // Sample only 10% of traces in production to reduce overhead
  tracesSampleRate: 0.1,

  // Send default PII for error context
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
