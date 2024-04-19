const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetPasswordTokenSchema = new Schema({
    userId: {
        type: Schema.Types.Mixed
    },
    token: {
        type: String
    },
    expires: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: 60, // in seconds 3600
    },
});

// resetPasswordTokenSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 60 , partialFilterExpression: { state: 'TMP' }});

module.exports = mongoose.model("reset_password_tokens", resetPasswordTokenSchema);