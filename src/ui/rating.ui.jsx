import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar'

export default function RatingView({ rating }) {
    return (
        <CircularProgressbarWithChildren
            className=" h-full w-full"
            value={rating}
            maxValue={10}
            strokeWidth={12}
            styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: -0.1,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'round',

                // Text size
                textSize: '16px',

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors

                pathColor:
                    rating > 6 ? `#06D001` : rating > 4 ? '#FFDB5C' : '#C80036',
                textColor: 'red',
                trailColor: 'white',
                backgroundColor: 'red',
            })}
        >
            <h1 className=" p-3 text-black font-semibold">
                {Number.isInteger(rating) ? `${rating}.0` : rating}
            </h1>
        </CircularProgressbarWithChildren>
    )
}
