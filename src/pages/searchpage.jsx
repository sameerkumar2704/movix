import React, { memo, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MovieUi from '../ui/movie.holder'
import Toogle from '../ui/toogl'
import Card from '../ui/card'
async function getSearchView(query, type) {
    const url = `https://api.themoviedb.org/3/search/${type === 0 ? 'movie' : 'tv'}?api_key=b78c10798959ea49c3a78ac3bf768f29&query=${query}`
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
export default function SearchPage() {
    const [search_tag] = useSearchParams()
    const [type, setType] = useState(0)
    const [search_movie, setSearchMovie] = useState(search_tag.get('target'))
    const navigator = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: [search_tag, type, search_movie],
        queryFn: async () => {
            const res = await getSearchView(search_movie, type)
            console.log('rs', res)
            return res
        },
    })

    const ToogleUiMemo = memo(() => (
        <Toogle layout={4} id={type} setId={setType} />
    ))
    const SearchView = memo(() => (
        <div
            style={{ visibility: !isLoading && 'hidden' }}
            className=" -z-10 absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center"
        >
            <span className=" loader"></span>
        </div>
    ))

    return (
        <div className=" mt-20 flex flex-col items-end gap-10 p-5">
            <div className=" self-center max-sm:w-[80vw] max-sm:h-10 w-[60vw] h-16 rounded-full bg-white flex  overflow-hidden">
                <input
                    value={search_movie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                    className=" py-3 px-8 text-black outline-none border-none  flex-1"
                    type="text"
                    onKeyDown={(e) => {
                        search_tag.set('target', search_movie)
                        if (e.key.toLowerCase() === 'enter') {
                            navigator(`/search?target=${search_movie}`)
                            console.log('down')
                        }
                    }}
                    placeholder="search movie || tv show"
                />
            </div>

            <div
                style={{
                    visibility:
                        (data?.total_results === 0 || isLoading) && 'hidden',
                }}
            >
                <ToogleUiMemo />
            </div>
            <SearchView />
            {data?.total_results === 0 && search_movie.length > 0 && (
                <Card
                    title={'not found '}
                    content={`please search a valid movie name or related word`}
                />
            )}
            {data?.total_results === 0 && search_movie.length == 0 && (
                <Card content={`🔎 search your favourte 🎥 title 😁 `} />
            )}

            <div className=" w-full flex flex-wrap justify-center gap-5 ">
                {data?.results.map(
                    ({
                        id,
                        vote_average,
                        release_date,
                        title,
                        poster_path,
                    }) => (
                        <MovieUi
                            id={id}
                            type={0}
                            name={title}
                            image={poster_path}
                            date={release_date}
                            rating={vote_average}
                        />
                    )
                )}
            </div>
        </div>
    )
}
