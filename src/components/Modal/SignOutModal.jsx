// components/SignoutModal.jsx
import React from "react";
import Modal from "./Modal";
import { LogOut, AlertTriangle } from "lucide-react";

const SignoutModal = ({ isOpen, onClose, onSignout, user }) => {
  const handleSignout = () => {
    // Call the signout function passed from parent
    if (onSignout) {
      onSignout();
    }
    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Sign Out" size="sm">
      <div className="text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
          <LogOut className="h-6 w-6 text-yellow-600" />
        </div>

        {/* Confirmation Message */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Ready to leave?
        </h3>

        <p className="text-sm text-gray-500 mb-6">
          {user ? (
            <>
              You're currently signed in as{" "}
              <span className="font-semibold text-gray-700">{user.name}</span>.
              Are you sure you want to sign out?
            </>
          ) : (
            "Are you sure you want to sign out of your account?"
          )}
        </p>

        {/* Warning Notice */}
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-yellow-700 text-left">
              Any unsaved changes will be lost after signing out.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSignout}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignoutModal;
