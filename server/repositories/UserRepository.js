const User = require('../models/UserModel')

/**
 * @typedef {object} userPayloadType
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string[]} roles
 */
class UserRepository {
    #model;

    constructor() {
        this.#model = User
    }

    /**
     * Creation d'un nouvel utilisateur
     * @param { userPayloadType } userCreatePayload
     */
    create(userCreatePayload) {
        const newUser = new this.#model(userCreatePayload)
        return newUser.save()
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

    /**
     *
     * @param {string }email
     */
    findByEmail(email) {
        const query = { email: email }
        return this.#model.findOne(query)
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
     * @param { userPayloadType } userUpdatePayload
     */
    updatedById(id, userUpdatePayload) {
        const query = { _id: id }
        return this.#model.findOneAndUpdate(query, {
            $set: {
                firstName: userUpdatePayload.firstName,
                lastName: userUpdatePayload.lastName,
                email: userUpdatePayload.email,
                password: userUpdatePayload.password,
                roles: userUpdatePayload.roles
            }
        })
    }
}

module.exports = new UserRepository()