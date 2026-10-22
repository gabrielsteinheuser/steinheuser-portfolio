const ALLOWED_EVENTS = new Set([
  "page_view",
  "project_open",
  "project_visit",
  "whatsapp_orcamento",
  "whatsapp_flutuante",
  "instagram",
  "linkedin",
]);

export async function onRequestPost({ request, env }) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 2048) return new Response(null, { status: 413 });

    const payload = await request.json();
    if (!ALLOWED_EVENTS.has(payload.event)) {
      return new Response(null, { status: 400 });
    }

    const path = typeof payload.path === "string" ? payload.path.slice(0, 160) : "/";
    const project = typeof payload.project === "string" ? payload.project.slice(0, 80) : "";

    if (env.ANALYTICS) {
      env.ANALYTICS.writeDataPoint({
        indexes: [payload.event],
        blobs: [payload.event, path, project],
        doubles: [1],
      });
    }

    return new Response(null, {
      status: 204,
      headers: { "cache-control": "no-store" },
    });
  } catch {
    return new Response(null, { status: 400 });
  }
}

export function onRequest() {
  return new Response(null, {
    status: 405,
    headers: { allow: "POST", "cache-control": "no-store" },
  });
}
