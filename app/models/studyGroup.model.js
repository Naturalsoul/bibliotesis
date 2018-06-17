let db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let StudyGroupSchema = new Schema ({
    id: Number,
    name: String,
    theme: {type: String, default: ""},
    students: {type: Array, default: []}
})

StudyGroupSchema.plugin(autoIncrement.plugin, {
    model: "Studygroups",
    field: "id",
    startAt: 0,
    incrementBy: 1
})

module.exports = db.model("Studygroups", StudyGroupSchema)