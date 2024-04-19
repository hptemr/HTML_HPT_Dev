const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInviteTokenSchema = new Schema({
    userId: {
        type: Schema.Types.Mixed
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("user_invite_tokens", userInviteTokenSchema);