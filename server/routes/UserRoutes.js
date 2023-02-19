const express = require('express')
const userRoutes = express.Router()
const userRepository = require('../repositories/UserRepository')

/**
 * @typedef {object} userPayloadType
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string[]} roles
 */

// http://localhost:3000/api/users/
 userRoutes.get('/', (req, res) => {
     userRepository.findAll()
         .then((users) => {
             res.json(users)
         })
         .catch((error) => console.log(error))
 });

userRoutes.get('/', (req, res) => {
    res.send('API USERS Health Check OK')
})
// http://localhost:3000/api/users/
userRoutes.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log('OK');
    /** @type { userPayloadType } */
    const newUserPayload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        roles: ['ROLE_USER'],
    }

    userRepository.create(newUserPayload)
        .then((user) => {
            console.log('OK');
            const responseUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user._id
            }
            res.status(200).json(responseUser)
        })
        .catch((error) => console.log(error))
})

userRoutes.delete('/:userid', (req, res) => {
  const { id } = req.params
  userRepository.deleteById(id)
      .then((ok) => {
          console.log(ok)
          console.log(`Utilisateur avec l'id ${id} supprimé.`)
          res.status(204).json([])
      })
      .catch((error) => console.log(error))
})

userRoutes.put('/:userid', (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, password } = req.body
    /** @type { userPayloadType } */
    const updateUserPayload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        //roles: ['ROLE_USER'],
    }
    userRepository.updatedById(id,updateUserPayload)
        .then((ok) => {
            console.log(ok)
            console.log(`Utilisateur avec l'id ${id} a été modifié.`)
            res.status(200).json([])
        })
        .catch((error) => console.log(error))
})

userRoutes.get('/:userid', (req, res) => {
    const { userid } = req.params
    userRepository.findById(userid)
        .then((user) => {
            res.status(200).json(user)

        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({message:"BD error"})
        })

})

userRoutes.get('/find/:userEmail', (req, res) => {
    const { userEmail } = req.params
    userRepository.findByEmail(userEmail)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({message:"BD error"})
        })




})

module.exports = userRoutes




