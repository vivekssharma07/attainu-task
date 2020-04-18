const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    name: {type: String, required: true },
    description: {type: String, required: true },
    status: {type: String, required: true },
    created_by: {type: String, required: true},
},{ timestamps: true });

// Export the model
module.exports = mongoose.model('Task', TaskSchema);