"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

type AdminLoginProps = {
  onLogin: () => void;
};

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    window.setTimeout(() => {
      if (email === "admin@4ssystems.com" && password === "admin123") {
        onLogin();
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#2B7CB3] to-[#0F4C81]">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-4 w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#2B7CB3]">
              <span className="text-2xl font-bold text-white">4S</span>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Sign in to manage your content</p>
          </div>

          {error ? (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-800">Authentication Failed</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@4ssystems.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#0F4C81] focus:ring-[#0F4C81]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-[#0F4C81] transition-colors hover:text-[#2B7CB3]"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-gradient-to-r from-[#0F4C81] to-[#2B7CB3] text-sm font-medium text-white shadow-lg transition-all hover:from-[#083A61] hover:to-[#1E5F9E] hover:shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="mb-1 text-xs font-medium text-blue-800">Demo Credentials:</p>
            <p className="text-xs text-blue-700">Email: admin@4ssystems.com</p>
            <p className="text-xs text-blue-700">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
