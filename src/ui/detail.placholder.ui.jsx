import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function DetailPlaceHolder() {
    return (
        <div className=" flex gap-6 overflow-x-auto  p-44">
            <Skeleton className="h-[30rem] rounded-xl w-72 " />
            <div>
                <Skeleton className=" w-72  mt-8 " />
                <Skeleton className=" w-72 " />
                <Skeleton className=" w-72  mt-8 " />
                <Skeleton className=" w-72 " />
                <Skeleton className="  w-52  mt-8 " />
                <Skeleton className=" w-28 " />
            </div>
        </div>
    )
}
export default DetailPlaceHolder
