function Value({ data, start, end }) {
    return (
        <span className=" text-gray-400">
            {start ? '' : ' , '} {data}
        </span>
    )
}
export default function Title({ heading, content }) {
    return (
        <h1 className=" text-md shrink-1  ">
            <span className=" text-lg">{heading + ' :'}</span>
            {content.map((value, i) => (
                <Value
                    data={value}
                    start={i == 0}
                    end={i == content.length - 1}
                />
            ))}
        </h1>
    )
}
