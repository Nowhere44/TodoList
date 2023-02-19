const mongoose = require('mongoose')

const CategoriesSchema =  new mongoose.Schema({
    type: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
})



const Categories = mongoose.model('categories', CategoriesSchema )

module.exports = Categories