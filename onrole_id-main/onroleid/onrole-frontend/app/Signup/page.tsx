"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import authService from "@/lib/services/authService";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newOnroleId, setNewOnroleId] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    headline: "",
    bio: "",
    location: "",
    roleTitles: "",
    skills: "",
    education: "",
    experience: "",
    certifications: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill all required fields before continuing.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: "user",
      };

      const response = await authService.signup(signupData);

      setNewOnroleId(formData.username);
      setShowPopup(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Signup failed";
      setError(errorMessage);
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };


  const closePopup = () => {
    setShowPopup(false);
    setStep(2);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FB] text-gray-800">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white relative z-20">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-[#002F5F]">
              {step === 1 ? "Create Your OnRole ID" : "Complete Your Profile"}
            </CardTitle>
            <p className="text-center text-gray-500 text-sm mt-2">
              {step === 1
                ? "Join the professional network for creators & developers."
                : "Add details to build your professional identity."}
            </p>
          </CardHeader>

          <CardContent>
            {step === 1 ? (
              // Step 1 — Basic Signup
              <form onSubmit={handleNext} className="space-y-5">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <div className="w-1/2">
                    <Label>First Name</Label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label>Last Name</Label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <Label>Username *</Label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Your OnRole ID will be:{" "}
                    <span className="font-semibold text-[#002F5F]">
                      onrole.id/{formData.username || "username"}
                    </span>
                  </p>
                </div>

                <div>
                  <Label>Email *</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <Label>Password *</Label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Minimum 6 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#002F5F] hover:bg-[#01407a] text-white mt-4 rounded-xl disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Next →"}
                </Button>
              </form>
            ) : (
              // Step 2 — Profile Details
              <form onSubmit={handleFinish} className="space-y-5">
                <div>
                  <Label>Headline</Label>
                  <Input
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer | UI Designer"
                  />
                </div>

                <div>
                  <Label>Bio</Label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="w-1/2">
                    <Label>Location</Label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, India"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label>Role Titles</Label>
                    <Input
                      name="roleTitles"
                      value={formData.roleTitles}
                      onChange={handleChange}
                      placeholder="e.g. Developer, Designer"
                    />
                  </div>
                </div>

                <div>
                  <Label>Skills</Label>
                  <Input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, UI/UX"
                  />
                </div>

                <div>
                  <Label>Education</Label>
                  <Input
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech in Computer Science"
                  />
                </div>

                <div>
                  <Label>Experience</Label>
                  <Input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 2 years at TCS"
                  />
                </div>

                <div>
                  <Label>Certifications</Label>
                  <Input
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    placeholder="e.g. AWS Certified Developer"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#002F5F] hover:bg-[#01407a] text-white mt-4 rounded-xl"
                >
                  Finish Setup →
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070"
          alt="Professional signup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#002F5F]/50" />
        <div className="absolute bottom-12 left-10 text-white max-w-xs z-10">
          <h2 className="text-3xl font-bold mb-2 leading-tight">
            Show Your Work. <br /> Get Hired.
          </h2>
          <p className="text-sm text-gray-200">
            Build your OnRole profile and connect with professionals globally.
          </p>
        </div>
      </div>

      {/* OnRole ID Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="bg-white rounded-2xl p-6 text-center shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#002F5F]">
              Welcome to OnRole 🎉
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mt-3">
            Your unique OnRole ID is:
            <br />
            <span className="text-[#F57C00] font-medium text-lg">
              onrole.id/{newOnroleId || formData.username || "username"}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Account created successfully! Let's complete your profile.
          </p>
          <Button
            className="mt-6 bg-[#002F5F] hover:bg-[#01407a] text-white w-full rounded-xl"
            onClick={closePopup}
          >
            Continue →
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
