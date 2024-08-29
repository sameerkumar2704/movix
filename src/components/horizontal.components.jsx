import { motion } from 'framer-motion'
import MovieUi from '../ui/movie.holder'
import Toogle from '../ui/toogl'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import PlaceHolder from '../ui/placeholder.ui'

async function getRecommedation(id, type) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=b78c10798959ea49c3a78ac3bf768f29`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzhjMTA3OTg5NTllYTQ5YzNhNzhhYzNiZjc2OGYyOSIsIm5iZiI6MTcyMDA5OTU5NC40NzcwMDUsInN1YiI6IjY2NzkzM2FmZDY3ZDVjMmUwNWVlODEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b4oFeLjxz58OgwSTBafrIjiRzjXrL1k_8gPP_Cu-tck',
        },
    }

    const res = await fetch(url, options)
    const data = await res.json()

    return data
}
async function getData(id, title) {
    const url =
        title === 'trending'
            ? `https://api.themoviedb.org/3/trending/${id}/day?api_key=b78c10798959ea49c3a78ac3bf768f29&language=en-US`
            : `https://api.themoviedb.org/3/${id}/popular?api_key=b78c10798959ea49c3a78ac3bf768f29&language=en-US&page=2`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzhjMTA3OTg5NTllYTQ5YzNhNzhhYzNiZjc2OGYyOSIsIm5iZiI6MTcxOTIxOTU2Mi43NjAwMzgsInN1YiI6IjY2NzkzM2FmZDY3ZDVjMmUwNWVlODEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y-SN-MzGTZVMtDPwowtSUXV81cmVEiLp9cCZZ0EC--U',
        },
    }

    const response = await fetch(url, options)
    let data = await response.json()
    data.results = data.results.filter(
        ({ original_language }) => original_language === 'en'
    )
    return data
}
export default function HorizontalListView({
    layoutID,
    title,
    category,
    current_item_id,
    current_item_type,
}) {
    const [type, setType] = useState(0)
    const isMobile = useMediaQuery({
        query: '(max-width:950px)',
    })
    const { data, isLoading } = useQuery([title, type], async () => {
        if (category === 'homepage')
            return await getData(type === 0 ? 'movie' : 'tv', title)
        if (category === 'recommendation')
            return await getRecommedation(current_item_id, current_item_type)
    })

    return (
        <>
            <motion.div id={layoutID} className=" flex  justify-center ">
                <div className=" max-xl:w-full flex flex-col gap-5 w-[90vw]">
                    {category === 'homepage' && (
                        <div className=" p-4 flex justify-between items-center">
                            <h1 className=" text-lg text-white capitalize">
                                {title}
                            </h1>
                            <Toogle
                                isLoading={isLoading}
                                layout={layoutID}
                                id={type}
                                setId={setType}
                            />
                        </div>
                    )}

                    {isLoading && <PlaceHolder />}
                    <div className="overflow-x-scroll p-3 overflow-hidden  flex  gap-5 justify-centre   ">
                        {!isLoading &&
                            data?.results
                                .slice(0, isMobile ? data.length : 6)
                                .map(
                                    ({
                                        poster_path,
                                        original_name,
                                        first_air_date,
                                        vote_average,
                                        original_title,
                                        release_date,
                                        id,
                                    }) => (
                                        <MovieUi
                                            key={id}
                                            type={type}
                                            id={id}
                                            image={poster_path}
                                            name={
                                                original_title || original_name
                                            }
                                            date={
                                                release_date || first_air_date
                                            }
                                            rating={vote_average}
                                        />
                                    )
                                )}
                    </div>
                </div>
            </motion.div>
        </>
    )
}
