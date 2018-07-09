let db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let AdvancesSchema = new Schema ({
    id: Number,
    advanceNumber: {type: Number, default: 0},
    studyGroup: String,
    description: String,
    date: Date,
    files: {type: Object, default: {}},
    feedback: {type: String, default: ""},
    status: {type: Boolean, default: false},
    creationDate: {type: Date, default: Date.now}
})

AdvancesSchema.plugin(autoIncrement.plugin, {
    model: "Advances",
    field: "id",
    startAt: 0,
    incrementBy: 1
})

module.exports = db.model("Advances", AdvancesSchema)