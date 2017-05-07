/**
 * Just for testing purposes -- not an official model for the project
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let testUserSchema = new Schema({
    userId: Number,
    userName: String
});

let testUser = mongoose.model('testuser', testUserSchema);

module.exports = testUser;