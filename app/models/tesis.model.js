let db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let TesisSchema = new Schema ({
    id: Number,
    studyGroup: String,
    title: {type: String, default: ""},
    date: Date,
    abstract: {type: String, default: ""},
    keywords: {type: Array, default: []},
    files: {type: Object, default: {}},
    score: {type: Number, default: 1},
    status: {type: Boolean, default: false},
    showInRepository: {type: Boolean, default: false},
    creationDate: {type: Date, default: Date.now}
})

TesisSchema.plugin(autoIncrement.plugin, {
    model: "Tesis",
    field: "id",
    startAt: 0,
    incrementBy: 1
})

module.exports = db.model("Tesis", TesisSchema)