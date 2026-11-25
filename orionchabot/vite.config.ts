import { defineConfig, type Connect } from "vite";
import react from "@vitejs/plugin-react";
import type { ServerResponse } from "node:http";

// Middleware que serve POST /api/chat invocando o handler da Vercel Function
// local, com um adapter mínimo (headers/body).
function apiMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (!req.url?.startsWith("/api/chat")) return next();

    let body = "";
    for await (const chunk of req) body += chunk;
    const parsedBody = body ? safeParse(body) : {};

    const headers: Record<string, string | string[] | undefined> = {};
    for (const [k, v] of Object.entries(req.headers)) headers[k.toLowerCase()] = v;

    const vercelReq = { method: req.method, body: parsedBody, headers };
    const vercelRes = adaptRes(res);

    try {
      const mod = await import("./api/chat.ts");
      await mod.default(vercelReq, vercelRes);
    } catch (e) {
      console.error("[dev api] erro:", e);
      if (!res.writableEnded) {
        res.statusCode = 500;
        res.end("internal error");
      }
    }
  };
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}

function adaptRes(res: ServerResponse) {
  return {
    status(code: number) { res.statusCode = code; return this; },
    setHeader(name: string, value: string) { res.setHeader(name, value); return this; },
    write(chunk: string) { return res.write(chunk); },
    end(data?: string) { res.end(data); },
  };
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "orion-chat-api",
      configureServer(server) {
        server.middlewares.use(apiMiddleware());
      },
    },
  ],
  server: { port: 5173 },
});
