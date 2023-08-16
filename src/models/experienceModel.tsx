import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    company: {
        type: String,
        required: [true, "Please provide the company name"],
    },
    startYear: {
        type: String,
        required: [true, "Please provide the start year"],
    },
    endYear: {
        type: String,
    },
    role: {
        type: String,
        required: [true, "Please provide the role"],
    },
    positionType: {
        type: String,
        enum: ["internship", "full-time"],
        required: true,
    },
});

const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
export default Experience;
