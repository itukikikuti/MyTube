import fs from "fs"
import NEDB from "nedb"

class Database {
    constructor(path) {
        this.nedb = new NEDB({ filename: path })
        this.nedb.loadDatabase()
    }

    has(query) {
        return new Promise((resolve, reject) => {
            this.nedb.count(query, (error, count) => {
                if (error !== null) {
                    reject(error)
                    return
                }

                if (count > 1) {
                    throw "error"
                }

                resolve(count === 1)
            })
        })
    }

    count(query) {
        return new Promise((resolve, reject) => {
            this.nedb.count(query, (error, count) => {
                if (error !== null) {
                    reject(error)
                    return
                }

                resolve(count)
            })
        })
    }

    find(query) {
        return new Promise((resolve, reject) => {
            this.nedb.find(query, (error, documents) => {
                if (error !== null) {
                    reject(error)
                    return
                }

                resolve(documents)
            })
        })
    }

    update(query, document) {
        this.nedb.update(query, document)
    }

    add(document) {
        this.nedb.insert(document)
    }

    remove(document) {
        this.nedb.remove(document)
    }
}

const path = fs.readFileSync("./config.dat");

export const mediaDB = new Database(`${path}/data/media.db`)
export const tagDB = new Database(`${path}/data/tag.db`)
export const historyDB = new Database(`${path}/data/history.db`)
