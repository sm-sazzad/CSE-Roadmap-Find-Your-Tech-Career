"use client";

import Link from "next/link";
import Bi from "@/components/Bi";
import { useLang } from "@/lib/i18n";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Code2,
  Compass,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  Zap,
} from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import SocialBtn from "@/components/SocialBtn";
import { useToast } from "@/lib/notifications";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { lang, t } = useLang();
  const { success, error, loading: showLoading, dismiss } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showUnverified, setShowUnverified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const router = useRouter();

  const handleResendVerification = async () => {
    if (isResending || resendCooldown > 0) return;
    if (!pendingEmail) return;

    setIsResending(true);
    try {
      await authClient.sendVerificationEmail({
        email: pendingEmail,
        callbackURL: "/verify-email",
      });

      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        if (resendCooldown <= 1) clearInterval(interval);
      }, 1000);

      success(t("notif_verify_resent"), undefined, {
        duration: 3000,
      });
    } catch {
      error(t("notif_verify_resend_failed"), undefined, {
        duration: 3000,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06080e] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#00f5a0]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#00d2ff]/10 blur-[140px]" />
      <div className="grid-mesh absolute inset-0 opacity-40 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-[#0d1220] text-[#00f5a0] shadow-[0_0_20px_rgba(0,245,160,0.15)] transition duration-300 group-hover:scale-105 group-hover:border-[#00f5a0]/40">
            <Code2 size={24} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight font-heading">
              Code<span className="text-[#00f5a0]">Path</span>
            </p>
            <p className="text-xs text-zinc-500 font-mono"><Bi en="Zero-to-Hero Tech Career" bn="তোমার টেক ক্যারিয়ার রোডম্যাপ" /></p>
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          <span><Bi en="Back to Home" bn="হোমে ফিরে যাও" /></span>
        </Link>
      </header>

      {/* Main content */}
      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-12">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-4 py-1.5 text-xs font-mono font-medium text-[#00f5a0]">
            <Sparkles size={14} />
            <Bi en="Your journey into tech starts here" bn="টেক জগতে তোমার যাত্রা শুরু এখানে" />
          </div>
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.12] tracking-tight xl:text-6xl font-heading">
            <Bi en="Build Your" bn="গড়ে তোলো তোমার" />
            <span className="mt-1 block gradient-text">
              <Bi en="Tech Career" bn="টেক ক্যারিয়ার" />
            </span>
            <Bi en="with Clarity." bn="স্পষ্টতার সাথে।" />
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
            <Bi en="Explore different CSE career paths, follow structured roadmaps, and develop the skills you need to build your future in technology." bn="বিভিন্ন CSE ক্যারিয়ার পথ দেখো, সাজানো রোডম্যাপ অনুসরণ করো এবং প্রযুক্তিতে নিজের ভবিষ্যৎ গড়ার দক্ষতা তৈরি করো।" />
          </p>
          <div className="mt-10 space-y-6">
            {[
              {
                icon: Compass,
                title: lang === "bn" ? "সাজানো রোডম্যাপ" : "Structured Roadmaps",
                description: lang === "bn" ? "ধাপে ধাপে শেখার পথ অনুসরণ করো।" : "Follow step-by-step learning paths.",
              },
              {
                icon: BookOpen,
                title: lang === "bn" ? "বাস্তব প্রজেক্ট" : "Real Projects",
                description: lang === "bn" ? "ব্যবহারিক দক্ষতা ও পোর্টফোলিও গড়ো।" : "Build practical skills and your portfolio.",
              },
              {
                icon: Zap,
                title: lang === "bn" ? "একাধিক ক্যারিয়ার পথ" : "Multiple Career Paths",
                description: lang === "bn" ? "ওয়েব ডেভেলপমেন্ট, AI ও আরও অনেক কিছু দেখো।" : "Explore Web Development, AI and beyond.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.12 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.07] text-violet-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-12">
            <p className="text-lg font-semibold italic text-violet-300">
              <Bi en="Your Tech Journey Starts Here." bn="তোমার টেক যাত্রা শুরু এখানেই।" />
            </p>
            <div className="mt-2 h-1 w-36 rounded-full bg-linear-to-r from-violet-500 to-blue-500" />
          </div>
        </motion.div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c18]/90 p-6 shadow-[0_0_80px_rgba(109,40,217,0.08)] backdrop-blur-xl sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-[70px]" />

            <div className="relative">
              {/* Card heading */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                  <Code2 size={30} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  <Bi en="Welcome Back" bn="আবার স্বাগতম" />
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  <Bi en="Sign in to your account and continue" bn="তোমার অ্যাকাউন্টে সাইন ইন করে চালিয়ে যাও" />
                  <br className="hidden sm:block" /> <Bi en="your learning journey." bn="তোমার শেখার যাত্রা।" />
                </p>
              </div>

              {/* Login form */}
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.target);
                  const userData = Object.fromEntries(formData.entries());

                  const loadingId = showLoading(t("auth_signing_in"), undefined);
                  const { error: signInError } = await signIn.email({
                    email: String(userData.email),
                    password: String(userData.password),
                  });
                  dismiss(loadingId);
                  if (signInError) {
                    const isEmailNotVerified = signInError.code === "EMAIL_NOT_VERIFIED";

                    if (isEmailNotVerified) {
                      setPendingEmail(String(userData.email));
                      setShowUnverified(true);
                    } else {
                      error(signInError.message || t("notif_login_failed"), undefined, {
                        duration: 2500,
                      });
                    }
                  } else {
                    success(t("notif_login_success"), undefined, {
                      duration: 2500,
                    });
                    router.push("/");
                  }
                }}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                    <Bi en="Email Address" bn="ইমেইল ঠিকানা" />
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c101c] px-4 transition focus-within:border-[#00f5a0]/60 focus-within:ring-2 focus-within:ring-[#00f5a0]/10">
                    <Mail size={18} className="shrink-0 text-zinc-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={lang === "bn" ? "তোমার ইমেইল ঠিকানা লেখো" : "Enter your email address"}
                      autoComplete="email"
                      required
                      className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 font-sans"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                    <Bi en="Password" bn="পাসওয়ার্ড" />
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c101c] px-4 transition focus-within:border-[#00f5a0]/60 focus-within:ring-2 focus-within:ring-[#00f5a0]/10">
                    <LockKeyhole size={18} className="shrink-0 text-zinc-500" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={lang === "bn" ? "তোমার পাসওয়ার্ড লেখো" : "Enter your password"}
                      autoComplete="current-password"
                      required
                      className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? (lang === "bn" ? "পাসওয়ার্ড লুকাও" : "Hide password") : "Show password"}
                      className="shrink-0 text-zinc-500 transition hover:text-[#00f5a0]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember and forgot password */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <label className="flex cursor-pointer items-center gap-2.5 text-zinc-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="sr-only"
                    />
                    <span className={`flex h-4 w-4 items-center justify-center rounded border transition ${rememberMe ? "border-[#00f5a0] bg-[#00f5a0] text-black" : "border-zinc-700 bg-transparent"}`}>
                      {rememberMe && <Check size={12} />}
                    </span>
                    <Bi en="Remember me" bn="আমাকে মনে রাখো" />
                  </label>
                  <Link href="/forgot-password" className="font-medium text-[#00f5a0] transition hover:underline">
                    <Bi en="Forgot password?" bn="পাসওয়ার্ড ভুলে গেছ?" />
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-xs font-mono font-bold uppercase tracking-wider text-black shadow-lg shadow-[#00f5a0]/20 transition duration-300 hover:shadow-[#00f5a0]/35 hover:scale-[1.01] active:translate-y-0 cursor-pointer"
                >
                  <Bi en="Sign In" bn="সাইন ইন" />
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              {/* Unverified email notice */}
              {showUnverified && (
                <div className="mt-6 p-4 rounded-xl border border-violet-500/30 bg-violet-500/[0.05]">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-violet-400">!</span>
                    <div>
                      <p className="text-sm text-zinc-200">
                        <Bi en={t("verify_email_not_verified")} bn={t("verify_email_not_verified")} />
                      </p>
                      <p className="mt-2 text-xs text-zinc-500">
                        {lang === "bn"
                          ? `আপনার ইমেইল: ${pendingEmail}`
                          : `Email: ${pendingEmail}`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={handleResendVerification}
                      disabled={isResending || resendCooldown > 0}
                      className="text-xs font-medium text-violet-400 transition cursor-pointer hover:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResending
                        ? lang === "bn"
                          ? "পাঠানো হচ্ছে..."
                          : "Sending..."
                        : resendCooldown > 0
                          ? t("verify_cooldown", { seconds: resendCooldown })
                          : lang === "bn"
                            ? "যাচাইকরণ ইমেইল আবার পাঠান"
                            : t("verify_resend")}
                    </button>
                    <Link
                      href="/verify-email"
                      className="text-xs font-medium text-zinc-400 transition hover:text-zinc-200"
                    >
                      <Bi en="Go to verification page" bn="যাচাইকরণ পৃষ্ঠায় যাও" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-xs text-zinc-600"><Bi en="Or continue with" bn="অথবা এর মাধ্যমে চালিয়ে যাও" /></span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              {/* Social login UI */}
              <SocialBtn />

              {/* Sign up */}
              <p className="mt-8 text-center text-sm text-zinc-400">
                <Bi en="Don&apos;t have an account?" bn="অ্যাকাউন্ট নেই?" />{" "}
                <Link href="/sign-up" className="font-semibold text-[#00f5a0] transition hover:underline">
                  <Bi en="Sign Up" bn="সাইন আপ" />
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-zinc-600">
            <Bi en="Learn consistently. Build confidently. Grow continuously." bn="নিয়মিত শেখো। আত্মবিশ্বাসে বানাও। অবিরাম এগিয়ে যাও।" />
          </p>
        </motion.div>
      </section>
    </main>
  );
}
