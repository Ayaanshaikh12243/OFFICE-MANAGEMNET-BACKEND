const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    jobTitle: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    supervisor: { type: Schema.Types.ObjectId, ref: 'Employee', default: null },
    location: {
        country: { type: String },
        state: { type: String },
        city: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);