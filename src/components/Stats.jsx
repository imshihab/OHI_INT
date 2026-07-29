import Icon from "./Icon";

export default function Stats({ data }) {
    return (
        <section className="py-12 md:py-16 bg-white border-y border-gray-100">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {data.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <Icon
                                name={stat.icon}
                                size={24}
                                className="text-accent mx-auto mb-3"
                            />
                            <p className="text-3xl md:text-4xl font-serif gradient-text mb-1">
                                {stat.number}
                            </p>
                            <p className="text-gray-500 text-sm font-light">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
