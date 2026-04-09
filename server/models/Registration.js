const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  section: { type: String, required: true },
  year: { type: String, required: true },
  rollNo: { type: String, required: true },
  college: { type: String, required: true },
  selectedEvents: [{ type: String }],
  transactionId: { type: String, required: true },
  paymentScreenshotLink: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
