const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const userRoutes = require("./routes/UserRoutes");
const todosRoutes = require("./routes/TodoListRoutes");
const CategoriesRoutes = require("./routes/CategoriesRoutes");


require('dotenv').config()

const app = express()
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
       console.log('Base de donnée MongoDB est connecté')

        /* Initialisation du server Express js */
        app.use(cors())
        app.use(logger('dev'))
        app.use(express.json())
        //app.use(cookieParser)
        app.use(express.urlencoded({ extended: true }))
        app.use(express.static(path.join(__dirname, 'public')))

        /* Initialisation du gestionnaire d'erreur global express js */
        // app.use((err, req, res) => {
        //     // locals est uniquement definis en mode developpement
        //     res.locals.message = err.message
        //     res.locals.error = req.app.get('env') === 'development' ? err: {}
        //
        //     // rendu de la page d'erreur
        //     res.status(err.status || 500)
        //     res.render('error')
        // })

        /* Interception des erreurs 404 et les transmet au gestionnaire d'erreur */
        // app.use((req, res, next) => {
        //     next(createError(404))
        // })

        // Route de vérification du serveur
        app.get('/healthcheck', (req, res) => {
            res.send('API Health Check OK')
        })

        /* chargement des routes */

        // Chargement des routes pour User. Base URL = api/user (==> http://localhost:3000/api/users )
        // const userRoutes = require('./routes/userRoutes')
        app.use('/api/users', userRoutes)

        // Chargement des routes pour TodoList. Base URL = api/todos (==> http://localhost:3000/api/todos )
        // const todoRoutes = require('./routes/todosRoutes')
         app.use('/api/todos', todosRoutes)

        // Chargement des routes pour la partie Catégorie. Base URL = api/todos (==> http://localhost:3000/api/categorie )
        // const CategoriesRoutes = require('./routes/CategoriesRoutes')
        app.use('/api/categorie', CategoriesRoutes)

        // Lance le serveur
        app.listen(process.env.PORT, ()=> {
            console.log(`Le serveur écoute sur http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err) => console.log(err))


