// components/ViewTransactionModal.jsx
import React from "react";
import Modal from "./Modal";
import {
  FileText,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  User,
  AlertCircle,
  Download,
  Calendar,
  Mail,
  Building,
  BookOpen,
  DollarSign,
} from "lucide-react";

const ViewTransactionModal = ({ transaction, isOpen, onClose }) => {
  if (!transaction) return null;

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
      completed: <CheckCircle className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          styles[status] || styles.pending
        }`}
      >
        {icons[status] || <Clock className="w-4 h-4" />}
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
      payment: <CreditCard className="w-4 h-4" />,
      document: <FileText className="w-4 h-4" />,
      enrollment: <User className="w-4 h-4" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          styles[type] || styles.payment
        }`}
      >
        {icons[type] || <CreditCard className="w-4 h-4" />}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {transaction.reference}
            </p>
            <div className="flex items-center gap-3 mt-2">
              {getTypeBadge(transaction.type)}
              {getStatusBadge(transaction.status)}
            </div>
          </div>
          {transaction.fileUrl && (
            <a
              href={transaction.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              View File
            </a>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Student Information */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Student Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">
                    {transaction.studentName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Student ID</p>
                  <p className="font-medium text-gray-800">
                    {transaction.studentId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Course</p>
                  <p className="font-medium text-gray-800">
                    {transaction.courseCode} - {transaction.courseName}
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Information */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Transaction Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="font-medium text-gray-800">
                    {transaction.description}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                {transaction.type === "payment" && (
                  <>
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-medium text-gray-800 text-lg">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Method</p>
                      <p className="font-medium text-gray-800">
                        {transaction.paymentMethod}
                      </p>
                    </div>
                  </>
                )}
                {transaction.type === "document" && (
                  <div>
                    <p className="text-xs text-gray-500">Document Type</p>
                    <p className="font-medium text-gray-800">
                      {transaction.docType}
                    </p>
                  </div>
                )}
                {transaction.type === "enrollment" && (
                  <div>
                    <p className="text-xs text-gray-500">Enrollment Status</p>
                    <p className="font-medium text-gray-800">
                      {transaction.enrollmentStatus?.replace("_", " ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Processing Information */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Processing Information
              </h3>
              <div className="space-y-3">
                {transaction.validatedBy && (
                  <div>
                    <p className="text-xs text-gray-500">Validated By</p>
                    <p className="font-medium text-gray-800">
                      {transaction.validatedBy}
                    </p>
                  </div>
                )}
                {transaction.reviewedBy && (
                  <div>
                    <p className="text-xs text-gray-500">Reviewed By</p>
                    <p className="font-medium text-gray-800">
                      {transaction.reviewedBy}
                    </p>
                  </div>
                )}
                {transaction.processedBy && (
                  <div>
                    <p className="text-xs text-gray-500">Processed By</p>
                    <p className="font-medium text-gray-800">
                      {transaction.processedBy}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500">Transaction ID</p>
                  <p className="font-medium text-gray-800 font-mono text-sm">
                    {transaction.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback / Notes */}
            {transaction.feedback && (
              <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <h3 className="text-sm font-medium text-yellow-700 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Feedback & Notes
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-yellow-700 leading-relaxed">
                      {transaction.feedback}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* File Download Section */}
            {transaction.fileUrl && (
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Attached File
                </h3>
                <div className="space-y-3">
                  <a
                    href={transaction.fileUrl}
                    download
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </a>
                  <p className="text-xs text-blue-600 text-center">
                    Click to download the attached file
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
          {transaction.fileUrl && (
            <a
              href={transaction.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-center"
            >
              Open in New Tab
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewTransactionModal;
