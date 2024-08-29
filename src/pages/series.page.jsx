import { useQuery } from 'react-query'
import HorizontalListView from '../components/horizontal.components'
import CategorySelector from '../ui/category-selector'
import MovieUi from '../ui/movie.holder'
import { useState } from 'react'
async function getMoviesList(gerns) {
    let url =
        'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
    let tem = gerns.join(',')
    url = url + '&with_genres=' + tem

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzhjMTA3OTg5NTllYTQ5YzNhNzhhYzNiZjc2OGYyOSIsIm5iZiI6MTcyMDMxNzQwNC40MTExODcsInN1YiI6IjY2NzkzM2FmZDY3ZDVjMmUwNWVlODEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gUq0ybvaSLHzAcGRk8mBrxxn4w1CbN6-tRBVeGKn1fE',
        },
    }
    const res = await fetch(url, options)
    const data = await res.json()
    return data
}

function SeriesPage() {
    const [genres, setGenres] = useState([])
    const { data, isLoading } = useQuery({
        queryKey: [genres, 'series'],
        queryFn: () => getMoviesList(genres),
    })
    console.log('all movies :  ', data)
    return (
        <>
            {isLoading && (
                <div className=" absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
                    <span className=" loader"></span>
                </div>
            )}
            <div className="  text-white  pt-20">
                <div className=" flex gap-2 justify-end p-2 ">
                    <CategorySelector setGenres={setGenres} />
                </div>
                {!isLoading && (
                    <div className=" flex-wrap  flex gap-6 p-5 mt-9">
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
                                    type={1}
                                    name={title}
                                    image={poster_path}
                                    date={release_date}
                                    rating={vote_average}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default SeriesPage
