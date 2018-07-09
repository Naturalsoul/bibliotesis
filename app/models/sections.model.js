let db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let SectionsSchema = new Schema ({
    id: Number,
    code: String,
    teachersName: String,
    teachersEmail: String,
    creationDate: {type: Date, default: Date.now}
})

SectionsSchema.plugin(autoIncrement.plugin, {
    model: "Sections",
    field: "id",
    startAt: 0,
    incrementBy: 1
})

module.exports = db.model("Sections", SectionsSchema)