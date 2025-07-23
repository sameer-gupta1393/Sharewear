const User = require("../models/users.model.js");
const Conversation = require("../models/conversation.model.js");
exports.getUsersForSidebar = async function(req, res) {
    try {
        const loggedInUserId = req.query._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("error in getUsersForSidebar", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};
exports.getSenderTotalk = async function(req, res) {
    const senderId=req.params.id;
    try {
        // Find conversations where the sender's ID is present in the participants array
        const conversations = await Conversation.find({ participants: senderId });

        // Extract the IDs of the other participants
        const participantIds = conversations.flatMap(conversation => conversation.participants.filter(participant => participant != senderId));

        // Fetch details of the users based on their IDs
        const users = await User.find({ _id: { $in: participantIds } });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users talked with:", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

exports.getUsersForSidebar2 = async function(req, res) {
    try {
        const SenderInUserId = req.params.id;
        const filteredUsers = await User.find({ _id: SenderInUserId }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("error in getUsersForSidebar", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};