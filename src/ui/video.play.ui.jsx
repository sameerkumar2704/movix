import React from 'react'
import { motion } from 'framer-motion'

const SvgAnimation = ({ setVisibleTrailer }) => {
    const parent = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.4,
            },
        },
        initial: {
            scale: 1,
        },
        animate: {
            scale: 1,
        },
    }
    const child = {
        hover: {
            stroke: '#FF0080',
            pathLength: [0, 1],
            transition: {
                duration: 0.4,
            },
        },
        initial: {
            stroke: 'white',
            pathLength: 0,
        },
        animate: {
            stroke: 'white',
            pathLength: 1,
        },
    }
    const child2 = {
        hover: {
            color: '#FF0080',
            transition: {
                duration: 0.4,
            },
        },
        initial: {
            color: 'white',
        },
        animate: {
            color: 'white',
        },
    }

    return (
        <motion.div
            variants={parent}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className=" w-fit  flex gap-4 items-center "
            onClick={() => setVisibleTrailer((curr) => !curr)}
        >
            <motion.svg
                className=" size-24"
                variants={parent}
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <defs>
                        <style>{`.cls-1{fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:22px;}`}</style>
                    </defs>
                    <motion.path
                        variants={child}
                        className="cls-1"
                        d="M420,206.66a306.22,306.22,0,0,1,160,0"
                    />
                    <motion.path
                        variants={child}
                        className="cls-1"
                        d="M645.16,232.84C739.77,284.37,804,384.68,804,500c0,167.89-136.09,304-304,304S196,667.89,196,500c0-115.32,64.21-215.63,158.82-267.16"
                    />
                    <motion.path
                        variants={child}
                        className="cls-1"
                        d="M383.36,675a210.31,210.31,0,0,1,0-350"
                    />
                    <motion.path
                        variants={child}
                        className="cls-1"
                        d="M614.6,328.07a206.64,206.64,0,0,1,0,343.86"
                    />
                    <motion.path
                        variants={child}
                        className="cls-1"
                        d="M547.91,526.09l10.6-6.74a22.92,22.92,0,0,0,0-38.7L456.75,416a16.85,16.85,0,0,0-25.89,14.23v139.5A16.85,16.85,0,0,0,456.75,584l54.91-34.87"
                    />
                </g>
            </motion.svg>
            <motion.h1 className=" text-2xl w-fit" variants={child2}>
                Watch Tralier
            </motion.h1>
        </motion.div>
    )
}

export default SvgAnimation
