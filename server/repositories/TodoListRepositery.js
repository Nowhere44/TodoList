const TodoList = require('../models/TodoListModel')

/**
 * @typedef {object} TodolistPayloadType
 * @property {string} title
 * @property {string} description
 * @property {Boolean} isCompleted
 * @property {Date} createdAt
 */

class TodoListRepositery{
    // #private/ _protected /public stand for nothing
    #model;

    constructor() {
        this.#model = TodoList
    }

    /**
     * Creation d'une nouvelle tache
     * @param { TodolistPayloadType } TodolistCreatePayload
     */
    create(TodolistCreatePayload) {
        const newTask = new this.#model(TodolistCreatePayload)
        return newTask.save()
    }

    findAll() {
        return this.#model.find()
    }

    /**
     * Ici l'id est UUID
     * @param {string} id
     */
    findById(id) {
        return this.#model.findById(id)
    }


    findAllByisCompleted() {
        const query = { isCompleted: true }
        return this.#model.findAll(query)

    }

    /**
     *
     * @param {string} id
     */
    deleteById(id) {
        return this.#model.findByIdAndDelete(id)
    }

    /**
     * Creation d'un nouvel utilisateur
     * @param {string} id
     * @param { TodolistPayloadType } TodoListUpdatePayload
     */
    updatedTaskById(id, TodolistUpdatePayload) {
        const query = { _id: id }
        return this.#model.findOneAndUpdate(query, {
            $set: {
                title: TodolistUpdatePayload.title,
                description: TodolistUpdatePayload.description,
                isCompleted: TodolistUpdatePayload.isCompleted,
            }
        })
    }
}

module.exports = new TodoListRepositery()