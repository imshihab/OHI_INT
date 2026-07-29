import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useContent } from "../hooks/useContent";
import Trust from "../components/Trust";
import Stats from "../components/Stats";
import About from "../components/About";

export default function Landing() {
    const { data, loading } = useContent();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar data={data.navbar} />
            <Hero data={data.hero} />
            <Trust data={data.trust} />
            <Stats data={data.stats} />
            <section className="section-padding">
                <About data={data.about} />
            </section>
        </div>
    );
}
