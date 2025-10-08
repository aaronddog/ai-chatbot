import { registerOTel } from "@vercel/otel";

export function register() {
  if (typeof window === "undefined" && typeof EdgeRuntime === "undefined") {
    require('dd-trace').init({
      llmobs: {
        mlApp: "ai-chatbot",
        agentlessEnabled: true,
      },
      site: "datadoghq.com",
      env: "prod",
    });
  }
  registerOTel({ serviceName: "ai-chatbot" });
}
