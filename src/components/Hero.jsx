import { useEffect, useState } from "react";

function Particle({ style }) {
    return (
        <div
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={style}
        />
    );
}

export default function Hero({ data }) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const seeds = Array.from({ length: 12 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            offset: (Math.random() - 0.5) * 60,
            duration: 4 + Math.random() * 4,
        }));
        setParticles(seeds);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-primary">
            <div className="absolute inset-0 bg-primary video-watermark-cover overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    playsInline
                    preload="auto"
                    muted
                    loop
                    style={{ opacity: 0.7 }}
                    onError={(e) => {
                        const video = e.currentTarget;
                        const source = video.querySelector("source");
                        if (source && !source.dataset.fallback) {
                            source.dataset.fallback = "true";
                            source.src =
                                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
                            video.load();
                        }
                    }}
                >
                    <source src={data.video} type="video/mp4" />
                </video>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p, i) => (
                    <Particle
                        key={i}
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            animation: `float ${p.duration}s ease-in-out infinite`,
                            transform: `translateY(${p.offset}px)`,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/50 to-primary/90 pointer-events-none" />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
                <div className="mb-4 sm:mb-6 md:mb-8">
                    <img
                        alt="hero logo"
                        className="h-16 sm:h-18 md:h-20 w-auto object-contain mx-auto"
                        src={data.logo}
                    />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white mb-3 sm:mb-4 tracking-wider text-center px-4">
                    <span className="inline-block">{data.titlePart1}</span>
                    <span className="inline-block ml-3">{data.titlePart2}</span>
                </h1>

                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 md:mb-12 font-light tracking-[0.2em] sm:tracking-[0.3em] text-center uppercase px-4">
                    {data.subtitle.map((item, i) => (
                        <span key={item}>
                            {i > 0 && (
                                <span className="text-white/40"> | </span>
                            )}
                            <span className="inline-block mx-2">{item}</span>
                        </span>
                    ))}
                </div>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-8 sm:mb-10 md:mb-12 font-light text-center max-w-xl lg:max-w-2xl px-4">
                    {data.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
                    <a
                        href={data.primaryCta.href}
                        className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-white text-primary font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm transition-all duration-500 hover:bg-gray-100 text-center"
                    >
                        {data.primaryCta.text}
                    </a>
                    <a
                        href={data.secondaryCta.href}
                        className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-transparent border border-white/50 text-white font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm transition-all duration-500 hover:bg-white hover:text-primary backdrop-blur-sm text-center"
                    >
                        {data.secondaryCta.text}
                    </a>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center mouse-scroll-container">
                        <div className="w-0.5 h-3 bg-white/70 rounded-full mt-2 scroll-mouse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
