import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { cronTrigger, checkMonitor } from "@/lib/inngest/functions";

// Create an API that serves zero-serverless functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        cronTrigger, // The Scheduler
        checkMonitor // The Worker
    ],
});
