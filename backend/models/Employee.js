const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time"],
    required: true,
  },
  position: { type: String, required: true },
  employmentDate: { type: Date, required: true },
  basicSalary: { type: Number, required: true },
  bankAccountNumber: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
