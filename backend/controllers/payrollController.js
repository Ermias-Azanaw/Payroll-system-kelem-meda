
// 2thaw yiseral
const Employee = require("../models/Employee");
const Payroll = require("../models/Payroll");
const exceljs = require("exceljs");
const PDFDocument = require("pdfkit");

// Ethiopian tax brackets (2025, simplified for example)
const taxBrackets = [
  { min: 0, max: 600, rate: 0, deduction: 0 },
  { min: 601, max: 1650, rate: 0.1, deduction: 60 },
  { min: 1651, max: 3200, rate: 0.15, deduction: 142.5 },
  { min: 3201, max: 5250, rate: 0.2, deduction: 302.5 },
  { min: 5251, max: 7800, rate: 0.25, deduction: 565 },
  { min: 7801, max: 10900, rate: 0.3, deduction: 955 },
  { min: 10901, max: Infinity, rate: 0.35, deduction: 1500 },
];

exports.calculatePayroll = async (req, res) => {
  const { employeeId, month, workingDays } = req.body;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Calculate earned salary
    const earnedSalary = (workingDays * employee.basicSalary) / 30;

    // Position-based allowance
    const allowanceRates = {
      CEO: 0.1, // 10% of basic salary
      COO: 0.08,
      CTO: 0.08,
      // Add more positions as needed
    };
    const allowance =
      employee.basicSalary * (allowanceRates[employee.position] || 0);

    // Gross pay
    const grossPay = earnedSalary + allowance;

    // Pension (7% employee contribution, Ethiopian standard)
    const pension = grossPay * 0.07;

    // Taxable income
    const taxableIncome = grossPay - pension;

    // Calculate tax
    let tax = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome >= bracket.min && taxableIncome <= bracket.max) {
        tax = taxableIncome * bracket.rate - bracket.deduction;
        break;
      }
    }

    // Net pay
    const netPay = grossPay - pension - tax;

    const payroll = new Payroll({
      employee: employeeId,
      month,
      workingDays,
      earnedSalary,
      allowance,
      grossPay,
      taxableIncome,
      pension,
      tax,
      netPay,
      paymentStatus: "Pending",
      preparedBy: req.user.id,
    });

    await payroll.save();
    res.status(201).json(payroll);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.processPayment = async (req, res) => {
  const { payrollId, action } = req.body;
  try {
    const payroll = await Payroll.findById(payrollId);
    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }
    if (payroll.paymentStatus !== "Pending") {
      return res
        .status(400)
        .json({ message: "Payment already processed or failed" });
    }

    if (action === "approve") {
      // Simulate bank transaction
      const paymentSuccess = Math.random() > 0.2; // 80% success rate for demo
      if (paymentSuccess) {
        payroll.paymentStatus = "Processed";
        payroll.approvedBy = req.user.id;
        await payroll.save();
        res.json({ message: "Payment approved successfully", payroll });
      } else {
        payroll.paymentStatus = "Failed";
        await payroll.save();
        res
          .status(400)
          .json({ message: "Payment failed, rolled back", payroll });
      }
    } else if (action === "reject") {
      payroll.paymentStatus = "Failed";
      await payroll.save();
      res.json({ message: "Payment rejected", payroll });
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find()
      .populate("employee", "name")
      .populate("preparedBy", "username")
      .populate("approvedBy", "username");
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.generateReport = async (req, res) => {
  const { month } = req.params;
  const format = req.query.format || "xlsx";
  try {
    const payrolls = await Payroll.find({ month })
      .populate("employee", "name")
      .populate("preparedBy", "username")
      .populate("approvedBy", "username");

    if (format === "xlsx") {
      // Generate Excel
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet(`Payroll Report ${month}`);
      worksheet.columns = [
        { header: "Employee", key: "employee", width: 20 },
        { header: "Month", key: "month", width: 15 },
        { header: "Year", key: "year", width: 10 },
        { header: "Gross Pay", key: "grossPay", width: 15 },
        { header: "Net Pay", key: "netPay", width: 15 },
        { header: "Status", key: "paymentStatus", width: 15 },
        { header: "Prepared By", key: "preparedBy", width: 20 },
        { header: "Approved By", key: "approvedBy", width: 20 },
      ];

      payrolls.forEach((payroll) => {
        const [year, monthNum] = payroll.month.split("-");
        worksheet.addRow({
          employee: payroll.employee.name,
          month: new Date(payroll.month).toLocaleString("default", {
            month: "long",
          }),
          year,
          grossPay: payroll.grossPay,
          netPay: payroll.netPay,
          paymentStatus: payroll.paymentStatus,
          preparedBy: payroll.preparedBy?.username || "N/A",
          approvedBy: payroll.approvedBy?.username || "N/A",
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=Payroll_Report_${month}.xlsx`
      );
      res.send(buffer);
    } else if (format === "pdf") {
      // Generate PDF
      const doc = new PDFDocument({ margin: 50 });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=Payroll_Report_${month}.pdf`
      );
      doc.pipe(res);

      doc.fontSize(20).text(`Payroll Report - ${month}`, { align: "center" });
      doc.moveDown();

      // Table headers
      const tableTop = 150;
      const rowHeight = 30;
      const colWidths = [100, 70, 50, 70, 70, 70, 100, 100];
      const headers = [
        "Employee",
        "Month",
        "Year",
        "Gross Pay",
        "Net Pay",
        "Status",
        "Prepared By",
        "Approved By",
      ];

      // Draw headers
      doc.fontSize(10).font("Helvetica-Bold");
      headers.forEach((header, i) => {
        doc.text(
          header,
          50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
          tableTop,
          {
            width: colWidths[i],
            align: "left",
          }
        );
      });

      // Draw rows
      doc.font("Helvetica");
      payrolls.forEach((payroll, index) => {
        const y = tableTop + (index + 1) * rowHeight;
        const [year, monthNum] = payroll.month.split("-");
        const rowData = [
          payroll.employee.name,
          new Date(payroll.month).toLocaleString("default", { month: "long" }),
          year,
          `${payroll.grossPay.toLocaleString()} ETB`,
          `${payroll.netPay.toLocaleString()} ETB`,
          payroll.paymentStatus,
          payroll.preparedBy?.username || "N/A",
          payroll.approvedBy?.username || "N/A",
        ];

        rowData.forEach((cell, i) => {
          doc.text(
            cell,
            50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
            y,
            { width: colWidths[i], align: "left" }
          );
        });
      });

      doc.end();
    } else {
      res.status(400).json({ message: "Invalid format" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// const Employee = require("../models/Employee");
// const Payroll = require("../models/Payroll");
// const exceljs = require("exceljs");
// const PDFDocument = require("pdfkit");

// // Ethiopian tax brackets (2025, simplified for example)
// const taxBrackets = [
//   { min: 0, max: 600, rate: 0, deduction: 0 },
//   { min: 601, max: 1650, rate: 0.1, deduction: 60 },
//   { min: 1651, max: 3200, rate: 0.15, deduction: 142.5 },
//   { min: 3201, max: 5250, rate: 0.2, deduction: 302.5 },
//   { min: 5251, max: 7800, rate: 0.25, deduction: 565 },
//   { min: 7801, max: 10900, rate: 0.3, deduction: 955 },
//   { min: 10901, max: Infinity, rate: 0.35, deduction: 1500 },
// ];

// exports.calculatePayroll = async (req, res) => {
//   const { employeeId, month, workingDays } = req.body;
//   try {
//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Calculate earned salary
//     const earnedSalary = (workingDays * employee.basicSalary) / 30;

//     // Position-based allowance
//     const allowanceRates = {
//       CEO: 0.1, // 10% of basic salary
//       COO: 0.08,
//       CTO: 0.08,
//       // Add more positions as needed
//     };
//     const allowance = employee.basicSalary * (allowanceRates[employee.position] || 0);

//     // Gross pay
//     const grossPay = earnedSalary + allowance;

//     // Pension (7% employee contribution, Ethiopian standard)
//     const pension = grossPay * 0.07;

//     // Taxable income
//     const taxableIncome = grossPay - pension;

//     // Calculate tax
//     let tax = 0;
//     for (const bracket of taxBrackets) {
//       if (taxableIncome >= bracket.min && taxableIncome <= bracket.max) {
//         tax = taxableIncome * bracket.rate - bracket.deduction;
//         break;
//       }
//     }

//     // Net pay
//     const netPay = grossPay - pension - tax;

//     const payroll = new Payroll({
//       employee: employeeId,
//       month,
//       workingDays,
//       earnedSalary,
//       allowance,
//       grossPay,
//       taxableIncome,
//       pension,
//       tax,
//       netPay,
//       paymentStatus: "Pending",
//       preparedBy: req.user.id,
//     });

//     await payroll.save();
//     res.status(201).json(payroll);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.processPayment = async (req, res) => {
//   const { payrollId, action } = req.body;
//   try {
//     const payroll = await Payroll.findById(payrollId);
//     if (!payroll) {
//       return res.status(404).json({ message: "Payroll not found" });
//     }
//     if (payroll.paymentStatus !== "Pending") {
//       return res.status(400).json({ message: "Payment already processed or failed" });
//     }

//     if (action === "approve") {
//       // Simulate bank transaction
//       const paymentSuccess = Math.random() > 0.2; // 80% success rate for demo
//       if (paymentSuccess) {
//         payroll.paymentStatus = "Processed";
//         payroll.approvedBy = req.user.id;
//         await payroll.save();
//         res.json({ message: "Payment approved successfully", payroll });
//       } else {
//         payroll.paymentStatus = "Failed";
//         await payroll.save();
//         res.status(400).json({ message: "Payment failed, rolled back", payroll });
//       }
//     } else if (action === "reject") {
//       payroll.paymentStatus = "Failed";
//       await payroll.save();
//       res.json({ message: "Payment rejected", payroll });
//     } else {
//       res.status(400).json({ message: "Invalid action" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getPayrolls = async (req, res) => {
//   try {
//     const payrolls = await Payroll.find()
//       .populate("employee", "name")
//       .populate("preparedBy", "username")
//       .populate("approvedBy", "username");
//     res.json(payrolls);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.generateReport = async (req, res) => {
//   const { month } = req.params;
//   const format = req.query.format || "xlsx";
//   try {
//     const payrolls = await Payroll.find({ month })
//       .populate("employee", "name")
//       .populate("preparedBy", "username")
//       .populate("approvedBy", "username");

//     if (format === "json") {
//       // Return JSON for table data
//       res.json(payrolls);
//     } else if (format === "xlsx") {
//       // Generate Excel
//       const workbook = new exceljs.Workbook();
//       const worksheet = workbook.addWorksheet(`Payroll Report ${month}`);
//       worksheet.columns = [
//         { header: "Employee", key: "employee", width: 20 },
//         { header: "Month", key: "month", width: 15 },
//         { header: "Year", key: "year", width: 10 },
//         { header: "Gross Pay", key: "grossPay", width: 15 },
//         { header: "Net Pay", key: "netPay", width: 15 },
//         { header: "Status", key: "paymentStatus", width: 15 },
//         { header: "Prepared By", key: "preparedBy", width: 20 },
//         { header: "Approved By", key: "approvedBy", width: 20 },
//       ];

//       payrolls.forEach((payroll) => {
//         const [year, monthNum] = payroll.month.split("-");
//         worksheet.addRow({
//           employee: payroll.employee.name,
//           month: new Date(payroll.month).toLocaleString("default", { month: "long" }),
//           year,
//           grossPay: payroll.grossPay,
//           netPay: payroll.netPay,
//           paymentStatus: payroll.paymentStatus,
//           preparedBy: payroll.preparedBy?.username || "N/A",
//           approvedBy: payroll.approvedBy?.username || "N/A",
//         });
//       });

//       const buffer = await workbook.xlsx.writeBuffer();
//       res.setHeader(
//         "Content-Type",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       );
//       res.setHeader("Content-Disposition", `attachment; filename=Payroll_Report_${month}.xlsx`);
//       res.send(buffer);
//     } else if (format === "pdf") {
//       // Generate PDF
//       const doc = new PDFDocument({ margin: 50 });
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader("Content-Disposition", `attachment; filename=Payroll_Report_${month}.pdf`);
//       doc.pipe(res);

//       doc.fontSize(20).text(`Payroll Report - ${month}`, { align: "center" });
//       doc.moveDown();

//       // Table headers
//       const tableTop = 150;
//       const rowHeight = 30;
//       const colWidths = [100, 70, 50, 70, 70, 70, 100, 100];
//       const headers = [
//         "Employee",
//         "Month",
//         "Year",
//         "Gross Pay",
//         "Net Pay",
//         "Status",
//         "Prepared By",
//         "Approved By",
//       ];

//       // Draw headers
//       doc.fontSize(10).font("Helvetica-Bold");
//       headers.forEach((header, i) => {
//         doc.text(header, 50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0), tableTop, {
//           width: colWidths[i],
//           align: "left",
//         });
//       });

//       // Draw rows
//       doc.font("Helvetica");
//       payrolls.forEach((payroll, index) => {
//         const y = tableTop + (index + 1) * rowHeight;
//         const [year, monthNum] = payroll.month.split("-");
//         const rowData = [
//           payroll.employee.name,
//           new Date(payroll.month).toLocaleString("default", { month: "long" }),
//           year,
//           `${payroll.grossPay.toLocaleString()} ETB`,
//           `${payroll.netPay.toLocaleString()} ETB`,
//           payroll.paymentStatus,
//           payroll.preparedBy?.username || "N/A",
//           payroll.approvedBy?.username || "N/A",
//         ];

//         rowData.forEach((cell, i) => {
//           doc.text(
//             cell,
//             50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
//             y,
//             { width: colWidths[i], align: "left" }
//           );
//         });
//       });

//       doc.end();
//     } else {
//       res.status(400).json({ message: "Invalid format" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };