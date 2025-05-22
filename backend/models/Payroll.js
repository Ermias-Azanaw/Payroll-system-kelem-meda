const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  month: { type: String, required: true }, // e.g., "2025-05"
  workingDays: { type: Number, required: true },
  earnedSalary: { type: Number, required: true },
  allowance: { type: Number, required: true },
  grossPay: { type: Number, required: true },
  taxableIncome: { type: Number, required: true },
  pension: { type: Number, required: true },
  tax: { type: Number, required: true },
  netPay: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Processed", "Failed"],
    default: "Pending",
  },
  preparedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payroll", payrollSchema);
