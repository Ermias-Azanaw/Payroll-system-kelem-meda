import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const EmployeeForm = ({ open, onClose, initialData, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    employmentType: "",
    position: "",
    employmentDate: "",
    basicSalary: "",
    bankAccountNumber: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...form,
      basicSalary: Number(form.basicSalary),
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-[#0b529c] mb-4">
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>
        <div className="mb-4">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-2 py-2 border rounded focus:ring-2 focus:ring-[#fba81c] focus:border-[#0b529c]"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="w-full px-2 py-2 border rounded focus:ring-2 focus:ring-[#fba81c] focus:border-[#0b529c]"
            required
          >
            <option value="">Select Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div className="mb-4">
          <Input
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            name="employmentDate"
            type="date"
            value={form.employmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            name="basicSalary"
            type="number"
            placeholder="Basic Salary (ETB)"
            value={form.basicSalary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            name="bankAccountNumber"
            placeholder="Bank Account Number"
            value={form.bankAccountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="bg-[#0b529c] text-white hover:bg-[#0a4785] focus:ring-2 focus:ring-[#fba81c]"
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#0b529c] text-[#0b529c] hover:bg-[#f0f7ff] hover:text-[#0a4785] focus:ring-2 focus:ring-[#fba81c]"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
