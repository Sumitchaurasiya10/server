
const TeacherModel = require('../models/teacher')


class TeacherController {

    static display = async(req, res) => {   // async -> promise-based function
        try {
            const data = await ContactModel.find()
            res.json(data)
        } catch(error) {
            console.log(error)
        }
    }

    static create = async(req, res) => {   
        try {
            const {name,email, password} = req.body
            const data = await TeacherModel.create({
                name,
                email,
                password
            })
        } catch(error) {
            console.log(error)
        }
    }

    static view = async(req, res) => {
        try {
            const id = req.params.id
            const data = await TeacherModel.findById(id)
            res.json(data)
        } catch(error) {
            console.log(error)
        }
    }

    static update = async(req, res) => {
        try {
            const id = req.params.id
            const {name, email, password} = req.body
            const data = await TeacherModel.findByIdAndUpdate(id, {
                name,
                email,
                password
            })

        } catch(error) {
            console.log(error)
        }
    }

}
module.exports = TeacherController