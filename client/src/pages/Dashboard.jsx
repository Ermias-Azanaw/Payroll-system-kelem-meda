import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "../components/ui/sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Users, FileText, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingPayments: 0,
    totalPayroll: 0,
  });
  const [recentPayrolls, setRecentPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access the dashboard");
      return;
    }

    // Decode JWT to get role
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token payload:", payload);
      setUserRole(payload.role);
    } catch (err) {
      toast.error("Invalid token");
      return;
    }

    // Fetch dashboard data
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch employee count
        const employeesRes = await fetch(
          "http://localhost:5000/api/employees",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!employeesRes.ok) {
          throw new Error("Failed to fetch employees");
        }
        const employees = await employeesRes.json();

        // Fetch payrolls
        const payrollsRes = await fetch("http://localhost:5000/api/payroll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!payrollsRes.ok) {
          throw new Error("Failed to fetch payrolls");
        }
        const payrolls = await payrollsRes.json();

        // Calculate stats
        const pending = payrolls.filter(
          (p) => p.paymentStatus === "Pending"
        ).length;
        const totalPayroll = payrolls.reduce(
          (sum, p) => sum + (p.netPay || 0),
          0
        );

        setStats({
          totalEmployees: employees.length,
          pendingPayments: pending,
          totalPayroll,
        });

        // Get recent payrolls (last 5)
        setRecentPayrolls(payrolls.slice(0, 5));
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animate-fade-in p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#0b529c] mb-6">
        {userRole ? `${userRole} Dashboard` : "Kelem Meda Dashboard"}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-[#0b529c]/20 shadow-lg hover:border-[#fba81c] transition">
          <CardHeader className="flex items-center gap-2">
            <Users className="text-[#0b529c]" size={24} />
            <CardTitle className="text-[#0b529c]">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-[#0b529c]">
              {loading ? "..." : stats.totalEmployees}
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#0b529c]/20 shadow-lg hover:border-[#fba81c] transition">
          <CardHeader className="flex items-center gap-2">
            <FileText className="text-[#0b529c]" size={24} />
            <CardTitle className="text-[#0b529c]">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-[#0b529c]">
              {loading ? "..." : stats.pendingPayments}
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#0b529c]/20 shadow-lg hover:border-[#fba81c] transition">
          <CardHeader className="flex items-center gap-2">
            <DollarSign className="text-[#0b529c]" size={24} />
            <CardTitle className="text-[#0b529c]">Total Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-[#0b529c]">
              {loading ? "..." : stats.totalPayroll.toLocaleString()} ETB
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Links */}
      <div className="mb-6 flex gap-4 flex-wrap">
        {["HR", "Admin"].includes(userRole) && (
          <Link
            to="/payroll"
            className="px-4 py-2 bg-[#0b529c] text-white rounded-lg hover:bg-[#0a4785] transition shadow-md"
          >
            Manage Payroll
          </Link>
        )}
        {["HR", "Approver", "Admin"].includes(userRole) && (
          <Link
            to="/reports"
            className="px-4 py-2 bg-[#0b529c] text-white rounded-lg hover:bg-[#0a4785] transition shadow-md"
          >
            View Reports
          </Link>
        )}
        {["HR", "Admin"].includes(userRole) && (
          <Link
            to="/employees"
            className="px-4 py-2 bg-[#0b529c] text-white rounded-lg hover:bg-[#0a4785] transition shadow-md"
          >
            Manage Employees
          </Link>
        )}

      </div>

      {/* Recent Payrolls */}
      <Card className="border-[#0b529c]/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#0b529c]">Recent Payrolls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#0b529c]/10">
                  <TableHead className="text-[#0b529c]">Employee</TableHead>
                  <TableHead className="text-[#0b529c]">Month</TableHead>
                  <TableHead className="text-[#0b529c]">Net Pay</TableHead>
                  <TableHead className="text-[#0b529c]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : recentPayrolls.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-gray-500"
                    >
                      No recent payrolls found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentPayrolls.map((payroll) => (
                    <TableRow
                      key={payroll._id}
                      className="hover:bg-[#0b529c]/5"
                    >
                      <TableCell>{payroll.employee?.name || "N/A"}</TableCell>
                      <TableCell>{payroll.month}</TableCell>
                      <TableCell>
                        {payroll.netPay.toLocaleString()} ETB
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                            payroll.paymentStatus === "Processed"
                              ? "bg-green-100 text-green-600"
                              : payroll.paymentStatus === "Pending"
                              ? "bg-[#fba81c]/20 text-[#fba81c]"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {payroll.paymentStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
