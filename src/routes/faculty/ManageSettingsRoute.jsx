import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, Save, TestTube } from "lucide-react";

const ManageSettingsRoute = () => {
  const [settings, setSettings] = useState({
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
  });

  const [testEmail, setTestEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);

    // Validate required fields
    if (
      !settings.adminEmail ||
      !settings.smtpHost ||
      !settings.smtpPort ||
      !settings.smtpUser
    ) {
      alert("Please fill in all required email fields");
      setIsSaving(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Settings saved successfully!");

      // In a real app, you would:
      // 1. Send settings to your backend API
      // 2. Update system configuration
      // 3. Reinitialize email service with new settings
    } catch (error) {
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      alert("Please enter an email address to test");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    setTestResult({ loading: true, success: null, message: "" });

    // Simulate email test
    setTimeout(() => {
      // In a real app, you would:
      // 1. Call your backend to send a test email
      // 2. Handle success/error responses

      setTestResult({
        loading: false,
        success: true,
        message: `Test email sent successfully to ${testEmail}`,
      });

      // Clear the input after successful test
      setTestEmail("");
    }, 1500);
  };

  const handleResetToDefaults = () => {
    if (
      window.confirm(
        "Reset all settings to defaults? This will clear your custom configurations."
      )
    ) {
      setSettings({
        adminEmail: "admin@enrollplus.edu",
        smtpHost: "smtp.gmail.com",
        smtpPort: "587",
        smtpUser: "notifications@enrollplus.edu",
        smtpPass: "",
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        passwordMinLength: 8,
        require2FA: false,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure email notifications and security settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Configuration Card */}
        <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5" />
            Email & Notification Settings
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notification Email *
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
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Where system notifications will be sent
              </p>
            </div>

            {/* SMTP Host */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Server *
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
                required
              />
            </div>

            {/* SMTP Port */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Port *
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
                required
              />
            </div>

            {/* SMTP Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Username *
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
                required
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
                Leave blank to keep current password. Only enter if you want to
                change it.
              </p>
            </div>
          </div>

          {/* Test Email Section */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-md font-medium text-gray-800 flex items-center gap-2 mb-3">
              <TestTube className="w-4 h-4" />
              Test Email Configuration
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email to test"
              />
              <button
                onClick={handleTestEmail}
                disabled={testResult?.loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {testResult?.loading ? "Sending..." : "Send Test Email"}
              </button>
            </div>
            {testResult?.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 p-3 rounded-lg ${
                  testResult.success
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    testResult.success ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {testResult.message}
                </p>
              </motion.div>
            )}
            <p className="text-sm text-gray-500 mt-3">
              Send a test email to verify your SMTP configuration is working
              correctly.
            </p>
          </div>
        </div>

        {/* Security Settings Card */}
        <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6">
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
              <div className="relative">
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      sessionTimeout: Math.max(
                        5,
                        Math.min(240, parseInt(e.target.value) || 30)
                      ),
                    })
                  }
                  min="5"
                  max="240"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-3 text-gray-500">min</div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Time before users are automatically logged out (5-240 minutes)
              </p>
            </div>

            {/* Login Attempts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Login Attempts
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxLoginAttempts: Math.max(
                        3,
                        Math.min(10, parseInt(e.target.value) || 5)
                      ),
                    })
                  }
                  min="3"
                  max="10"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-3 text-gray-500">
                  attempts
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                After this, account is temporarily locked (3-10 attempts)
              </p>
            </div>

            {/* Password Policy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Password Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      passwordMinLength: Math.max(
                        6,
                        Math.min(32, parseInt(e.target.value) || 8)
                      ),
                    })
                  }
                  min="6"
                  max="32"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-3 text-gray-500">
                  characters
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Minimum characters required for passwords (6-32)
              </p>
            </div>

            {/* 2FA */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-gray-800">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Require 2FA for admin access (recommended)
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

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">
              🔒 Security Recommendations
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use a dedicated email account for system notifications</li>
              <li>• Enable 2FA for all admin accounts</li>
              <li>• Regularly update SMTP credentials</li>
              <li>• Consider shorter session timeouts for shared computers</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleResetToDefaults}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageSettingsRoute;
