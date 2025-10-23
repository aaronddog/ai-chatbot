import { registerOTel } from "@vercel/otel";

declare const EdgeRuntime: string | undefined;

export async function register() {
  if (typeof window === "undefined" && typeof EdgeRuntime === "undefined") {
    const initializeImportName = 'dd-trace/initialize.mjs';
    await import(/* webpackIgnore: true */ initializeImportName as 'dd-trace/initialize.mjs')
  }
  registerOTel({ serviceName: "ai-chatbot" });
}
