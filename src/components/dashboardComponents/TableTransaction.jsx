import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Eye,
  AlertCircle,
} from "lucide-react";
import ViewTransactionModal from "../Modal/ViewTransactionModal";

// Mock transaction data based on your database schema
const mockTransactions = [
  {
    id: "txn_001",
    type: "payment",
    studentName: "John Doe",
    studentId: "STU-2024-001",
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    amount: 15000,
    reference: "PAY-789456",
    status: "completed",
    date: "2024-03-15T14:30:00",
    description: "Tuition fee payment - First Semester",
    paymentMethod: "Bank Transfer",
    validatedBy: "Prof. Maria Santos",
    fileUrl: "/payments/receipt_001.pdf",
  },
  {
    id: "txn_002",
    type: "document",
    studentName: "Maria Cruz",
    studentId: "STU-2024-002",
    courseCode: "BSIT-201",
    courseName: "Database Management",
    amount: 0,
    reference: "DOC-123456",
    status: "approved",
    date: "2024-03-14T10:15:00",
    description: "Birth Certificate Submission",
    docType: "Birth Certificate",
    reviewedBy: "Prof. Juan Dela Cruz",
    fileUrl: "/documents/birth_cert_002.pdf",
  },
  {
    id: "txn_003",
    type: "enrollment",
    studentName: "Robert Lim",
    studentId: "STU-2024-003",
    courseCode: "ENG101",
    courseName: "English Composition",
    amount: 0,
    reference: "ENR-456789",
    status: "pending",
    date: "2024-03-13T09:45:00",
    description: "New enrollment application",
    enrollmentStatus: "documents_pending",
    processedBy: "System",
  },
  {
    id: "txn_004",
    type: "payment",
    studentName: "Sarah Johnson",
    studentId: "STU-2024-004",
    courseCode: "MATH101",
    courseName: "Calculus I",
    amount: 12000,
    reference: "PAY-321654",
    status: "rejected",
    date: "2024-03-12T16:20:00",
    description: "Tuition fee payment",
    paymentMethod: "Credit Card",
    feedback: "Invalid reference number",
    validatedBy: "Prof. Maria Santos",
  },
  {
    id: "txn_005",
    type: "document",
    studentName: "Michael Tan",
    studentId: "STU-2024-005",
    courseCode: "PHY101",
    courseName: "Physics Fundamentals",
    amount: 0,
    reference: "DOC-987654",
    status: "rejected",
    date: "2024-03-11T11:30:00",
    description: "Form 137 Submission",
    docType: "Form 137",
    feedback: "Document is blurry, please resubmit",
    reviewedBy: "Prof. Juan Dela Cruz",
  },
  {
    id: "txn_006",
    type: "payment",
    studentName: "Anna Garcia",
    studentId: "STU-2024-006",
    courseCode: "CHEM101",
    courseName: "Chemistry Basics",
    amount: 18000,
    reference: "PAY-456123",
    status: "completed",
    date: "2024-03-10T13:45:00",
    description: "Full payment - Second Semester",
    paymentMethod: "Online Banking",
    validatedBy: "Prof. Maria Santos",
    fileUrl: "/payments/receipt_006.pdf",
  },
  {
    id: "txn_007",
    type: "enrollment",
    studentName: "David Wong",
    studentId: "STU-2024-007",
    courseCode: "HIST101",
    courseName: "World History",
    amount: 0,
    reference: "ENR-159753",
    status: "completed",
    date: "2024-03-09T15:10:00",
    description: "Enrollment completed",
    enrollmentStatus: "enrolled",
    processedBy: "Admin System",
  },
  {
    id: "txn_008",
    type: "document",
    studentName: "Lisa Chen",
    studentId: "STU-2024-008",
    courseCode: "ART101",
    courseName: "Art Appreciation",
    amount: 0,
    reference: "DOC-852963",
    status: "pending",
    date: "2024-03-08T14:00:00",
    description: "Good Moral Certificate",
    docType: "Good Moral Certificate",
    reviewedBy: null,
  },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All Transactions" },
  { value: "payment", label: "Payments" },
  { value: "document", label: "Documents" },
  { value: "enrollment", label: "Enrollments" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

const TableTransaction = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800 border border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      rejected: "bg-red-100 text-red-800 border border-red-200",
      approved: "bg-blue-100 text-blue-800 border border-blue-200",
    };

    const icons = {
      completed: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />,
      approved: <CheckCircle className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
          styles[status] || styles.pending
        }`}
      >
        {icons[status] || <Clock className="w-3 h-3" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Get type badge
  const getTypeBadge = (type) => {
    const styles = {
      payment: "bg-purple-100 text-purple-800 border border-purple-200",
      document: "bg-blue-100 text-blue-800 border border-blue-200",
      enrollment: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    };

    const icons = {
      payment: <CreditCard className="w-3 h-3" />,
      document: <FileText className="w-3 h-3" />,
      enrollment: <User className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
          styles[type] || styles.payment
        }`}
      >
        {icons[type] || <CreditCard className="w-3 h-3" />}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      // Search filter
      const searchMatch =
        searchTerm === "" ||
        transaction.studentName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.studentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.reference
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.courseCode.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const typeMatch = typeFilter === "all" || transaction.type === typeFilter;

      // Status filter
      const statusMatch =
        statusFilter === "all" || transaction.status === statusFilter;

      // Date range filter (simplified)
      const dateMatch = dateRange === "all" || true; // Implement date logic as needed

      return searchMatch && typeMatch && statusMatch && dateMatch;
    });
  }, [searchTerm, typeFilter, statusFilter, dateRange]);

  // Calculate totals
  const totals = useMemo(() => {
    const payments = filteredTransactions.filter(
      (t) => t.type === "payment" && t.status === "completed"
    );
    const totalAmount = payments.reduce((sum, t) => sum + t.amount, 0);

    return {
      totalTransactions: filteredTransactions.length,
      totalPayments: payments.length,
      totalAmount: totalAmount,
      pendingCount: filteredTransactions.filter((t) => t.status === "pending")
        .length,
    };
  }, [filteredTransactions]);

  // View transaction details
  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Student, Reference, Course..."
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Student
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getTypeBadge(transaction.type)}
                        <div>
                          <p className="font-medium text-gray-800">
                            {transaction.reference}
                          </p>
                          <p className="text-sm text-gray-600">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {transaction.studentName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.studentId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(transaction.status)}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(transaction)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Search className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 font-medium">
                        No transactions found
                      </p>
                      <p className="text-gray-400 text-sm">
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "Try adjusting your filters"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ViewTransactionModal
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </motion.div>
  );
};

export default TableTransaction;
