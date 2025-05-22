import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const PayrollCalcForm = ({ open, onClose, employee, onGenerate }) => {
  const [form, setForm] = useState({
    month: "",
    year: "",
    workingDays: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onGenerate({
      employeeId: employee._id,
      employee: employee.name,
      month: form.month,
      year: form.year,
      workingDays: Number(form.workingDays),
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
          Calculate Payroll for {employee.name}
        </h2>
        <div className="mb-4">
          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            className="w-full px-2 py-2 border rounded focus:ring-2 focus:ring-[#fba81c] focus:border-[#0b529c]"
            required
          >
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <Input
            name="year"
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-[#fba81c] focus:border-[#0b529c]"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            name="workingDays"
            type="number"
            placeholder="Working Days"
            value={form.workingDays}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-[#fba81c] focus:border-[#0b529c]"
            required
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="bg-[#0b529c] text-white hover:bg-[#0a4785] focus:ring-2 focus:ring-[#fba81c]"
          >
            Calculate
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
