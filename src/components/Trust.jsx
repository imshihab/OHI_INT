export default function Trust({ data }) {
    return (
        <section className="py-12 bg-white border-b border-gray-200">
            <div className="container-custom">
                <p className="text-center text-gray-500 text-xs tracking-[0.2em] uppercase mb-8 font-light">
                    {data.heading}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {data.logos.map((name) => (
                        <div
                            key={name}
                            className="text-gray-500 font-serif text-lg tracking-wider hover:text-primary transition-colors duration-500"
                        >
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
