export const pVariants = {

    visible: {

        transition: {
            staggerChildren: 0.07
        }
    }
}
export const spanVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,

    }
}

export const motionSettings = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

export const transitions = {
    signIn: { duration: 1, ease: "easeInOut", delay: 0.7 },
    signUp: { duration: 1, ease: "easeInOut", delay: 1.5 },
};

