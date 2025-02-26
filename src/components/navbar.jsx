import { motion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { MdCancel } from 'react-icons/md'
import { RiMenu3Fill, RiMovie2Fill } from 'react-icons/ri'
import { useMediaQuery } from 'react-responsive'
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
const arr = [
    { title: 'Movie', link: '/showMovies' },
    { title: 'TvShows', link: '/showSeries' },
]
const Icons = memo(function () {
    return (
        <div className=" cursor-pointer flex gap-2 justify-center items-center">
            <div className=" p-1 rounded-full bg-gradient-to-tr from-yellow-600 to-red-500">
                <RiMovie2Fill className=" size-5 fill-white" />
            </div>
            <Link to={'/'}>

                <span className=" bg-clip-text text-3xl font-bold bg-gradient-to-tr from-yellow-600 to-red-500 text-transparent">
                    Movie
                </span>
            </Link>
        </div>
    )
})

function NavBar() {
    const [id, setId] = useState(-1)
    const [slide, setSlide] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            if (window.scrollY > 300) {
                setSlide(true)
            } else {
                setSlide(false)
            }
        })
    })

    const path = useLocation()
    const isMobile = useMediaQuery({
        query: '(max-width:640px)',
    })

    const [visible, setVisibilty] = useState(false)

    useEffect(() => {
        switch (path.pathname) {
            case '/showMovies':
                setId(0)
                return
            case '/showSeries':
                setId(1)
                return
            default:
                setId(-1)
        }
    }, [path])
    return (
        <>
            <nav
                className={twMerge(
                    ` duration-500   items-center z-40 fixed h-fit top-0 right-0 left-0 backdrop-blur-sm bg-black/30 flex justify-center gap-[50%] py-3 ${slide && ' -translate-y-96 delay-100  duration-1000'}`
                )}
            >
                <Icons />
                {(visible || !isMobile) && (
                    <ul className="   max-sm:fixed max-sm:m-20 left-0 right-0 max-sm:p-4  top-0 max-sm:h-[80vh] max-sm:bg-blue-800 max-sm:flex-col  items-center flex gap-6 text-white  text-lg">
                        {isMobile && (
                            <MdCancel
                                className=" fill-red-600"
                                onClick={() => setVisibilty(false)}
                            />
                        )}
                        {arr.map((curr, index) => (
                            <motion.li
                                key={curr.link}
                                transition={{
                                    duration: 0.2,
                                }}
                                onClick={() => {
                                    setId((val) => index)
                                    setVisibilty(false)
                                }}
                                className=" relative cursor-pointer "
                            >
                                <NavLink to={curr.link}>{curr.title}</NavLink>
                                {index === id && (
                                    <motion.div
                                        layoutId="underline"
                                        className=" rounded-md mt-2 absolute bottom-0  left-0 right-0 h-1 bg-yellow-600"
                                    ></motion.div>
                                )}
                            </motion.li>
                        ))}

                    </ul>
                )}
                <RiMenu3Fill
                    className=" fill-white max-sm:block hidden"
                    onClick={() => setVisibilty((curr) => !curr)}
                />
            </nav>
            {<Outlet />}
        </>
    )
}
export default NavBar
