import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    profilePic: {
        type: String,
    },
});

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;