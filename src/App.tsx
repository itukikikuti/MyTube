import fs from "fs"
import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { mediaDB, tagDB, historyDB } from "./Database"
import List from "./List"
import State from "./State"
import Media from "./Media"

function reducer(state: any, action: any) {
    console.log(action)

    switch (action.type) {
        case "sortMediaList":
            state.mediaList = [...action.mediaList]
            break

        case "addMedia":
            mediaDB.add(action.media)
            state.medias = [...state.medias, action.media]
            state.mediaList = [...state.mediaList, action.media.title]
            break
            
        case "updateMedia":
            mediaDB.update({ title: action.media.title }, action.media)
            const i = state.medias.findIndex((media: Media) => media.title === action.media.title)
            state.medias[i] = action.media
            break

        case "addTag":
            tagDB.add({ tag: action.tag })
            state.tags = [...state.tags, { tag: action.tag }]
            break

        case "removeTag":
            tagDB.remove({ tag: action.tag })
            state.tags = state.tags.filter((tag: { tag: string }) => tag.tag !== action.tag)
            break

        case "addHistory":
            historyDB.add(action.history)
            state.histories = [...state.histories, action.history]
            break
            
        case "currentMedia":
            state.current = action.title
            break
    }
    return { ...state }
}

function App() {
    const path = fs.readFileSync("./config.dat");

    return <List path={path} />
}

async function init() {
    const initialState: State = {
        medias: await mediaDB.find({}),
        mediaList: [],
        tags: await tagDB.find({}),
        histories: await historyDB.find({}),
        current: null,
    }

    const store = createStore(reducer, initialState)
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"))
}

init()
