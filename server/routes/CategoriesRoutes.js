const express = require('express')
const CategoriesRoute = express.Router()
const CategoriesRepository = require('../repositories/CategoriesRepository')

/**
 * @typedef {object} CategoriesPayloadType
 * @property {string} type
 * @property {string} CategoriesDescription
 * @property {Date} createdAt
 */

// http://localhost:3000/api/categories/
CategoriesRoute.get('/', (req, res) => {
    CategoriesRepository.findAll()
        .then((categorie) => {
            res.json(categorie)
        })
        .catch((error) => console.log(error))
});

// http://localhost:3000/api/categorie/
CategoriesRoute.post('/', (req, res) => {
    const { type, description } = req.body

    /** @type { CategoriePayloadType } */
    const newCategoriePayload = {
        type: type,
        description: description,
    }

    CategoriesRepository.create(newCategoriePayload)
        .then((Categorie) => {
            const newCategorie = {
                type: Categorie.type,
                description: Categorie.description,
            }
            res.json(newCategorie)
        })
        .catch((error) => console.log(error))
})

CategoriesRoute.delete('/:categorieid', (req, res) => {
    const { id } = req.params
    CategoriesRepository.deleteById(id)
        .then((ok) => {
            console.log(ok)
            console.log(`La categorie avec l'id ${id} a été supprimé.`)
            res.status(204).json([])
        })
        .catch((error) => console.log(error))
})

CategoriesRoute.put('/:categorieid', (req, res) => {
    const { id } = req.params
    const { type,description } = req.body
    /** @type { userPayloadType } */
    const updateCategoriePayload = {
        type: type,
        description: description,
    }
    CategoriesRepository.updatedCategoriesById(id,updateCategoriePayload)
        .then((ok) => {
            console.log(ok)
            console.log(`la categorie avec l'id ${id} a été modifié.`)
            res.status(200).json([])
        })
        .catch((error) => console.log(error))
})

CategoriesRoute.get('/:Categorieid', (req, res) => {
    const { taskid } = req.params
    CategoriesRepository.findById(taskid)
        .then((task) => {
            res.status(200).json(task)

        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({message:"BD error"})
        })

})


module.exports = CategoriesRoute
