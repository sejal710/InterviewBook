const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    image: { type: String },
    profession: { type: String },
    skills: { type: [String] },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    versionKey: false
});

const userModel = mongoose.model("User", userSchema);

module.exports = {userModel};
