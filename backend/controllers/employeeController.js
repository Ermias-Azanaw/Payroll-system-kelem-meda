const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
  const { name, gender, employmentType, position, employmentDate, basicSalary, bankAccountNumber } = req.body;
  try {
    const employee = new Employee({
      name,
      gender,
      employmentType,
      position,
      employmentDate,
      basicSalary,
      bankAccountNumber,
      createdBy: req.user.id,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('createdBy', 'username');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};