// SystemSettings.jsx
import React, { useState } from "react";
import {
  Server,
  Mail,
  Shield,
  Database,
  Bell,
  Clock,
  Download,
  Power,
  Save,
  TestTube,
} from "lucide-react";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "System under maintenance. Please try again later.",

    // Email
    adminEmail: "admin@enrollplus.edu",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "notifications@enrollplus.edu",
    smtpPass: "", // Password field

    // Security
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    require2FA: false,

    // Logs
    logRetentionDays: 90,
    logLevel: "info",

    // System
    systemVersion: "2.1.0",
    autoBackup: true,
    backupFrequency: "daily",
  });

  const [testEmail, setTestEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      alert("Please enter an email address to test");
      return;
    }

    setTestResult({ loading: true, success: null, message: "" });

    // Simulate email test
    setTimeout(() => {
      setTestResult({
        loading: false,
        success: true,
        message: `Test email sent successfully to ${testEmail}`,
      });
    }, 1500);
  };

  const handleBackupNow = () => {
    if (window.confirm("Create a manual backup of the database?")) {
      // Backup logic here
      alert("Backup initiated. You'll receive a notification when complete.");
    }
  };

  const handleResetLogs = () => {
    if (window.confirm("Clear all logs older than retention period?")) {
      // Clear logs logic
      alert("Old logs cleared successfully.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Server className="w-5 h-5" />
          System Configuration
        </h2>
        <p className="text-gray-600 mt-1">
          Manage system-wide settings, maintenance mode, and email
          configurations
        </p>
      </div>

      {/* Email Configuration Card */}
      <div className="bg-white shadow-xl rounded-lg p-6 z-10">
        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5" />
          Email & Notification Settings
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Notification Email
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  adminEmail: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="admin@school.edu"
            />
            <p className="text-sm text-gray-500 mt-1">
              Where system notifications will be sent
            </p>
          </div>

          {/* SMTP Host */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Server
            </label>
            <input
              type="text"
              value={settings.smtpHost}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpHost: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="smtp.gmail.com"
            />
          </div>

          {/* SMTP Port */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port
            </label>
            <input
              type="text"
              value={settings.smtpPort}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpPort: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="587"
            />
          </div>

          {/* SMTP Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.smtpUser}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpUser: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="notifications@school.edu"
            />
          </div>

          {/* SMTP Password */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Password
            </label>
            <input
              type="password"
              value={settings.smtpPass}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpPass: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave blank to keep current password
            </p>
          </div>
        </div>

        {/* Test Email Section */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 flex items-center gap-2 mb-3">
            <TestTube className="w-4 h-4" />
            Test Email Configuration
          </h4>
          <div className="flex gap-3">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="recipient@email.com"
            />
            <button
              onClick={handleTestEmail}
              disabled={testResult?.loading}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {testResult?.loading ? "Sending..." : "Send Test Email"}
            </button>
          </div>
          {testResult?.message && (
            <p
              className={`mt-3 text-sm ${
                testResult.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {testResult.message}
            </p>
          )}
        </div>
      </div>

      {/* Security Settings Card */}
      <div className="bg-white shadow-xl rounded-lg p-6 z-10">
        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5" />
          Security Settings
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Session Timeout */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  sessionTimeout: parseInt(e.target.value) || 30,
                })
              }
              min="5"
              max="240"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Login Attempts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxLoginAttempts: parseInt(e.target.value) || 5,
                })
              }
              min="3"
              max="10"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Password Policy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Password Length
            </label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  passwordMinLength: parseInt(e.target.value) || 8,
                })
              }
              min="6"
              max="32"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* 2FA */}
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-600">
                Require 2FA for admin access
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.require2FA}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    require2FA: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={() => {
            if (window.confirm("Reset all settings to defaults?")) {
              // Reset logic
            }
          }}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
