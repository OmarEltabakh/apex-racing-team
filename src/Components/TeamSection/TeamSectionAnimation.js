export const devVariances = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: .5,
            when: "afterChildren",

        }
    }
}

export const childVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeOut",
        }
    }

};
