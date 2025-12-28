const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullName: { type: String, required: true },

    // fullName:{type:String},
    email: {
        type: String,
        required: true,
        unique: true
    },

    // email:{type:String},
    // password:{type:String},
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }


    //    createdOn:{type:Date, default:new Date().getTime()}

},)


module.exports = mongoose.model("User", userSchema)