import { useState, useEffect } from "react";
import { PayrollCalcForm } from "../components/payroll/PayrollCalcForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/sonner";

const PayrollPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeIdx, setEmployeeIdx] = useState(0);
  const [showCalc, setShowCalc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Fetch employees and payrolls on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access this page");
      return;
    }

    // Decode JWT to get role (simplified; use jwt-decode in production)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
    } catch (err) {
      toast.error("Invalid token");
      return;
    }

    // Fetch employees
    setLoading(true);
    fetch("http://localhost:5000/api/employees", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employees");
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });

    // Fetch payrolls
    fetch("http://localhost:5000/api/payroll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payrolls");
        return res.json();
      })
      .then((data) => setPayrolls(data))
      .catch((err) => toast.error(err.message));
  }, []);

  function handleAddPayroll(p) {
    if (userRole !== "HR" && userRole !== "Admin") {
      toast.error("Only HR or Admin can calculate payroll");
      return;
    }
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/payroll/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        employeeId: p.employeeId,
        month: `${p.year}-${p.month.padStart(2, "0")}`,
        workingDays: p.workingDays,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to calculate payroll");
        return res.json();
      })
      .then((data) => {
        setPayrolls((prev) => [...prev, data]);
        toast("Payroll calculated successfully");
        setShowCalc(false);
      })
      .catch((err) => toast.error(err.message));
  }

  function handleApprove(id) {
    if (userRole !== "Admin") {
      toast.error("Only Admin can approve payments");
      return;
    }
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/payroll/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ payrollId: id, action: "approve" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to approve payment");
        return res.json();
      })
      .then((data) => {
        setPayrolls((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, paymentStatus: "Processed" } : p
          )
        );
        toast("Payment approved successfully");
      })
      .catch((err) => toast.error(err.message));
  }

  function handleReject(id) {
    if (userRole !== "Admin") {
      toast.error("Only Admin can reject payments");
      return;
    }
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/payroll/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ payrollId: id, action: "reject" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to reject payment");
        return res.json();
      })
      .then((data) => {
        setPayrolls((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, paymentStatus: "Failed" } : p
          )
        );
        toast("Payment rejected successfully");
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <div className="animate-fade-in p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0b529c]">Payroll Management</h2>
        <div className="flex gap-2">
          <select
            className="px-2 py-1 rounded border text-sm"
            value={employeeIdx}
            onChange={(e) => setEmployeeIdx(Number(e.target.value))}
            disabled={loading || employees.length === 0}
          >
            {employees.map((emp, idx) => (
              <option value={idx} key={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
          <Button
            className="bg-[#0b529c] text-white hover:bg-[#0a4785]"
            onClick={() => setShowCalc(true)}
            disabled={
              loading ||
              employees.length === 0 ||
              (userRole !== "HR" && userRole !== "Admin")
            }
          >
            + Calculate Payroll
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#0b529c]">
            <TableRow>
              <TableHead className="text-white">Employee</TableHead>
              <TableHead className="text-white">Month</TableHead>
              <TableHead className="text-white">Year</TableHead>
              <TableHead className="text-white">Gross Pay</TableHead>
              <TableHead className="text-white">Net Pay</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : payrolls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-300">
                  No payroll records yet. Calculate above to generate.
                </TableCell>
              </TableRow>
            ) : (
              payrolls.map((pr) => (
                <TableRow key={pr._id}>
                  <TableCell>{pr.employee.name}</TableCell>
                  <TableCell>
                    {new Date(pr.month).toLocaleString("default", {
                      month: "long",
                    })}
                  </TableCell>
                  <TableCell>{pr.month.split("-")[0]}</TableCell>
                  <TableCell>{pr.grossPay.toLocaleString()} ETB</TableCell>
                  <TableCell>{pr.netPay.toLocaleString()} ETB</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                        pr.paymentStatus === "Processed"
                          ? "bg-green-100 text-green-600"
                          : pr.paymentStatus === "Failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-[#fba81c]/20 text-[#fba81c]"
                      }`}
                    >
                      {pr.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#0b529c] text-[#0b529c] hover:bg-[#0b529c]/10"
                      onClick={() => handleApprove(pr._id)}
                      disabled={
                        pr.paymentStatus !== "Pending" || userRole !== "Admin"
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2 bg-[#fba81c] hover:bg-[#fba81c]/90"
                      onClick={() => handleReject(pr._id)}
                      disabled={
                        pr.paymentStatus !== "Pending" || userRole !== "Admin"
                      }
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {showCalc && employees[employeeIdx] && (
        <PayrollCalcForm
          open={showCalc}
          onClose={() => setShowCalc(false)}
          employee={employees[employeeIdx]}
          onGenerate={handleAddPayroll}
        />
      )}
    </div>
  );
};

export default PayrollPage;
