import { motion } from "framer-motion";
import Icon from "./Icon";

const leftVariant = {
    hidden: {
        opacity: 0,
        x: -60,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const rightContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const rightItem = {
    hidden: {
        opacity: 0,
        x: 50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function Network({ data }) {
    return (
        <section id="rede-global" className="section-padding bg-white">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-accent text-xs md:text-sm tracking-[0.25em] uppercase font-medium">
                        {data.badge}
                    </span>

                    <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                        {data.heading}
                    </h2>

                    <div className="divider mt-6" />

                    <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-8 font-light">
                        {data.description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

                    {/* LEFT */}
                    <motion.div
                        variants={leftVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <div className="overflow-hidden rounded-3xl shadow-xl">
                            <img
                                src={data.image}
                                alt="Commercial port"
                                className="w-full h-80 md:h-105 object-cover"
                            />
                        </div>

                        <motion.div
                            variants={rightContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8"
                        >
                            {data.cities.map((city) => (
                                <motion.div
                                    key={city}
                                    variants={rightItem}
                                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-3"
                                >
                                    <div className="w-3 h-3 rounded-full bg-accent shrink-0" />

                                    <span className="text-sm md:text-base text-gray-700 font-medium">
                                        {city}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        variants={rightContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-6"
                    >
                        {data.routes.map((r, i) => (
                            <motion.div
                                key={i}
                                variants={rightItem}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between">

                                    <div className="flex gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                                            <Icon
                                                name={r.icon}
                                                size={22}
                                                className="text-primary"
                                            />
                                        </div>

                                        <div>

                                            <div className="flex items-center gap-3 text-lg font-semibold text-primary">

                                                <span>{r.from}</span>

                                                <Icon
                                                    name="arrow_forward"
                                                    size={18}
                                                    className="text-accent"
                                                />

                                                <span>{r.to}</span>

                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {r.mode}
                                            </p>

                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 ml-16 flex flex-wrap gap-8">

                                    <div className="flex items-center gap-2 text-gray-500">

                                        <Icon
                                            name="schedule"
                                            size={16}
                                        />

                                        <span className="text-sm">
                                            {r.duration}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500">

                                        <Icon
                                            name="sync"
                                            size={16}
                                        />

                                        <span className="text-sm">
                                            {r.frequency}
                                        </span>

                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}