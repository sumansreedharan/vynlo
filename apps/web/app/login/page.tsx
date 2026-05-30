"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import api from "@/src/lib/axios";
import { useAuth } from "@/src/providers/auth-provider";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(response.data.access_token);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-neutral-950 to-black px-4 antialiased selection:bg-zinc-700 selection:text-white">
      {/* Background ambient glow effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-xl shadow-2xl sm:p-10">
        {/* Header section */}
        <div className="mb-8 text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/50 text-white shadow-inner mb-4">
            <span className="text-xl font-bold tracking-tighter">V</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Welcome to Vynlo
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Smart CRM for modern teams
          </p>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 animate-in fade-in-50 duration-200">
            {errorMessage}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email input field */}
          <Input
            id="email"
            label="Email Address"
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            icon={<Mail size={18} />}
          />

          {/* Password input field */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-zinc-400 hover:text-zinc-200 transition"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                icon={<Lock size={18} />}
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute bottom-3.5 right-3.5 text-zinc-500 hover:text-zinc-300 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Premium Submit Button */}
          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="font-medium text-zinc-400 hover:text-zinc-200 transition underline underline-offset-4"
          >
            Contact your admin
          </a>
        </p>
      </div>
    </div>
  );
}
