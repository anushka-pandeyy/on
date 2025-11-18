"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import authService from "@/lib/services/authService";
import { setAuthToken, setUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"email" | "onrole">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    onroleId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("object")

    try {
      const usernameValue =
        loginType === "email"
          ? formData.email.split("@")[0] // email se username extract
          : formData.onroleId;

      const loginData = {
        username: usernameValue,
        password: formData.password,
      };

      const response = await authService.signin(loginData);
      console.log("Login response:", response);

      // Save user
      setAuthToken(response.accessToken);
      console.log("Token after saving:", localStorage.getItem("accessToken"));

      setUser({
        id: response.id,
        username: response.username,
        email: response.email,
      });

      router.push("/dashboard")
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FB] text-gray-800" suppressHydrationWarning>
      {/* Left Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-[#002F5F]">
              Welcome Back
            </CardTitle>
            <p className="text-center text-gray-500 text-sm mt-2">
              Choose how you want to log in to your OnRole account.
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center mb-6">
              <Button
                type="button"
                onClick={() => setLoginType("email")}
                className={`px-4 py-2 rounded-l-xl font-medium border ${loginType === "email"
                  ? "bg-[#002F5F] text-white"
                  : "bg-gray-100 text-gray-600"
                  }`}
              >
                Email Login
              </Button>
              <Button
                type="button"
                onClick={() => setLoginType("onrole")}
                className={`px-4 py-2 rounded-r-xl font-medium border ${loginType === "onrole"
                  ? "bg-[#002F5F] text-white"
                  : "bg-gray-100 text-gray-600"
                  }`}
              >
                OnRole ID Login
              </Button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {loginType === "email" ? (
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="onroleId">OnRole ID</Label>
                  <Input
                    id="onroleId"
                    name="onroleId"
                    value={formData.onroleId}
                    onChange={handleChange}
                    placeholder="onrole.id/yourname"
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#002F5F] hover:bg-[#01407a] text-white mt-4 rounded-xl transition-all disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="flex justify-between items-center mt-4 text-sm">
                <a href="#" className="text-[#F57C00] hover:underline">
                  Forgot password?
                </a>
                <button
                  type="button"
                  onClick={() => router.push("/Signup")}
                  className="text-[#002F5F] font-medium hover:underline"
                >
                  Create account
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070"
          alt="Professional workspace"
          className="w-full h-full object-cover"
          loading="lazy"
          suppressHydrationWarning
        />
        <div className="absolute inset-0 bg-[#002F5F]/50" />
        <div className="absolute bottom-12 left-10 text-white max-w-xs z-10">
          <h2 className="text-3xl font-bold mb-2 leading-tight">
            Grow Your Career. <br /> Build Your Network.
          </h2>
          <p className="text-sm text-gray-200">
            Join professionals and creators from all over the world on OnRole.
          </p>
        </div>
      </div>
    </div>
  );
}
