import { doc } from 'prettier'
import { memo, useEffect, useRef, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import TagBox from './tag-box.ui'
import { MdCancel } from 'react-icons/md'
import { useQuery } from 'react-query'

async function getGenres() {
    let url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

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
const CategorySelector = function ({ setGenres }) {
    const [tag, setTag] = useState([])

    const input_box = useRef(null)
    const [word, setWord] = useState('')
    const [show_auto_complete, setAutoComplete] = useState(false)
    const [initial, setInitial] = useState([])
    const { isLoading } = useQuery({
        queryKey: 'genres-list',
        queryFn: async () => {
            const tem = await getGenres()
            setInitial(tem.genres)
            setArr(tem.genres)
        },
    })

    const [arr, setArr] = useState(initial)

    const parent = useRef(null)
    useEffect(() => {
        if (word.length === 0) {
            const new_arr = initial?.filter((curr) => !tag.includes(curr.id))
            setInitial(new_arr)
            return
        }
        const tem = arr.filter(
            (curr) =>
                curr.name.toLowerCase().includes(word.toLowerCase()) &&
                !tag.includes(curr.id)
        )
        setArr(tem)
    }, [word])
    useEffect(() => {
        const new_arr = initial?.filter((curr) => !tag.includes(curr.id))
        setArr(new_arr)
        setGenres(tag)
        console.log(tag)
    }, [tag])

    return (
        <div
            ref={parent}
            onBlur={() => setAutoComplete(false)}
            className=" relative max-w-[40rem] w-fit  "
        >
            <div
                onClick={() => {
                    input_box.current.focus()
                }}
                className="flex gap-1 divide-white overflow-hidden   justify-center items-center w-fit px-9 p-1 bg-indigo-700 rounded-lg"
            >
                <div className=" flex-wrap flex gap-1">
                    {initial?.map(
                        (curr) =>
                            tag.includes(curr.id) && (
                                <TagBox>
                                    {
                                        <div className=" flex gap-1 items-center">
                                            <span>{curr.name}</span>{' '}
                                            <MdCancel
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    const new_tags = tag.filter(
                                                        (id) => id != curr.id
                                                    )
                                                    setTag(new_tags)
                                                }}
                                            />
                                        </div>
                                    }
                                </TagBox>
                            )
                    )}

                    <input
                        placeholder="select genre"
                        className=" bg-transparent outline-none  "
                        onFocus={(curr) => setAutoComplete(true)}
                        ref={input_box}
                        value={word}
                        type="text"
                        onKeyDown={(e) => {
                            if (e.key.toLowerCase() === 'enter') {
                                const tag = arr.length === 1 ? arr[0] : []
                                console.log(tag)
                                setTag((curr) => [...curr, tag.id])
                                setWord((curr) => '')
                            }
                        }}
                        onChange={(curr) =>
                            setWord((word) => curr.target.value)
                        }
                    />
                </div>

                {show_auto_complete ? (
                    <RiArrowDropUpLine className=" size-7" />
                ) : (
                    <RiArrowDropDownLine className=" size-7" />
                )}
            </div>

            {!isLoading && (
                <div
                    style={{
                        height: !show_auto_complete && '0px',
                        padding: !show_auto_complete && '0px',
                    }}
                    className=" divide-y-2 divide-black/20   rounded-md  flex flex-col items-start mt-1 px-5 bg-white left-0 overflow-hidden right-0 text-black z-30 absolute top-full "
                >
                    {arr?.map((curr) => (
                        <button
                            className=" w-full text-start cursor-pointer"
                            onFocus={() => setAutoComplete(() => true)}
                            onClick={(e) => {
                                setTag((tag_arr) => [...tag_arr, curr.id])
                                setAutoComplete(false)
                            }}
                        >
                            {curr.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
export default CategorySelector
