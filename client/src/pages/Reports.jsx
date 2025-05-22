// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Download, FileText } from "lucide-react";
// import { toast } from "../components/ui/sonner";

// const Reports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [filter, setFilter] = useState({
//     month: new Date().toLocaleString("default", { month: "long" }),
//     year: new Date().getFullYear().toString(),
//   });

//   // Fetch user role and initial reports on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in to access this page");
//       return;
//     }

//     // Decode JWT to get role (simplified; use jwt-decode in production)
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       setUserRole(payload.role);
//       if (!["HR", "Approver", "Admin"].includes(payload.role)) {
//         toast.error("Access denied: Insufficient permissions");
//         return;
//       }
//     } catch (err) {
//       toast.error("Invalid token");
//       return;
//     }

//     // Fetch initial reports for current month
//     fetchReports(token, `${filter.year}-${filter.month.padStart(2, "0")}`);
//   }, []);

//   const fetchReports = (token, month) => {
//     setLoading(true);
//     fetch(`http://localhost:5000/api/payroll/report/${month}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch reports");
//         return res.json();
//       })
//       .then((data) => {
//         setReports(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         toast.error(err.message);
//         setLoading(false);
//       });
//   };

//   const handleFilterChange = (e) => {
//     setFilter({ ...filter, [e.target.name]: e.target.value });
//   };

//   const handleFilterSubmit = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const monthNum =
//       [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//       ].indexOf(filter.month) + 1;
//     fetchReports(
//       token,
//       `${filter.year}-${monthNum.toString().padStart(2, "0")}`
//     );
//   };

//   const handleExport = (format) => {
//     const token = localStorage.getItem("token");
//     const monthNum =
//       [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//       ].indexOf(filter.month) + 1;
//     const month = `${filter.year}-${monthNum.toString().padStart(2, "0")}`;

//     fetch(
//       `http://localhost:5000/api/payroll/report/${month}?format=${format}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//       .then((res) => {
//         if (!res.ok)
//           throw new Error(`Failed to export ${format.toUpperCase()}`);
//         return res.blob();
//       })
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `Payroll_Report_${month}.${format}`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//         toast(`${format.toUpperCase()} exported successfully`);
//       })
//       .catch((err) => toast.error(err.message));
//   };

//   return (
//     <div className="animate-fade-in p-4">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-blue-800">Payroll Reports</h2>
//         <div className="flex gap-2">
//           <Button
//             className="gap-2"
//             variant="outline"
//             onClick={() => handleExport("xlsx")}
//             disabled={loading || !userRole}
//           >
//             <Download size={18} />
//             Export Excel
//           </Button>
//           <Button
//             className="gap-2"
//             variant="outline"
//             onClick={() => handleExport("pdf")}
//             disabled={loading || !userRole}
//           >
//             <FileText size={18} />
//             Export PDF
//           </Button>
//         </div>
//       </div>
//       <form
//         className="mb-6 flex gap-4 items-center"
//         onSubmit={handleFilterSubmit}
//       >
//         <select
//           name="month"
//           value={filter.month}
//           onChange={handleFilterChange}
//           className="px-2 py-1 rounded border text-sm"
//           required
//         >
//           {[
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ].map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>
//         <Input
//           name="year"
//           type="number"
//           placeholder="Year"
//           value={filter.year}
//           onChange={handleFilterChange}
//           className="w-24"
//           required
//         />
//         <Button
//           type="submit"
//           className="bg-blue-700 text-white hover:bg-blue-800"
//           disabled={loading || !userRole}
//         >
//           Filter
//         </Button>
//       </form>
//       <div className="bg-white rounded-xl shadow-lg border overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Employee</TableHead>
//               <TableHead>Month</TableHead>
//               <TableHead>Year</TableHead>
//               <TableHead>Gross Pay</TableHead>
//               <TableHead>Net Pay</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Prepared By</TableHead>
//               <TableHead>Approved By</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center">
//                   Loading...
//                 </TableCell>
//               </TableRow>
//             ) : reports.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center text-gray-300">
//                   No payroll records for this period.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               reports.map((rec) => (
//                 <TableRow key={rec._id}>
//                   <TableCell>{rec.employee.name}</TableCell>
//                   <TableCell>
//                     {new Date(rec.month).toLocaleString("default", {
//                       month: "long",
//                     })}
//                   </TableCell>
//                   <TableCell>{rec.month.split("-")[0]}</TableCell>
//                   <TableCell>{rec.grossPay.toLocaleString()} ETB</TableCell>
//                   <TableCell>{rec.netPay.toLocaleString()} ETB</TableCell>
//                   <TableCell>
//                     <span
//                       className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
//                         rec.paymentStatus === "Processed"
//                           ? "bg-green-100 text-green-600"
//                           : rec.paymentStatus === "Failed"
//                           ? "bg-red-100 text-red-600"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {rec.paymentStatus}
//                     </span>
//                   </TableCell>
//                   <TableCell>{rec.preparedBy?.username || "N/A"}</TableCell>
//                   <TableCell>{rec.approvedBy?.username || "N/A"}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Reports;
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Download, FileText } from "lucide-react";
import { toast } from "../components/ui/sonner";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [filter, setFilter] = useState({
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear().toString(),
  });

  // Fetch user role and initial reports on mount
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
      if (!["HR", "Approver", "Admin"].includes(payload.role)) {
        toast.error("Access denied: Insufficient permissions");
        return;
      }
    } catch (err) {
      toast.error("Invalid token");
      return;
    }

    // Fetch initial reports for current month
    const monthNum = new Date().getMonth() + 1;
    fetchReports(
      token,
      `${filter.year}-${monthNum.toString().padStart(2, "0")}`
    );
  }, []);

  const fetchReports = (token, month) => {
    setLoading(true);
    console.log("Fetching reports for month:", month);
    fetch(`http://localhost:5000/api/payroll/report/${month}?format=json`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("Response status:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`Failed to fetch reports: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const monthNum =
      [
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
      ].indexOf(filter.month) + 1;
    const queryMonth = `${filter.year}-${monthNum.toString().padStart(2, "0")}`;
    fetchReports(token, queryMonth);
  };

  const handleExport = (format) => {
    const token = localStorage.getItem("token");
    const monthNum =
      [
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
      ].indexOf(filter.month) + 1;
    const month = `${filter.year}-${monthNum.toString().padStart(2, "0")}`;

    fetch(
      `http://localhost:5000/api/payroll/report/${month}?format=${format}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to export ${format.toUpperCase()}: ${res.statusText}`
          );
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Payroll_Report_${month}.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast(`${format.toUpperCase()} exported successfully`);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="animate-fade-in p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0b529c]">Payroll Reports</h2>
        <div className="flex gap-2">
          <Button
            className="gap-2 border-[#0b529c] text-[#0b529c] hover:bg-[#0b529c]/10"
            variant="outline"
            onClick={() => handleExport("xlsx")}
            disabled={loading || !userRole || reports.length === 0}
          >
            <Download size={18} />
            Export Excel
          </Button>
          <Button
            className="gap-2 border-[#0b529c] text-[#0b529c] hover:bg-[#0b529c]/10"
            variant="outline"
            onClick={() => handleExport("pdf")}
            disabled={loading || !userRole || reports.length === 0}
          >
            <FileText size={18} />
            Export PDF
          </Button>
        </div>
      </div>
      <form
        className="mb-6 flex gap-4 items-center"
        onSubmit={handleFilterSubmit}
      >
        <select
          name="month"
          value={filter.month}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded border text-sm"
          required
        >
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
        <Input
          name="year"
          type="number"
          placeholder="Year"
          value={filter.year}
          onChange={handleFilterChange}
          className="w-24"
          required
        />
        <Button
          type="submit"
          className="bg-[#0b529c] text-white hover:bg-[#0a4785]"
          disabled={loading || !userRole}
        >
          Filter
        </Button>
      </form>
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
              <TableHead className="text-white">Prepared By</TableHead>
              <TableHead className="text-white">Approved By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-300">
                  No payroll records for this period.
                </TableCell>
              </TableRow>
            ) : (
              reports.map((rec) => (
                <TableRow key={rec._id}>
                  <TableCell>{rec.employee?.name || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(rec.month).toLocaleString("default", {
                      month: "long",
                    })}
                  </TableCell>
                  <TableCell>{rec.month.split("-")[0]}</TableCell>
                  <TableCell>{rec.grossPay.toLocaleString()} ETB</TableCell>
                  <TableCell>{rec.netPay.toLocaleString()} ETB</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                        rec.paymentStatus === "Processed"
                          ? "bg-green-100 text-green-600"
                          : rec.paymentStatus === "Failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-[#fba81c]/20 text-[#fba81c]"
                      }`}
                    >
                      {rec.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>{rec.preparedBy?.username || "N/A"}</TableCell>
                  <TableCell>{rec.approvedBy?.username || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Reports;
// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Download, FileText } from "lucide-react";
// import { toast } from "../components/ui/sonner";

// const Reports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [filter, setFilter] = useState({
//     month: new Date().toLocaleString("default", { month: "long" }),
//     year: new Date().getFullYear().toString(),
//   });

//   // Fetch user role and initial reports on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in to access this page");
//       return;
//     }

//     // Decode JWT to get role (simplified; use jwt-decode in production)
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       setUserRole(payload.role);
//       if (!["HR", "Approver", "Admin"].includes(payload.role)) {
//         toast.error("Access denied: Insufficient permissions");
//         return;
//       }
//     } catch (err) {
//       toast.error("Invalid token");
//       return;
//     }

//     // Fetch initial reports for current month
//     fetchReports(token, `${filter.year}-${filter.month.padStart(2, "0")}`);
//   }, []);

//   const fetchReports = (token, month) => {
//     setLoading(true);
//     fetch(`http://localhost:5000/api/payroll/report/${month}?format=json`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Failed to fetch reports: ${res.statusText}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setReports(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         toast.error(err.message);
//         setLoading(false);
//       });
//   };

//   const handleFilterChange = (e) => {
//     setFilter({ ...filter, [e.target.name]: e.target.value });
//   };

//   const handleFilterSubmit = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const monthNum =
//       [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//       ].indexOf(filter.month) + 1;
//     fetchReports(
//       token,
//       `${filter.year}-${monthNum.toString().padStart(2, "0")}`
//     );
//   };

//   const handleExport = (format) => {
//     const token = localStorage.getItem("token");
//     const monthNum =
//       [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//       ].indexOf(filter.month) + 1;
//     const month = `${filter.year}-${monthNum.toString().padStart(2, "0")}`;

//     fetch(
//       `http://localhost:5000/api/payroll/report/${month}?format=${format}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(
//             `Failed to export ${format.toUpperCase()}: ${res.statusText}`
//           );
//         }
//         return res.blob();
//       })
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `Payroll_Report_${month}.${format}`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//         toast(`${format.toUpperCase()} exported successfully`);
//       })
//       .catch((err) => toast.error(err.message));
//   };

//   return (
//     <div className="animate-fade-in p-4">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-blue-800">Payroll Reports</h2>
//         <div className="flex gap-2">
//           <Button
//             className="gap-2"
//             variant="outline"
//             onClick={() => handleExport("xlsx")}
//             disabled={loading || !userRole}
//           >
//             <Download size={18} />
//             Export Excel
//           </Button>
//           <Button
//             className="gap-2"
//             variant="outline"
//             onClick={() => handleExport("pdf")}
//             disabled={loading || !userRole}
//           >
//             <FileText size={18} />
//             Export PDF
//           </Button>
//         </div>
//       </div>
//       <form
//         className="mb-6 flex gap-4 items-center"
//         onSubmit={handleFilterSubmit}
//       >
//         <select
//           name="month"
//           value={filter.month}
//           onChange={handleFilterChange}
//           className="px-2 py-1 rounded border text-sm"
//           required
//         >
//           {[
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ].map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>
//         <Input
//           name="year"
//           type="number"
//           placeholder="Year"
//           value={filter.year}
//           onChange={handleFilterChange}
//           className="w-24"
//           required
//         />
//         <Button
//           type="submit"
//           className="bg-blue-700 text-white hover:bg-blue-800"
//           disabled={loading || !userRole}
//         >
//           Filter
//         </Button>
//       </form>
//       <div className="bg-white rounded-xl shadow-lg border overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Employee</TableHead>
//               <TableHead>Month</TableHead>
//               <TableHead>Year</TableHead>
//               <TableHead>Gross Pay</TableHead>
//               <TableHead>Net Pay</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Prepared By</TableHead>
//               <TableHead>Approved By</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center">
//                   Loading...
//                 </TableCell>
//               </TableRow>
//             ) : reports.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center text-gray-300">
//                   No payroll records for this period.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               reports.map((rec) => (
//                 <TableRow key={rec._id}>
//                   <TableCell>{rec.employee.name}</TableCell>
//                   <TableCell>
//                     {new Date(rec.month).toLocaleString("default", {
//                       month: "long",
//                     })}
//                   </TableCell>
//                   <TableCell>{rec.month.split("-")[0]}</TableCell>
//                   <TableCell>{rec.grossPay.toLocaleString()} ETB</TableCell>
//                   <TableCell>{rec.netPay.toLocaleString()} ETB</TableCell>
//                   <TableCell>
//                     <span
//                       className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
//                         rec.paymentStatus === "Processed"
//                           ? "bg-green-100 text-green-600"
//                           : rec.paymentStatus === "Failed"
//                           ? "bg-red-100 text-red-600"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {rec.paymentStatus}
//                     </span>
//                   </TableCell>
//                   <TableCell>{rec.preparedBy?.username || "N/A"}</TableCell>
//                   <TableCell>{rec.approvedBy?.username || "N/A"}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Reports;