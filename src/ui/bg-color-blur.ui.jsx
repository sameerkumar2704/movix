import { useEffect, useState } from 'react'
import { Blurhash } from 'react-blurhash'

export default function BackgroudBlurImage({ children, src, hashcode }) {
    const [isimageLoaded, setImgLoaded] = useState(false)
    useEffect(() => {
        const image = new Image()
        image.src = src
        image.onload = () => {
            setImgLoaded(true)
        }
    }, [])
    return (
        <>
            <div
                style={{
                    height: '120vh',
                    width: '100vw',

                    backgroundImage: isimageLoaded ? `url(${src})` : '',
                    backgroundRepeat: 'no-repeat',
                }}
                className="  bg-gray-700 bg-blend-multiply bg-cover bg-center "
            >
                {children}
            </div>
        </>
    )
}
