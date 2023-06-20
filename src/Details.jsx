import { exec } from "child_process"
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import History from "./History"

export default function Details(props) {
    const [inputTag, setInputTag] = useState("")

    const videoRef = React.createRef()

    const medias = useSelector(state => state.medias)
    const media = useSelector(state => state.medias.find(media => media.title === props.title))
    const tags = useSelector(state => state.tags)

    const dispatch = useDispatch()

    const handleKeyDown = e => {
        if (e.key === "Escape") {
            props.onClose()
        }
    }

    const onClickOverlay = e => {
        if (e.currentTarget === e.target) {
            props.onClose()
        }
    }

    const play = () => {
        dispatch({ type: "addHistory", history: new History(media.title, new Date()) })

        let command = "\"" + media.path + "\""
        console.log(`exec ${command}`)
        exec(command)
    }

    const addThumb = () => {
        if (videoRef.current === null) {
            return
        }

        const video = videoRef.current
        
        const canvas = document.createElement("canvas")
        canvas.width = (video.videoWidth / video.videoHeight) * 180
        canvas.height = 180

        const ctx = canvas.getContext("2d")
        if (ctx !== null) {
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height)
        }

        const thumb = canvas.toDataURL("image/jpeg", 50)
        console.log("%c ", `background:url(${thumb});background-size:100% 100%;padding:90px 160px;`)

        const temp = { ...media }
        temp.thumbs.push(thumb)
        dispatch({ type: "updateMedia", media: temp })
    }

    const removeThumb = (i) => {
        const temp = { ...media }
        temp.thumbs.splice(i, 1)
        dispatch({ type: "updateMedia", media: temp })
    }

    const loadThumb = async e => {
        if (e.target.files.length === 0) return

        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])

        await waitEvent(reader, "load")

        const image = document.createElement("img")
        image.src = reader.result

        await waitEvent(image, "load")

        const canvas = document.createElement("canvas")
        canvas.width = (image.naturalWidth / image.naturalHeight) * 180
        canvas.height = 180

        const ctx = canvas.getContext("2d")
        if (ctx !== null) {
            ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, canvas.width, canvas.height)
        }

        const thumb = canvas.toDataURL("image/jpeg", 50)
        console.log("%c ", `background:url(${thumb});background-size:100% 100%;padding:90px 160px;`)

        const temp = { ...media }
        temp.thumbs.push(thumb)
        dispatch({ type: "updateMedia", media: temp })
    }

    const waitEvent = (element, type) => {
        return new Promise((resolve) => {
            element.addEventListener(type, () => { resolve() }, { once: true })
        })
    }

    const setRate = (e, rate) => {
        if (e.target.control.checked) {
            rate = 0
        }

        const temp = { ...media }
        temp.rate = rate
        dispatch({ type: "updateMedia", media: temp })
    }

    const onChange = e => {
        setInputTag(e.target.value)
    }

    const addTag = () => {
        console.log("add tag " + inputTag)

        const temp = { ...media }

        if (!temp.tags.includes(inputTag)) {
            temp.tags = [...temp.tags, inputTag]
            dispatch({ type: "updateMedia", media: temp })
    
            if (tags.find(tag => tag.tag === inputTag) == null) {
                dispatch({ type: "addTag", tag: inputTag })
            }
        }
    }

    const removeTag = tag => {
        console.log("remove tag " + tag)

        const temp = { ...media }

        temp.tags = temp.tags.filter(t => t !== tag)
        dispatch({ type: "updateMedia", media: temp })

        if (medias.filter(media => media.tags.includes(tag)).length === 0) {
            dispatch({ type: "removeTag", tag: tag })
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false)
    }, [])

    console.log(media)

    const isVideo = media.type === "video"

    return (
        ReactDOM.createPortal(
            <div className="overlay" onClick={onClickOverlay}>
                <div className="details">
                    <button className="close" onClick={props.onClose}>×</button>
                    <div className="media">
                        {isVideo ? <video src={media.path} controls ref={videoRef} /> : <img src={media.path} />}
                    </div>
                    <div className="info">
                        <p className="title">{media.title}</p>
                        <div className="review">
                            <input id="review5" type="radio" name="review" checked={media.rate == 5} onChange={() => {}} /><label htmlFor="review5" onClick={e => setRate(e, 5)}>♥</label>
                            <input id="review4" type="radio" name="review" checked={media.rate == 4} onChange={() => {}} /><label htmlFor="review4" onClick={e => setRate(e, 4)}>♥</label>
                            <input id="review3" type="radio" name="review" checked={media.rate == 3} onChange={() => {}} /><label htmlFor="review3" onClick={e => setRate(e, 3)}>♥</label>
                            <input id="review2" type="radio" name="review" checked={media.rate == 2} onChange={() => {}} /><label htmlFor="review2" onClick={e => setRate(e, 2)}>♥</label>
                            <input id="review1" type="radio" name="review" checked={media.rate == 1} onChange={() => {}} /><label htmlFor="review1" onClick={e => setRate(e, 1)}>♥</label>
                        </div>
                        {
                            isVideo && <>
                                <button onClick={play}>play</button>
                                <button onClick={addThumb}>add thumb</button>
                                <label className="load"><input type="file" accept="image/*" onChange={loadThumb} />load thumb</label>
                                {media.thumbs.map((thumb, i) => <button key={i} onClick={() => removeThumb(i)}><img style={{height:"50px"}} src={thumb} /></button>)}
                            </>
                        }
                        <div>
                            <p className="date">{media.date.toLocaleString()}</p>
                        </div>
                        <div>
                            <input type="text" onChange={onChange} onKeyDown={e => { if (e.key === "Enter") addTag() }} />
                            <button onClick={addTag}>Add</button>
                            <div className="tags">{media.tags.map(tag => <button key={tag} className="tag" onClick={() => removeTag(tag)}>{tag}</button>)}</div>
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById("window")
        )
    )
}
