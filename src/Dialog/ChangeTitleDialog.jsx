import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"

export default function ChangeTitleDialog(props) {
    const onClickOverlay = e => {
        if (e.currentTarget === e.target) {
            //props.onClose()
        }
    }

    return (
        ReactDOM.createPortal(
            <div className="overlay" onClick={onClickOverlay}>
                <div className="details">
                    <button className="close" onClick={props.onClose}>×</button>
                </div>
            </div>,
            document.getElementById("window")
        )
    )
}
