import { useParams } from 'react-router'
import BackgroudBlurImage from '../ui/bg-color-blur.ui'
import BlurBox from '../ui/blur.ui'
import Genre from '../ui/genre.ui'
import Title from '../ui/title.ui'
import DetailBox from '../ui/detail-box.ui'
import HorizontalListView from '../components/horizontal.components'

import SvgAnimation from '../ui/video.play.ui'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import DetailPlaceHolder from '../ui/detail.placholder.ui'
import PlaceHolder from '../ui/placeholder.ui'
import ReactPlayer from 'react-player'
import { useMediaQuery } from 'react-responsive'

function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} hr ${remainingMinutes} min`
}
async function getVideo(id, type) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=b78c10798959ea49c3a78ac3bf768f29`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzhjMTA3OTg5NTllYTQ5YzNhNzhhYzNiZjc2OGYyOSIsIm5iZiI6MTcxOTc2MDE0OS4xNDYxOCwic3ViIjoiNjY3OTMzYWZkNjdkNWMyZTA1ZWU4MTMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.av05pERdDKAoN0lCmzSw8to7YShfcRzL0UiGnhGwinI',
        },
    }
    const res = await fetch(url, options)
    const data = await res.json()
    return data
}
const playerConfig = {
    youtube: {
        playerVars: {
            disablePictureInPicture: true,
        },
    },
}
async function getCurrentId(id, type) {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=b78c10798959ea49c3a78ac3bf768f29`
    console.log(url)
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzhjMTA3OTg5NTllYTQ5YzNhNzhhYzNiZjc2OGYyOSIsIm5iZiI6MTcxOTc2MDE0OS4xNDYxOCwic3ViIjoiNjY3OTMzYWZkNjdkNWMyZTA1ZWU4MTMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.av05pERdDKAoN0lCmzSw8to7YShfcRzL0UiGnhGwinI',
        },
    }

    const res = await fetch(url, options)
    const data = await res.json()
    return data
}
export default function Detail() {
    const { id } = useParams()
    const isMobile = useMediaQuery({
        query: '(max-width:1100px)',
    })
    const [searchParam, setSearchParam] = useSearchParams()
    const [showTrailer, setVisibleTrailer] = useState(false)
    const category = searchParam.get('type') == 0 ? 'movie' : 'tv'
    console.log(category)
    const { isLoading, data } = useQuery({
        queryKey: [searchParam.get('id')],
        queryFn: async () => {
            const data = await getCurrentId(searchParam.get('id'), category)
            return data
        },
    })

    const { data: movie_data, isLoading: movie_isLoading } = useQuery({
        queryKey: ['video' + searchParam.get('id')],
        queryFn: async () => {
            const data = await getVideo(searchParam.get('id'), category)
            return data
        },
    })
    if (!movie_isLoading) console.log('movie data', movie_data, data)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [data])

    return (
        <>
            {showTrailer && (
                <div className=" flex justify-center items-center fixed right-0 bottom-0 left-0 top-0 backdrop-blur-sm z-30  ">
                    <div className="  text-white flex flex-col justify-end items-end gap-2">
                        <button
                            onClick={() => setVisibleTrailer((curr) => !curr)}
                            className="  bg-red-600 px-3 py-1 rounded-md"
                        >
                            close
                        </button>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${movie_data?.results[0].key}`}
                            className="react-player bg-white"
                            playing={false}
                            controls={true}
                            width={isMobile ? '90vw' : '40vw'}
                            height={isMobile ? '40vh' : '40vh'}
                            config={playerConfig}
                        />
                    </div>
                </div>
            )}
            {isLoading && (
                <>
                    <DetailPlaceHolder />
                    <div className=" flex flex-col  gap-36">
                        <PlaceHolder />
                        <PlaceHolder />
                    </div>
                </>
            )}
            {!isLoading && (
                <BackgroudBlurImage
                    src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
                >
                    <div className=" h-full bg-gradient-to-b from-transparent via-50%  via-indigo-950  to-indigo-950">
                        <div className=" max-lg:px-6  flex  h-fit max-lg:flex-col text-white  gap-14 pt-32 px-48">
                            <img
                                src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                                className=" shrink-0 w-80 h-[30rem]  rounded-xl"
                            />
                            <div className=" flex flex-col gap-4">
                                <h1 className=" font-semibold text-3xl ">
                                    {data?.original_title}
                                </h1>
                                <h1 className=" text-xl italic font-semibold text-gray-500">
                                    Make room for new emotions.
                                </h1>

                                <div className=" flex gap-1">
                                    {data?.genres?.map((curr) => (
                                        <Genre value={curr.name} />
                                    ))}
                                </div>
                                {movie_data?.results[0]?.key && (
                                    <SvgAnimation
                                        setVisibleTrailer={setVisibleTrailer}
                                    />
                                )}

                                <h1 className=" text-2xl capitalize">
                                    overview
                                </h1>
                                <p className=" text-sm">{data?.overview}</p>
                                <div className=" flex flex-col gap-3">
                                    <DetailBox>
                                        <Title
                                            heading={'status'}
                                            content={[data?.status]}
                                        />
                                        <Title
                                            heading={'Release Date'}
                                            content={[data?.release_date]}
                                        />
                                        <Title
                                            heading={'Runtime'}
                                            content={[
                                                convertMinutesToHours(
                                                    data?.runtime
                                                ),
                                            ]}
                                        />
                                    </DetailBox>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-32">
                            <HorizontalListView
                                key={searchParam.get('id')}
                                current_item_type={category}
                                current_item_id={searchParam.get('id')}
                                category={'recommendation'}
                            />
                        </div>
                    </div>
                </BackgroudBlurImage>
            )}
        </>
    )
}
