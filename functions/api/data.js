import seedData from "../db/data.json";

export async function onRequestGet(context) {
    return new Response(JSON.stringify(seedData), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
}
