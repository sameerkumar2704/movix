import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const arr = [1, 2, 3, 4, 5, 6]
function PlaceHolder() {
    return (
        <div className=" flex gap-1 overflow-x-auto justify-center">
            {arr.map((_, i) => (
                <div key={i}>
                    <Skeleton className="h-[18rem] rounded-xl  w-44 " />
                    <Skeleton className="  w-52  mt-8 " />
                    <Skeleton className=" w-28 " />
                </div>
            ))}
        </div>
    )
}
export default PlaceHolder
