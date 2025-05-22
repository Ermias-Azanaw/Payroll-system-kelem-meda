const express = require("express");
const {
  calculatePayroll,
  processPayment,
  getPayrolls,
  generateReport,
} = require("../controllers/payrollController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Calculate payroll (HR or Admin only)
router.post("/calculate", authMiddleware(["HR", "Admin"]), calculatePayroll);

// Process payment (approve/reject, Admin only)
router.post("/process-payment", authMiddleware(["Admin"]), processPayment);

// Get all payroll records (HR, Approver, or Admin)
router.get("/", authMiddleware(["HR", "Approver", "Admin"]), getPayrolls);

// Generate monthly payroll report (HR, Approver, or Admin)
router.get(
  "/report/:month",
  authMiddleware(["HR", "Approver", "Admin"]),
  generateReport
);

module.exports = router;
