export default class Media
{
    constructor(title, path, date, type, rate, duration) {
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
