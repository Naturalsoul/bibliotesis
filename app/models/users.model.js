let db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let UsersSchema = new Schema ({
    id: Number,
    name: {type: String, default: ""},
    email: String,
    password: String,
    tesisGroup: {type: String, default: ""},
    creationDate: {type: Date, default: Date.now},
    status: {type: Boolean, default: false},
    activationString: {type: String, default: ""},
    student: {type: Boolean, default: true},
    changePassword: {type: Boolean, default: false}
})

UsersSchema.plugin(autoIncrement.plugin, {
    model: "Users",
    field: "id",
    startAt: 0,
    incrementBy: 1
})

module.exports = db.model("Users", UsersSchema)