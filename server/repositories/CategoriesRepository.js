const Categories = require('../models/CategoriesModel')

/**
 * @typedef {object} CategoriesPayloadType
 * @property {string} type
 * @property {string} CategoriesDescription
 * @property {Date} createdAt
 */

class CategoriesRepository{
    // #private/ _protected /public stand for nothing
    #model;

    constructor() {
        this.#model = Categories
    }

    /**
     * Creation d'une nouvelle categorie
     * @param { CategoriesPayloadType } CategoriesCreatePayload
     */
    create(CategoriesCreatePayload) {
        const newCategories = new this.#model(CategoriesCreatePayload)
        return newCategories.save()
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
     * @param {string} id
     */
    deleteById(id) {
        return this.#model.findByIdAndDelete(id)
    }

    /**
     * Creation d'une nouvelle categorie
     * @param {string} id
     * @param { CategoriesCreatePayload } CategoriesCreatePayload
     */
    updatedCategoriesById(id, CategoriesUpdatePayload) {
        const query = { _id: id }
        return this.#model.findOneAndUpdate(query, {
            $set: {
                type: CategoriesUpdatePayload.type,
                description: CategoriesUpdatePayload.description,
            }
        })
    }
}

module.exports = new CategoriesRepository()