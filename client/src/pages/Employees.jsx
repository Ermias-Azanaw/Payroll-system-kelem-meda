import { useState, useEffect } from "react";
import { EmployeeForm } from "../components/employees/EmployeeForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/sonner";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Fetch employees and user role on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access this page");
      return;
    }

    // Decode JWT to get role
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
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch employees");
        setLoading(false);
      });
  }, []);

  function handleAdd() {
    if (userRole !== "HR" && userRole !== "Admin") {
      toast.error("Only HR or Admin can add employees");
      return;
    }
    setEditData(null);
    setShowForm(true);
  }

  function handleEdit(emp) {
    if (userRole !== "HR" && userRole !== "Admin") {
      toast.error("Only HR or Admin can edit employees");
      return;
    }
    setEditData(emp);
    setShowForm(true);
  }

  function handleDelete(emp) {
    if (userRole !== "Admin") {
      toast.error("Only Admin can delete employees");
      return;
    }
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/employees/${emp._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete employee");
        setEmployees((prev) => prev.filter((e) => e._id !== emp._id));
        toast.success("Employee deleted successfully");
      })
      .catch((err) => toast.error(err.message));
  }

  function handleSave(newEmp) {
    const token = localStorage.getItem("token");
    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `http://localhost:5000/api/employees/${editData._id}`
      : "http://localhost:5000/api/employees";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEmp),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editData) {
          setEmployees((prev) =>
            prev.map((e) => (e._id === editData._id ? data : e))
          );
          toast.success("Employee updated successfully");
        } else {
          setEmployees((prev) => [...prev, data]);
          toast.success("Employee added successfully");
        }
        setShowForm(false);
      })
      .catch((err) => toast.error("Failed to save employee"));
  }

  return (
    <div className="animate-fade-in p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0b529c]">
          Kelem Meda Employee Management
        </h2>
        <Button
          onClick={handleAdd}
          className="bg-[#0b529c] text-white hover:bg-[#0a4785] shadow-md"
          disabled={userRole !== "HR" && userRole !== "Admin"}
        >
          + Add Employee
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-[#0b529c]/20 overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#0b529c]/10">
            <TableRow>
              <TableHead className="text-[#0b529c] font-semibold">
                Name
              </TableHead>
              <TableHead className="text-[#0b529c] font-semibold">
                Gender
              </TableHead>
              <TableHead className="text-[#0b529c] font-semibold">
                Employment Type
              </TableHead>
              <TableHead className="text-[#0b529c] font-semibold">
                Position
              </TableHead>
              <TableHead className="text-[#0b529c] font-semibold">
                Date
              </TableHead>
              <TableHead className="text-[#0b529c] font-semibold">
                Basic Salary
              </TableHead>
              <TableHead className="text-[#0b529c] font-semibold">
                Bank Account
              </TableHead>
              <TableHead className="text-[#0b529c] font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0b529c]"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : employees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No employees found. Add your first employee to get started.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => (
                <TableRow key={emp._id} className="hover:bg-[#0b529c]/5">
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell>{emp.gender}</TableCell>
                  <TableCell>{emp.employmentType}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>
                    {new Date(emp.employmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {emp.basicSalary?.toLocaleString() || "0"} ETB
                  </TableCell>
                  <TableCell>{emp.bankAccountNumber}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(emp)}
                      disabled={userRole !== "HR" && userRole !== "Admin"}
                      className="text-[#0b529c] border-[#0b529c] hover:bg-[#0b529c]/10"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(emp)}
                      disabled={userRole !== "Admin"}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash size={14} className="mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {showForm && (
        <EmployeeForm
          open={showForm}
          onClose={() => setShowForm(false)}
          initialData={editData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Employees;
