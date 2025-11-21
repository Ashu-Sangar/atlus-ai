"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Navbar } from "../../components/Navbar";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Password strength calculation
    const getPasswordStrength = (pass: string) => {
        let strength = 0;
        if (pass.length >= 8) strength += 25;
        if (/[A-Z]/.test(pass)) strength += 25;
        if (/[0-9]/.test(pass)) strength += 25;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
        return strength;
    };

    const passwordStrength = getPasswordStrength(password);

    const resetForm = () => {
        setError("");
        setPassword("");
        setConfirmPassword("");
        // Keep email/name as user might want to switch back
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                // Login Logic
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Signup Logic
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: name,
                });
            }
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Auth error:", err);
            // Map Firebase errors to user-friendly messages
            if (err.message === "Passwords do not match") {
                setError("Passwords do not match");
            } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError("Invalid email or password.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("Email is already in use. Please sign in.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Too many attempts. Please try again later.");
            } else {
                setError(err.message || "Authentication failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (providerName: 'google' | 'github') => {
        setError("");
        try {
            const provider = providerName === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (err: any) {
            console.error(`${providerName} login error:`, err);
            if (err.code === 'auth/popup-closed-by-user') return;
            if (err.code === 'auth/account-exists-with-different-credential') {
                setError("Account exists with different credentials.");
            } else {
                setError(`Failed to sign in with ${providerName}.`);
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 overflow-hidden">
            <AnimatedBackground />

            {/* Floating orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <Navbar />

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen pt-24 pb-12 px-6">
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Glow effect container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

                        <div className="relative bg-slate-900/50 backdrop-blur-2xl rounded-3xl border border-slate-800/50 shadow-2xl p-8 md:p-10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    key={isLogin ? "login-icon" : "signup-icon"}
                                    initial={{ scale: 0, rotate: 180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="relative w-16 h-16 mx-auto mb-6"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl animate-pulse"></div>
                                    <div className="absolute inset-0.5 bg-slate-900 rounded-2xl flex items-center justify-center">
                                        <Sparkles className={isLogin ? "text-purple-400" : "text-cyan-400"} size={28} />
                                    </div>
                                </motion.div>

                                <motion.h1
                                    key={isLogin ? "login-title" : "signup-title"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2"
                                >
                                    {isLogin ? "Welcome back" : "Create Account"}
                                </motion.h1>
                                <motion.p
                                    key={isLogin ? "login-subtitle" : "signup-subtitle"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-slate-400"
                                >
                                    {isLogin ? "Sign in to continue your journey" : "Join thousands of productive users"}
                                </motion.p>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 overflow-hidden"
                                    >
                                        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <p className="text-sm text-red-200">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <AnimatePresence mode="popLayout">
                                    {/* Name Field (Signup Only) */}
                                    {!isLogin && (
                                        <motion.div
                                            key="name-field"
                                            initial={{ opacity: 0, x: -20, height: 0 }}
                                            animate={{ opacity: 1, x: 0, height: "auto" }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                                Full Name
                                            </label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required={!isLogin}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all text-white placeholder:text-slate-500"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Email Field (Always Visible) */}
                                    <motion.div key="email-field" layout>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all text-white placeholder:text-slate-500"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Password Field (Always Visible) */}
                                    <motion.div key="password-field" layout>
                                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                            Password
                                        </label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all text-white placeholder:text-slate-500"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>

                                        {/* Password Strength (Signup Only) */}
                                        {!isLogin && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-3"
                                            >
                                                <div className="flex gap-2 h-1">
                                                    {[...Array(4)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-full flex-1 rounded-full transition-all duration-500 ${passwordStrength > i * 25
                                                                ? passwordStrength <= 50
                                                                    ? 'bg-red-500'
                                                                    : passwordStrength <= 75
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-green-500'
                                                                : 'bg-slate-700'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-slate-500 mt-2">
                                                    Must contain at least 8 characters, including uppercase, number and special character.
                                                </p>
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    {/* Confirm Password (Signup Only) */}
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20, height: 0 }}
                                            animate={{ opacity: 1, x: 0, height: "auto" }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative group">
                                                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                                                <input
                                                    id="confirmPassword"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required={!isLogin}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all text-white placeholder:text-slate-500"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Remember & Forgot (Login Only) */}
                                    {isLogin && (
                                        <motion.div
                                            key="remember-me"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center justify-between"
                                        >
                                            <label className="flex items-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-colors"
                                                />
                                                <span className="ml-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                                            </label>
                                            <Link
                                                href="/forgot-password"
                                                className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                            >
                                                Forgot password?
                                            </Link>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <motion.div key="submit-button" layout>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all border-0 text-white py-6 text-base font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} />
                                                    {isLogin ? "Signing In..." : "Creating Account..."}
                                                </>
                                            ) : (
                                                <>
                                                    {isLogin ? "Sign In" : "Create Account"}
                                                    <ArrowRight size={20} />
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                </AnimatePresence>
                            </form>

                            {/* Divider */}
                            <motion.div
                                layout
                                className="relative my-8"
                            >
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700/50"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-900/50 text-slate-400">
                                        {isLogin ? "Or continue with" : "Or sign up with"}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Social Login */}
                            <motion.div
                                layout
                                className="grid grid-cols-2 gap-4"
                            >
                                <button
                                    onClick={() => handleSocialLogin('google')}
                                    className="flex items-center justify-center gap-3 px-4 py-3.5 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 rounded-xl transition-all group"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Google</span>
                                </button>

                                <button
                                    onClick={() => handleSocialLogin('github')}
                                    className="flex items-center justify-center gap-3 px-4 py-3.5 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 rounded-xl transition-all group"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">GitHub</span>
                                </button>
                            </motion.div>

                            {/* Toggle Mode Link */}
                            <motion.p
                                layout
                                className="mt-8 text-center text-sm text-slate-400"
                            >
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={toggleMode}
                                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors outline-none focus:underline"
                                >
                                    {isLogin ? "Sign up for free" : "Sign in"}
                                </button>
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
