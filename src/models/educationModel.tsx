import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    university: {
        type: String,
        required: [true, "Please provide the university name"],
    },
    course: {
        type: String,
        required: [true, "Please provide the course"],
    },
    startYear: {
        type: Number,
        required: [true, "Please provide the start year"],
    },
    endYear: {
        type: Number,
    },
    collegeInfo: {
        type: String,
    },
});

const Education = mongoose.models.Education || mongoose.model("Education", educationSchema);
export default Education;
