import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "../components/ui/sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      // Store JWT token
      localStorage.setItem("token", data.token);
      setLoading(false);
      toast("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      toast.error(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b529c]/10 to-[#fba81c]/10">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in border border-[#0b529c]/20"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-1 text-[#0b529c]">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to Kelm Payroll System
        </p>

        {error && (
          <div className="text-red-600 mb-4 text-sm font-semibold">{error}</div>
        )}

        <div className="mb-4">
          <Input
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoFocus
            required
            className="border-[#0b529c]/30 focus:border-[#0b529c]"
          />
        </div>
        <div className="mb-6">
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="border-[#0b529c]/30 focus:border-[#0b529c]"
          />
        </div>
        <Button
          className="w-full bg-[#0b529c] hover:bg-[#0a4785] text-white transition-colors"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        <div className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#0b529c] hover:underline font-medium"
          >
            Create one
          </a>
        </div>
      </form>
    </div>
  );
}
