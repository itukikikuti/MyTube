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
