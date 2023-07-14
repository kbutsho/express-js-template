const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
        maxLength: [100, "name is too large!"]
    },
    email: {
        type: String,
        required: [true, "email is required!"],
        unique: true,
        validate: [validator.isEmail, "provide valid email"],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        maxLength: [11, "provide a valid phone number!"],
        minLength: [11, "provide a valid phone number!"],
        required: [true, "phone number is required!"],
        unique: true,
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: [true, "password is required!"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 4,
                    maxLength: 15,
                    minLowercase: 1,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1
                }),
            message: "provide strong password!"
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "confirm password is required!"],
        validate: {
            validator: function (value) {
                return value == this.password
            },
            message: "confirm password not match!"
        }
    },
    status: {
        type: String,
        default: "active",
        enum: {
            values: ["active", "inactive", "block"],
            message: "{VALUE} is not a valid status!"
        },
    }, 
    role: {
        type: String,
        required: [true, "role is required!"],
        enum: {
            values: ["candidate", "manager", "admin"],
            message: "{VALUE} is not a valid role!"
        }
    }
}, {
    timestamps: true
})
userSchema.pre("save", function (next) {
    const password = this.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next()
})
userSchema.methods.comparePassword = (password, hash) => {
    const isPasswordValid = bcrypt.compareSync(password, hash)
    return isPasswordValid;
}
uniqueValidator.defaults.message = '{PATH} {VALUE} already exist!'
userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
module.exports = User;