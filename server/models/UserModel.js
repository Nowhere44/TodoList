const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        min: 3,
        max: 255,
        required: [true, "Le prénom est obligatoire."]
    },
    lastName: {
        type: String,
        trim: true,
        min: 3,
        max: 255,
        required: [true, "Le nom est obligatoire."]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "L'adresse email est obligatoire."],
        unique: true,
        dropDups: true,
        index: true,
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
        select: false,
        required: [true, "Le mot de passe est obligatoire."]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    roles: {
        type: [String],
        default:["ROLE_USER"]
    }
})

userSchema.pre('save', function(next) {
    const user = this
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            user.password = hash
            next()
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = (pass, done) => {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        done(err, isMatch)
    })
}

const User = mongoose.model('User', userSchema )

module.exports = User