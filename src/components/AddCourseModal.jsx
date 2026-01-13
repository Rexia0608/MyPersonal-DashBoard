// components/AddCourseModal.jsx
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import Modal from "./Modal";

const AddCourseModal = ({ isOpen, onClose, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    category: "",
    schoolYear: "",
    semester: "",
    status: "active",
    isEnrollmentOpen: true,
    price: 0,
  });

  const [errors, setErrors] = useState({});

  const CATEGORIES = [
    "Senior High",
    "Diploma and Certificate",
    "Bachelor Degree",
    "Master Degree",
    "Doctorate",
    "Certificate Program",
  ];

  const SEMESTERS = ["1st", "2nd", "Summer", "Special"];
  const STATUSES = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "archived", label: "Archived" },
  ];

  // Generate school years (current year and next 3 years)
  const currentYear = new Date().getFullYear();
  const schoolYears = Array.from({ length: 4 }, (_, i) => {
    const year = currentYear + i;
    return `${year}-${year + 1}`;
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.courseCode.trim()) {
      newErrors.courseCode = "Course code is required";
    }

    if (!formData.courseName.trim()) {
      newErrors.courseName = "Course name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.schoolYear) {
      newErrors.schoolYear = "School year is required";
    }

    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    }

    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      courseCode: "",
      courseName: "",
      category: "",
      schoolYear: "",
      semester: "",
      status: "active",
      isEnrollmentOpen: true,
      price: 0,
    });
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Course" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Code *
            </label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="e.g., STEM, BSIT, MBA"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.courseCode ? "border-red-300" : "border-gray-300"
              }`}
              maxLength={20}
            />
            {errors.courseCode && (
              <p className="mt-1 text-sm text-red-600">{errors.courseCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Name *
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="e.g., Bachelor of Science in Information Technology"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                errors.courseName ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.courseName && (
              <p className="mt-1 text-sm text-red-600">{errors.courseName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none ${
                errors.category ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School Year *
            </label>
            <select
              name="schoolYear"
              value={formData.schoolYear}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none ${
                errors.schoolYear ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select school year</option>
              {schoolYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.schoolYear && (
              <p className="mt-1 text-sm text-red-600">{errors.schoolYear}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester *
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none ${
                errors.semester ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select semester</option>
              {SEMESTERS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
            {errors.semester && (
              <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none"
            >
              {STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (PHP) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₱
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                  errors.price ? "border-red-300" : "border-gray-300"
                }`}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Enter 0 for free courses
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isEnrollmentOpen"
                name="isEnrollmentOpen"
                checked={formData.isEnrollmentOpen}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isEnrollmentOpen"
                className="ml-2 text-sm text-gray-700"
              >
                Enrollment is open
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            disabled={isLoading}
          >
            Reset Form
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Saving...
              </>
            ) : (
              <>
                <Save className="-ml-1 mr-2 h-4 w-4" />
                Save Course
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCourseModal;
