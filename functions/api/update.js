async function hmac(secret, message) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
    return Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

async function isAuthenticated(request, env) {
    const cookie = request.headers.get("Cookie") || "";
    const match = cookie.match(/admin_session=([^;]+)/);
    if (!match) return false;
    const token = match[1];
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [username, expStr, sig] = parts;
    const exp = Number(expStr);
    if (!exp || exp < Date.now()) return false;
    const expected = await hmac(env.SESSION_SECRET, `${username}.${expStr}`);
    return expected === sig;
}

export async function onRequestPost(context) {
    const { request, env } = context;

    if (!(await isAuthenticated(request, env))) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const body = await request.json();
    const { section, data } = body;

    if (!section || data === undefined || data === null) {
        return new Response(
            JSON.stringify({ error: "Invalid payload" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        const row = await env.DB.prepare(
            "SELECT data FROM site_content WHERE id = 1"
        ).first();

        let merged = {};
        if (row) {
            try { merged = JSON.parse(row.data); } catch { merged = {}; }
        } else {
            // Seed row on first write
            await env.DB.prepare(
                "INSERT OR IGNORE INTO site_content (id, data) VALUES (1, ?)"
            )
                .bind("{}")
                .run();
        }
        merged[section] = data;

        await env.DB.prepare(
            "UPDATE site_content SET data = ?, updated_at = datetime('now') WHERE id = 1"
        )
            .bind(JSON.stringify(merged))
            .run();

        return new Response(
            JSON.stringify({ ok: true, section }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store",
                },
            }
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ ok: false, error: String(e.message || e) }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const authed = await isAuthenticated(request, env);
    return new Response(JSON.stringify({ authenticated: authed }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
