export async function getContent() {
    const res = await fetch("/api/data");

    if (!res.ok) throw new Error("Failed to load");

    return res.json();
}
