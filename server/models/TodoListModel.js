const mongoose = require('mongoose')

const TodolistSchema =  new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 255,
        required: [true, "Le titre est obligatoire."]
    },
    description: {
        type: String,
        trim: true,
        min: 3,
        max: 255,
        //required: [true, "La description est obligatoire."]
    },
    isCompleted: {
        type: Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})



const TodoList = mongoose.model('todoList', TodolistSchema )

module.exports = TodoList