export default class Media
{
    title: string
    path: string
    date: Date
    type: string
    duration: number
    rate: number
    thumbs: string[]
    tags: string[]
    
    constructor(title: string, path: string, date: Date, type: string, rate: number, duration: number) {
        this.title = title
        this.path = path
        this.date = date
        this.type = type
        this.duration = duration
        this.rate = rate
        this.thumbs = []
        this.tags = []
    }
}
