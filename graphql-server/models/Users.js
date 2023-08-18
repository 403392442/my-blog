const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    }
});

module.exports = mongoose.model("Blog-users", UsersSchema);