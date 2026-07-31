import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { adminStatus, adminLogout, updateSection } from "../api/admin";
import { getContent } from "../api/content";

const SECTION_LABELS = {
    siteTitle: "Site Title",
    navbar: "Navbar",
    hero: "Hero",
    trust: "Trust / Logos",
    stats: "Stats",
    about: "About",
    services: "Services",
    sectors: "Sectors",
    whyUs: "Why Us",
    network: "Network",
    testimonials: "Testimonials",
    cta: "Call To Action",
    footer: "Footer",
};

function Field({ label, value, onChange, type = "text", multiline = false, rows = 3 }) {
    return (
        <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    className="w-full px-3 py-2 border border-gray-200 focus:border-primary outline-none text-sm font-mono"
                />
            ) : (
                <input
                    type={type}
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 focus:border-primary outline-none text-sm font-mono"
                />
            )}
        </div>
    );
}

function ObjectEditor({ data, onChange, depth = 0 }) {
    if (typeof data !== "object" || data === null) {
        return (
            <Field
                label="Value"
                value={String(data ?? "")}
                onChange={(v) => {
                    try {
                        onChange(JSON.parse(v));
                    } catch {
                        onChange(v);
                    }
                }}
            />
        );
    }

    if (Array.isArray(data)) {
        return (
            <div className="space-y-3">
                {data.map((item, i) => (
                    <div key={i} className="border border-gray-100 p-3 bg-gray-50">
                        <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                            Item #{i + 1}
                        </div>
                        <ObjectEditor
                            data={item}
                            depth={depth + 1}
                            onChange={(v) => {
                                const next = [...data];
                                next[i] = v;
                                onChange(next);
                            }}
                        />
                        <button
                            onClick={() => onChange(data.filter((_, idx) => idx !== i))}
                            className="mt-2 text-xs text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    onClick={() => onChange([...data, {}])}
                    className="text-xs text-primary hover:underline"
                >
                    + Add item
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {Object.entries(data).map(([key, value]) => {
                const isPrimitive =
                    typeof value === "string" || typeof value === "number" || typeof value === "boolean";
                return (
                    <div key={key}>
                        {isPrimitive ? (
                            <Field
                                label={key}
                                value={String(value)}
                                multiline={typeof value === "string" && value.length > 60}
                                onChange={(v) => {
                                    let parsed = v;
                                    if (typeof value === "number") parsed = Number(v) || 0;
                                    else if (typeof value === "boolean") parsed = v === "true";
                                    onChange({ ...data, [key]: parsed });
                                }}
                            />
                        ) : (
                            <details className="border border-gray-100 bg-gray-50 p-3" open={depth < 1}>
                                <summary className="cursor-pointer text-xs uppercase tracking-wider text-primary font-medium">
                                    {key}
                                </summary>
                                <div className="mt-3 pl-3 border-l border-gray-200">
                                    <ObjectEditor
                                        data={value}
                                        depth={depth + 1}
                                        onChange={(v) => onChange({ ...data, [key]: v })}
                                    />
                                </div>
                            </details>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function AdminEditor() {
    const [content, setContent] = useState(null);
    const [activeSection, setActiveSection] = useState("hero");
    const [sectionDraft, setSectionDraft] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [authChecked, setAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const status = await adminStatus();
                if (!status || !status.authenticated) {
                    navigate("/admin/login");
                    return;
                }
            } catch {
                // Treat as unauthenticated only on real auth failure
                navigate("/admin/login");
                return;
            }
            setAuthChecked(true);
            try {
                const data = await getContent();
                setContent(data);
            } catch (e) {
                setMessage("✗ " + e.message);
            }
        })();
    }, [navigate]);

    useEffect(() => {
        if (content && activeSection) {
            setSectionDraft(JSON.parse(JSON.stringify(content[activeSection] ?? {})));
        }
    }, [content, activeSection]);

    const onSave = async () => {
        setSaving(true);
        setMessage("");
        try {
            await updateSection(activeSection, sectionDraft);
            setContent({ ...content, [activeSection]: sectionDraft });
            setMessage("✓ Saved to database");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("✗ " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const onLogout = async () => {
        await adminLogout();
        navigate("/admin/login");
    };

    if (!authChecked || !content) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading editor...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-serif text-primary">{content.siteTitle} — Admin</h1>
                    <a
                        href="/"
                        target="_blank"
                        className="text-xs text-accent hover:underline uppercase tracking-wider"
                    >
                        ↗ Preview live site
                    </a>
                </div>
                <button
                    onClick={onLogout}
                    className="text-xs uppercase tracking-wider text-gray-500 hover:text-primary cursor-pointer"
                >
                    Logout
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto p-4">
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                        Sections
                    </div>
                    {Object.entries(SECTION_LABELS).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveSection(key)}
                            className={`block w-full text-left px-3 py-2 mb-1 text-sm transition ${activeSection === key
                                ? "bg-primary text-white"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </aside>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-serif text-primary">
                                {SECTION_LABELS[activeSection]}
                            </h2>
                            <div className="flex items-center gap-3">
                                {message && (
                                    <span className="text-sm text-gray-600">{message}</span>
                                )}
                                <button
                                    onClick={onSave}
                                    disabled={saving}
                                    className="px-6 py-2 bg-primary text-white text-sm uppercase tracking-wider hover:bg-primary-light transition disabled:opacity-50"
                                >
                                    {saving ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 p-6">
                            <ObjectEditor
                                data={sectionDraft ?? {}}
                                onChange={setSectionDraft}
                            />
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 text-sm text-blue-900">
                            <strong>Heads up:</strong> Changes are saved to the D1 database immediately.
                            Refresh the homepage <a href="/" className="underline">here</a> to see them live.
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
