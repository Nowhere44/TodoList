const express = require('express')
const TodolistRoutes = express.Router()
const TodolistRepositery = require('../repositories/TodoListRepositery')

/**
 * @typedef {object} TodolistPayloadType
 * @property {string} title
 * @property {string} description
 * @property {Boolean} isCompleted
 * @property {Date} createdAt
 */

// http://localhost:3000/api/tasks/
TodolistRoutes.get('/', (req, res) => {
    TodolistRepositery.findAll()
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((error) => console.log(error))
});

// http://localhost:3000/api/tasks/
TodolistRoutes.post('/', (req, res) => {
    const { title, description, isCompleted } = req.body

    /** @type { TodolistPayloadType } */
    const newTaskPayload = {
        title: title,
        description: description,
        isCompleted: isCompleted,
    }

    TodolistRepositery.create(newTaskPayload)
        .then((task) => {
            const newTaskPayload = {
                title: task.title,
                description: task.description,
                isCompleted: task.isCompleted,
            }
            res.json(newTaskPayload)
        })
        .catch((error) => console.log(error))
})

TodolistRoutes.delete('/:taskid', (req, res) => {
    const { id } = req.params
    TodolistRepositery.deleteById(id)
        .then((ok) => {
            console.log(ok)
            console.log(`La tache avec l'id ${id} a été supprimé.`)
            res.status(204).json([])
        })
        .catch((error) => console.log(error))
})

TodolistRoutes.put('/:taskid', (req, res) => {
    const { id } = req.params
    const { title,description,isCompleted } = req.body
    /** @type { userPayloadType } */
    const updateTaskPayload = {
        title: title,
        description: description,
        isCompleted: isCompleted,
    }
    TodolistRepositery.updatedTaskById(id,updateTaskPayload)
        .then((ok) => {
            console.log(ok)
            console.log(`la tache avec l'id ${id} a été modifié.`)
            res.status(200).json([])
        })
        .catch((error) => console.log(error))
})

TodolistRoutes.get('/:taskid', (req, res) => {
    const { taskid } = req.params
    TodolistRepositery.findById(taskid)
        .then((task) => {
            res.status(200).json(task)

        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({message:"BD error"})
        })

})

TodolistRoutes.get('/find/:taskisCompeted', (req, res) => {
    const { taskisCompleted } = req.params
    TodolistRepositery.findAllByisCompleted(taskisCompleted)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({message:"BD error"})
        })




})

module.exports = TodolistRoutes
