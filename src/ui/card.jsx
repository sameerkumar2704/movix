function Card({ title, content }) {
    return (
        <div className=" ring-2 ring-red-400 capitalize bg-white p-4 rounded-md backdrop-blur-sm mx-auto">
            <h1 className=" font-bold text-2xl ">{title}</h1>
            <li>{content}</li>
        </div>
    )
}
export default Card
