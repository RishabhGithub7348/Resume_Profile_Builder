import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseName: {
        type: String,
        required: [true, "Please provide the course name"],
    },
    organization: {
        type: String,
        required: [true, "Please provide the certifying organization"],
    },
    startDate: {
        type: String,
        required: [true, "Please provide the start date"],
    },
    endDate: {
        type: String,
    },
});

const Certification = mongoose.models.Certification || mongoose.model("Certification", certificationSchema);
export default Certification;
