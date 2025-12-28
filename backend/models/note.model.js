const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // userId: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }

    // createdOn:{type:Date, default:new Date().getTime()}
},)
//{ timestamps: true }


module.exports = mongoose.model("Note", noteSchema)