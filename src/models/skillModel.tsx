import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    skillsToAdd: [String],
})

const Skill = mongoose.models.skills || mongoose.model("skills", skillSchema);

export default Skill;