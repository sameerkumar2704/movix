import { useState } from 'react'
import HorizontalListView from '../components/horizontal.components'
import BackgroudBlurImage from '../ui/bg-color-blur.ui'
import { Link, useNavigate } from 'react-router-dom'

export default function HomePage() {
    const [search_movie, setSearchMovie] = useState('')
    const navigator = useNavigate()

    return (
        <>
            <BackgroudBlurImage
                src={'https://wallpapercave.com/wp/wp5770334.jpg'}
                hashcode={'LE7.5WfQMxfQ?waykCfQ%Mf6WBfQ'}
            >
                <div className="bg-gradient-to-b from-transparent via-40%  via-indigo-950  to-indigo-950">
                    <div className=" pt-80 gap-8 text-white flex flex-col justify-center items-center ">
                        <div className=" text-center">
                            <h1 className=" text-6xl font-bold tracking-wider ">
                                Welcome.
                            </h1>
                            <h1>
                                Millions of movies, TV shows and people to
                                discover. Explore now
                            </h1>
                        </div>

                        <div className=" max-sm:w-[80vw] max-sm:h-10 w-[60vw] h-16 rounded-full bg-white flex  overflow-hidden">
                            <input
                                value={search_movie}
                                onChange={(e) => setSearchMovie(e.target.value)}
                                className=" py-3 px-8 text-black outline-none border-none  flex-1"
                                type="text"
                                onKeyDown={(e) => {
                                    if (e.key.toLowerCase() === 'enter')
                                        navigator(
                                            `/search?target=${search_movie}`
                                        )
                                }}
                                placeholder="search movie || tv show"
                            />
                            <Link
                                to={`/search?target=${search_movie}`}
                                className=" max-sm:py-2 max-sm:px-4  bg-gradient-to-r from-yellow-600 to-red-500 py-5 text-lg px-10 "
                            >
                                search
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className=" mt-36">
                            <HorizontalListView
                                title={'trending'}
                                layoutID={'a'}
                                category={'homepage'}
                                current_item_id={null}
                            />
                            <HorizontalListView
                                title={'popular'}
                                layoutID={'b'}
                                category={'homepage'}
                                current_item_id={null}
                            />
                        </div>
                    </div>
                </div>
            </BackgroudBlurImage>
        </>
    )
}
