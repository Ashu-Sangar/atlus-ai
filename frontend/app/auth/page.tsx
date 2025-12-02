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
import Aurora from "../../components/Aurora";
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
        <div className="relative min-h-screen bg-[#09090b] overflow-hidden flex flex-col">
            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                <Aurora
                    enabledWaves={['top', 'middle', 'bottom']}
                    // Array - specify line count per wave; Number - same count for all waves
                    lineCount={[10, 15, 20]}
                    // Array - specify line distance per wave; Number - same distance for all waves
                    lineDistance={[100, 100, 100]}
                    bendRadius={8.5}
                    bendStrength={-1.5}
                    interactive={true}
                    parallax={true}
                    // Define your gradient colors here (hex codes)
                    linesGradient={['#ffffffff', '#00ff37ff', '#06b6d4']}
                />
            </div>
            <Navbar />

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 pt-24">
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 bg-[#09090b]/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden min-h-[600px]"
                >
                    {/* Left Panel - Visuals (2/5 width) */}
                    <div className="hidden lg:flex lg:col-span-2 relative flex-col justify-between p-10 overflow-hidden">
                        {/* Panel Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                        {/* Decorative Circle */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center mb-8 shadow-lg shadow-primary-500/20">
                                <Sparkles className="text-white" size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                                Master your focus.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Conquer your day.</span>
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Join thousands of high-performers who use Atlus to organize their life and get things done.
                            </p>
                        </div>

                        {/* Feature/Quote */}
                        <div className="relative z-10 mt-auto">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-4 h-4 text-primary-400 fill-primary-400">★</div>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-300 italic mb-3">"This app completely changed how I work. The focus sessions are a game changer!"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white">JD</div>
                                    <div>
                                        <div className="text-xs font-bold text-white">John Doe</div>
                                        <div className="text-[10px] text-slate-400">Product Designer</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Form (3/5 width) */}
                    <div className="lg:col-span-3 bg-[#09090b]/80 border-l border-white/5 p-8 md:p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full">
                            <div className="text-center mb-8 lg:text-left">
                                <h1 className="text-2xl font-bold text-white mb-2">
                                    {isLogin ? "Welcome back" : "Create an account"}
                                </h1>
                                <p className="text-slate-400 text-sm">
                                    {isLogin ? "Enter your details to access your workspace." : "Start your 14-day free trial today."}
                                </p>
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

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    onClick={() => handleSocialLogin('google')}
                                    className="flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 rounded-xl transition-all group"
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
                                    className="flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 rounded-xl transition-all group"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">GitHub</span>
                                </button>
                            </div>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                                    <span className="px-2 bg-[#09090b] text-slate-500">Or continue with email</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {!isLogin && (
                                        <motion.div
                                            key="name-field"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={18} />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required={!isLogin}
                                                    className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-white placeholder:text-slate-600 text-sm"
                                                    placeholder="Full Name"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    <motion.div key="email-field" layout>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={18} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-white placeholder:text-slate-600 text-sm"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div key="password-field" layout>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={18} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full pl-11 pr-11 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-white placeholder:text-slate-600 text-sm"
                                                placeholder="Password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {!isLogin && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mt-2 flex gap-1 h-0.5"
                                            >
                                                {[...Array(4)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength > i * 25
                                                            ? passwordStrength <= 50 ? 'bg-red-500' : passwordStrength <= 75 ? 'bg-yellow-500' : 'bg-green-500'
                                                            : 'bg-slate-800'
                                                            }`}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    {!isLogin && (
                                        <motion.div
                                            key="confirm-field"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <div className="relative group">
                                                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={18} />
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required={!isLogin}
                                                    className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-white placeholder:text-slate-600 text-sm"
                                                    placeholder="Confirm Password"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {isLogin && (
                                    <div className="flex items-center justify-between text-xs">
                                        <label className="flex items-center cursor-pointer group">
                                            <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-0" />
                                            <span className="ml-2 text-slate-400 group-hover:text-slate-300">Remember me</span>
                                        </label>
                                        <Link href="/forgot-password" className="text-primary-400 hover:text-primary-300">Forgot password?</Link>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                        <>
                                            {isLogin ? "Sign In" : "Create Account"}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-slate-400 text-sm">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button
                                        onClick={toggleMode}
                                        className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                                    >
                                        {isLogin ? "Sign up" : "Log in"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
