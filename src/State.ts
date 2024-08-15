import React, { createContext } from "react"
import History from "./History"
import Media from "./Media"

export default interface State
{
    medias: Media[]
    mediaList: string[]
    tags: { tag: string }[]
    histories: History[]
    current: string | null
}

export const StateContext = createContext<State>(null)
export const StateDispatchContext = createContext<React.Dispatch<any>>(null)
