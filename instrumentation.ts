import { registerOTel } from "@vercel/otel";

const iitmExclusions = [
  /langsmith/,
  /openai\/_shims/,
  /openai\/resources\/chat\/completions\/messages/,
  /openai\/agents-core\/dist\/shims/,
  /@anthropic-ai\/sdk\/_shims/
]

declare const EdgeRuntime: string | undefined;

export async function register() {
  if (typeof window === "undefined" && typeof EdgeRuntime === "undefined") {
    const moduleName = 'node:module';
    const Module = await import(/* webpackIgnore: true */ moduleName as 'node:module')
    Module.register('dd-trace/loader-hook.mjs', import.meta.url, {
      data: { exclude: iitmExclusions }
    })

    const tracerName = 'dd-trace';
    const { default: tracer } = await import(/* webpackIgnore: true */ tracerName as 'dd-trace')
    tracer.init({
      llmobs: {
        mlApp: "ai-chatbot",
        agentlessEnabled: true,
      },
      env: "prod",
    });
  }
  registerOTel({ serviceName: "ai-chatbot" });
}
