import { motion } from "framer-motion";
import Icon from "./Icon";

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: "easeOut",
        },
    },
};

export default function Testimonials({ data }) {
    return (
        <section className="section-padding bg-secondary/30">
            <div className="container-custom">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent text-xs md:text-sm font-medium tracking-[0.25em] uppercase">
                        {data.badge}
                    </span>

                    <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                        {data.heading}
                    </h2>

                    <div className="divider mt-6" />
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
                >
                    {data.items.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.25 },
                            }}
                            className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary/10 hover:shadow-2xl"
                        >
                            {/* Quote */}
                            <div className="flex items-center justify-between mb-6">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 group-hover:bg-primary transition-colors duration-300">
                                    <Icon
                                        name="format_quote"
                                        size={30}
                                        className="text-primary group-hover:text-white transition-colors"
                                    />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <Icon
                                            key={index}
                                            name="star"
                                            filled
                                            size={16}
                                            className="text-yellow-400"
                                        />
                                    ))}
                                </div>

                            </div>

                            {/* Testimonial */}
                            <p className="text-gray-600 text-base leading-8 font-light mb-8">
                                “{t.quote}”
                            </p>

                            {/* Author */}
                            <div className="border-t border-gray-100 pt-6 flex items-center justify-between">

                                <div>
                                    <h4 className="text-lg font-semibold text-primary">
                                        {t.name}
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {t.role}
                                    </p>
                                </div>

                                <span className="text-sm font-medium text-accent text-right">
                                    {t.company}
                                </span>

                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}