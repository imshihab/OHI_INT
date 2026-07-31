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

export async function onRequestPost(context) {
    const { request, env } = context;
    const { username, password } = await request.json();

    if (
        username !== env.ADMIN_USER ||
        password !== env.ADMIN_PASS
    ) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const exp = Date.now() + 1000 * 60 * 60 * 8; // 8 hours
    const payload = `${username}.${exp}`;
    const sig = await hmac(env.SESSION_SECRET, payload);
    const token = `${payload}.${sig}`;

    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `admin_session=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${60 * 60 * 8}`,
        },
    });
}
