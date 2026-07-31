export async function onRequestPost() {
    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Set-Cookie": "admin_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0",
        },
    });
}
