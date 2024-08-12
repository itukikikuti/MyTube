import React, { useState, useEffect, MouseEvent, useContext } from "react"
import { StateContext, StateDispatchContext } from "./State"
import Details from "./Details"

export default React.memo(function Item(props: any) {
    const [isPreview, setIsPreview] = useState(false)
    const [isDetails, setIsDetails] = useState(false)
    const [thumbIndex, setThumbIndex] = useState(0)

    const state = useContext(StateContext)
    const dispatch = useContext(StateDispatchContext)

    const media = state.medias.find(media => media.title === props.title)
    const historyCount = state.histories.filter(history => history.title === props.title).length

    useEffect(() => {
        const id = setInterval(() => {
            setThumbIndex(i => {
                i++
                if (i >= media.thumbs.length) i = 0
                return i
            })
        }, 2000)
        return () => clearInterval(id)
    }, [])

    const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.focus({ preventScroll: true })
    }

    const openDetails = () => {
        dispatch({ type: "currentMedia", title: media.title })
        setIsDetails(true)
    }

    const closeDetails = () => {
        dispatch({ type: "currentMedia", title: null })
        setIsDetails(false)
    }
    console.log(media)

    const minutes = Math.floor(media.duration / 60).toString()
    const seconds = ("00" + (media.duration % 60).toString()).slice(-2)

    return <>
        <div className="item" onClick={openDetails}>
            {
                media.type === "video" ? (
                    <div className="thumb" tabIndex={0} onMouseOver={onMouseOver} onFocus={() => setIsPreview(true)} onBlur={() => setIsPreview(false)}>
                        {media.thumbs.length > 0 && <img src={media.thumbs[thumbIndex]} />}
                        {isPreview && <video src={media.path} autoPlay muted loop />}
                        <span className="duration">{minutes}:{seconds}</span>
                    </div>
                ) : (
                    <div className="thumb">
                        <img src={media.path} loading="lazy" />
                    </div>
                )
            }
            <p className="title">{media.title}</p>
            <div className="views">{historyCount}回・{media.date.toLocaleDateString()}</div>
            <div className="rating" data-rate={media.rate} />
        </div>
        {isDetails && <Details title={media.title} onClose={closeDetails} />}
    </>
})
