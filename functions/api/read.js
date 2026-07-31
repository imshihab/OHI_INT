export async function onRequestGet(context) {
    const { env } = context;

    try {
        // Query D1 for the JSON text stored in row id = 1
        const row = await env.DB.prepare(
            "SELECT data FROM site_content WHERE id = 1"
        ).first();

        // If the row exists, parse it. Otherwise, return an empty object fallback.
        const siteData = row && row.data ? JSON.parse(row.data) : {};

        return new Response(JSON.stringify(siteData), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        });
    } catch (error) {
        // Return 500 error if database connection/query fails
        return new Response(
            JSON.stringify({ error: "Failed to fetch data from database", details: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
