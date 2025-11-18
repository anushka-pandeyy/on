"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#002F5F]">OnRole</h1>
        <nav className="flex items-center gap-6">
          <a href="#features" className="hover:text-[#F57C00] font-medium">Features</a>
          <a href="#faq" className="hover:text-[#F57C00] font-medium">FAQ</a>
          <button
            onClick={() => router.push("/login")}
            className="text-[#002F5F] hover:text-[#01407a] font-medium"
          >
            Login
          </button>
          <Button
            onClick={() => router.push("/Signup")}
            className="bg-[#F57C00] hover:bg-[#ff8c1a] text-white rounded-xl"
          >
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg space-y-6"
        >
          <h2 className="text-5xl font-bold text-[#002F5F] leading-tight">
            Empower Your Career <br /> with <span className="text-[#F57C00]">OnRole</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Create your professional identity, showcase your skills, and connect
            with recruiters and collaborators worldwide.
          </p>
          <Button
            onClick={() => router.push("/signup")}
            className="bg-[#002F5F] hover:bg-[#01407a] text-white px-8 py-6 rounded-xl text-lg"
          >
            Get Started →
          </Button>
        </motion.div>

        <motion.img
          src="https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070"
          alt="Career success"
          className="hidden md:block w-[480px] rounded-2xl shadow-2xl object-cover"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="px-10 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center text-[#002F5F] mb-10">
          Why Choose OnRole?
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Build Your Portfolio",
              desc: "Create a stunning profile that showcases your work, projects, and experience.",
            },
            {
              title: "Connect with Recruiters",
              desc: "Expand your network and get discovered by top recruiters and companies.",
            },
            {
              title: "Track Your Growth",
              desc: "Stay organized with achievements, skill updates, and progress tracking tools.",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <CardContent>
                <h4 className="text-xl font-semibold text-[#002F5F] mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-10 py-20 bg-[#F8F9FB]">
        <h3 className="text-3xl font-bold text-center text-[#002F5F] mb-10">
          Frequently Asked Questions
        </h3>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              q: "What is OnRole?",
              a: "OnRole is a modern professional identity platform that empowers individuals to create, connect, and grow. It goes beyond traditional resumes by giving users a personalized OnRole ID — a unique profile where they can showcase their skills, projects, and achievements.",
            
            },
            {
              q: "Is OnRole free to use?",
              a: "Yes! You can create a profile and connect with professionals completely free.",
            },
            {
              q: "Can I apply for jobs directly through OnRole?",
              a: "Yes, OnRole allows you to showcase your skills and apply to partnered companies seamlessly.",
            },
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md">
              <h4 className="font-semibold text-lg text-[#002F5F]">{faq.q}</h4>
              <p className="text-gray-600 mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002F5F] text-white text-center py-6 mt-auto">
        <p>
          © {new Date().getFullYear()} OnRole. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
