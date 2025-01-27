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


export const defaultOptions = {
    reverse: true,  // reverse the tilt direction
    max: 20,     // max tilt rotation (degrees)
    perspective: 9000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.03,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}
