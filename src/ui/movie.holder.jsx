import { useNavigate } from 'react-router'
import RatingView from './rating.ui'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import image_placeholder_not_found from '../assets/photo.png'
import image_loading from '../assets/wait.png'
import { twMerge } from 'tailwind-merge'
function MovieUi({ id, name, date, rating, image, type }) {
    let src = `https://image.tmdb.org/t/p/original${image}`
    const navigate = useNavigate()
    const view = {
        hidden: {
            filter: 'blur(10px)',
        },
        visible: {
            filter: 'blur(0px)',
        },
    }
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        const temp = new Image()
        temp.onload = () => {
            setLoad(true)
        }
        temp.onerror = () => {
            setError(true)
        }
        temp.src = src
        return () => {
            // Cleanup: prevent memory leaks
            temp.onload = null
            temp.onerror = null
            setLoad(false)
            setError(false)
        }
    }, [src])
    return (
        <motion.div
            onClick={() => {
                navigate(`/movie/1?id=${id}&type=${type}`)
                setLoad((curr) => !curr)
            }}
            className=" xl:w-48 shrink-0   w-52  text-white "
        >
            <div className=" overflow-hidden  h-[24rem]  grid grid-rows-11     ">
                <motion.div
                    variants={view}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 'some' }}
                    className=" overflow-hidden  col-start-1 row-start-1 rounded-xl row-span-10"
                >
                    <img
                        key={id}
                        className={twMerge(
                            ` w-full h-full object-cover object-center  ${!load && 'object-contain'}`
                        )}
                        src={
                            (load && !error && src) ||
                            (error && image_placeholder_not_found) ||
                            image_loading
                        }
                    />
                </motion.div>
                <div className=" z-20 ml-3 w-14 bg-white rounded-full h-fit p-1  col-start-1 row-start-10 row-span-2">
                    <RatingView rating={Number(rating.toFixed(1))} />
                </div>
            </div>
            <h1 className=" text-xl line-clamp-1">{name}</h1>
            <h1 className=" font-normal text-sm text-gray-500">{date}</h1>
        </motion.div>
    )
}
export default MovieUi
