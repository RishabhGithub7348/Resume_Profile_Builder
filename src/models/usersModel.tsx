import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    number: {
        type: String,
        required: [true, "Please provide a number"],
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;