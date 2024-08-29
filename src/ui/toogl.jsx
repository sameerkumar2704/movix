import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
}
function Toogle({ layout, id, setId, isLoading }) {
    return (
        <div className="  overflow-hidden flex gap-3 p-1 rounded-full bg-white w-fit text-black text-md">
            <div
                onClick={() => {
                    setId(0)
                }}
                className="  rounded-full relative"
            >
                <h1
                    className={twMerge(
                        ' relative z-20 px-4 py-1 transition-all delay-200'
                    )}
                >
                    Movie
                </h1>
                {id === 0 && (
                    <motion.div
                        transition={spring}
                        layoutId={layout}
                        className=" z-10 rounded-full absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-red-600"
                    ></motion.div>
                )}
            </div>
            <div
                onClick={() => {
                    setId(1)
                }}
                className=" rounded-full relative"
            >
                <h1 className={twMerge(' relative z-20 px-4 py-1')}>
                    Tv Series
                </h1>
                {id === 1 && (
                    <motion.div
                        transition={spring}
                        layoutId={layout}
                        className=" rounded-full absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-red-600"
                    ></motion.div>
                )}
            </div>
        </div>
    )
}
export default Toogle
