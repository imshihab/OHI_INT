import { useState } from "react";
import { useNavigate } from "react-router";
import { adminLogin } from "../api/admin";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await adminLogin(username, password);
            navigate("/admin");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-10 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="heading-2 text-primary">Admin Login</h1>
                    <p className="text-gray-500 text-sm mt-2 font-light">
                        Sign in to edit your landing page
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-200 focus:border-primary outline-none text-sm"
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-200 focus:border-primary outline-none text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm bg-red-50 border border-red-100 px-3 py-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary text-white text-sm uppercase tracking-[0.2em] hover:bg-primary-light transition disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-xs text-gray-400 hover:text-primary uppercase tracking-wider"
                    >
                        ← Back to site
                    </a>
                </div>
            </div>
        </div>
    );
}