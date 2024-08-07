export default function ChangeTitleDialog() {
    const overlay = document.createElement("div")
    overlay.className = "overlay"
    overlay.onclick = e => {
        if (e.currentTarget === e.target) {
            document.getElementById("window")?.removeChild(overlay)
        }
    }
    document.getElementById("window")?.appendChild(overlay)

    const details = document.createElement("div")
    details.className = "details"
    overlay.appendChild(details)

    const button = document.createElement("button")
    button.className = "close"
    button.textContent = "×"
    button.onclick = () => document.getElementById("window")?.removeChild(overlay)
    details.appendChild(button)
}
