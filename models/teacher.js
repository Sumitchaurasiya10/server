const mongoose = require("mongoose")

const TeacherS = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type : String
    },
    password: {
        type: String
    }
})
const TeacherModel = mongoose.model('teacher', TeacherS)
module.exports = TeacherModel