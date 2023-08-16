import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    about: {
        type: String,
        required: [true, "Please tell us about yourself"],
    }
})





const About = mongoose.models.about || mongoose.model("about", aboutSchema);

export default About;