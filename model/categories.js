const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        description:{
            type: String,
            required: true,
            maxlength: 2000
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Category", CategorySchema)