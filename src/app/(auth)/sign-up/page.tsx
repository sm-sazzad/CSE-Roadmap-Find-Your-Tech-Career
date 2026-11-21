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
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import SocialBtn from "@/components/SocialBtn";
import { useToast } from "@/lib/notifications";

export default function SignupPage() {
  const { lang, t } = useLang();
  const { success, error, loading: showLoading, dismiss } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showCheckInbox, setShowCheckInbox] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;

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

  if (showCheckInbox) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#070710] text-white flex items-center justify-center">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="relative z-10 mx-auto w-full max-w-md p-6 sm:p-9">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c18]/90 p-6 shadow-[0_0_80px_rgba(109,40,217,0.08)] backdrop-blur-xl sm:p-9">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Sparkles size={27} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                <Bi en="Create Account" bn="অ্যাকাউন্ট খোলো" />
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                <Bi en={t("verify_check_inbox")} bn={t("verify_check_inbox")} />
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                <Bi en={t("verify_email_sent")} bn={t("verify_email_sent")} />
                <span className="text-violet-400 font-medium">{pendingEmail}</span>
              </p>
              <button
                onClick={handleResendVerification}
                disabled={isResending || resendCooldown > 0}
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-linear-to-r from-violet-600 to-indigo-500 text-sm font-semibold text-white transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
              <p className="mt-4 text-xs text-zinc-600">
                <Bi en="Did not receive the email?" bn="ইমেইল পাননি?" />
              </p>
              <p className="mt-8 text-center text-xs text-zinc-600">
                <Link href="/login" className="font-medium text-violet-400 transition hover:text-violet-300">
                  <Bi en="Back to Sign In" bn="সাইন ইন ফেরত যাও" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06080e] text-white">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#00f5a0]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#00d2ff]/10 blur-[140px]" />
      <div className="grid-mesh absolute inset-0 opacity-40 pointer-events-none" />

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

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-8">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-4 py-1.5 text-xs font-mono font-medium text-[#00f5a0]">
            <Sparkles size={14} />
            <Bi en="Start building your future today" bn="আজই তোমার ভবিষ্যৎ গড়া শুরু করো" />
          </div>
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.12] tracking-tight xl:text-6xl font-heading">
            <Bi en="Your Future" bn="তোমার ভবিষ্যৎ" />
            <span className="mt-1 block gradient-text">
              <Bi en="Starts Here." bn="শুরু এখানেই।" />
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
            <Bi en="Create your account, discover your ideal tech career, and follow a structured roadmap to turn your goals into real skills." bn="অ্যাকাউন্ট খোলো, তোমার আদর্শ টেক ক্যারিয়ার খুঁজে নাও এবং সাজানো রোডম্যাপ অনুসরণ করে লক্ষ্যকে বাস্তব দক্ষতায় বদলাও।" />
          </p>
          <div className="mt-10 space-y-6">
            {[
              {
                icon: BookOpen,
                title: lang === "bn" ? "ধাপে ধাপে শেখো" : "Learn Step by Step",
                description: lang === "bn" ? "নিজের পছন্দের ক্ষেত্রের পরিষ্কার রোডম্যাপ অনুসরণ করো।" : "Follow a clear roadmap for your chosen field.",
              },
              {
                icon: Code2,
                title: lang === "bn" ? "বাস্তব প্রজেক্ট বানাও" : "Build Real Projects",
                description: lang === "bn" ? "হাতে-কলমে প্রজেক্টে দক্ষতা অনুশীলন করো।" : "Practice your skills with hands-on projects.",
              },
              {
                icon: Zap,
                title: lang === "bn" ? "ক্যারিয়ার গড়ো" : "Grow Your Career",
                description: lang === "bn" ? "আত্মবিশ্বাস ও দিকনির্দেশনা নিয়ে এগিয়ে যাও।" : "Move forward with confidence and direction.",
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
              <Bi en="Dream It. Learn It. Build It." bn="স্বপ্ন দেখো। শেখো। বানাও।" />
            </p>
            <div className="mt-2 h-1 w-36 rounded-full bg-linear-to-r from-violet-500 to-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c18]/90 p-6 shadow-[0_0_80px_rgba(109,40,217,0.08)] backdrop-blur-xl sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-[70px]" />

            <div className="relative">
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                  <Sparkles size={27} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  <Bi en="Create Account" bn="অ্যাকাউন্ট খোলো" />
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  <Bi en="Join the community and start your" bn="কমিউনিটিতে যোগ দাও এবং আজই শুরু করো" />
                  <br className="hidden sm:block" /> <Bi en="tech journey today." bn="তোমার টেক যাত্রা।" />
                </p>
              </div>

              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.target);
                  const userData = Object.fromEntries(formData.entries());

                  if (password !== confirmPassword) {
                    return;
                  }

                  const loadingId = showLoading(t("auth_creating_account"), undefined);
                  const { error: signUpError } = await signUp.email({
                    name: String(userData.name),
                    email: String(userData.email),
                    password: String(userData.password),
                  });
                  dismiss(loadingId);
                  if (signUpError) {
                    error(signUpError.message || t("notif_signup_failed"), undefined, {
                      duration: 2500,
                    });
                  }
                  if (!signUpError) {
                    setPendingEmail(String(userData.email));
                    setShowCheckInbox(true);
                    success(t("notif_signup_success"), undefined, {
                      duration: 2500,
                    });
                  }


                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                    <Bi en="Full Name" bn="পূর্ণ নাম" />
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 transition focus-within:border-violet-500/60 focus-within:ring-2 focus-within:ring-violet-500/10">
                    <UserRound size={18} className="shrink-0 text-zinc-500" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={lang === "bn" ? "তোমার পূর্ণ নাম লেখো" : "Enter your full name"}
                      autoComplete="name"
                      required
                      className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                    <Bi en="Email Address" bn="ইমেইল ঠিকানা" />
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 transition focus-within:border-violet-500/60 focus-within:ring-2 focus-within:ring-violet-500/10">
                    <Mail size={18} className="shrink-0 text-zinc-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={lang === "bn" ? "তোমার ইমেইল লেখো" : "Enter your email"}
                      autoComplete="email"
                      required
                      className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
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
                      placeholder={lang === "bn" ? "একটি পাসওয়ার্ড বানাও" : "Create a password"}
                      autoComplete="new-password"
                      minLength={8}
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 font-sans"
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
                  <p className="mt-1.5 text-[11px] text-zinc-500 font-mono">
                    <Bi en="Use at least 8 characters." bn="কমপক্ষে ৮টি অক্ষর ব্যবহার করো।" />
                  </p>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                    <Bi en="Confirm Password" bn="পাসওয়ার্ড নিশ্চিত করো" />
                  </label>
                  <div className={`flex items-center gap-3 rounded-xl border bg-[#0c101c] px-4 transition focus-within:ring-2 focus-within:ring-[#00f5a0]/10 ${!passwordsMatch ? "border-red-500/50" : "border-white/10 focus-within:border-[#00f5a0]/60"}`}>
                    <LockKeyhole size={18} className="shrink-0 text-zinc-500" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={lang === "bn" ? "পাসওয়ার্ড আবার লেখো" : "Enter password again"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.checked ? "" : event.target.value)}
                      className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      className="shrink-0 text-zinc-500 transition hover:text-[#00f5a0]"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {!passwordsMatch && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">
                      <Bi en="Passwords do not match." bn="পাসওয়ার্ড মিলছে না।" />
                    </p>
                  )}
                </div>
                <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-zinc-400">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    required
                    className="sr-only"
                  />
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${acceptedTerms ? "border-[#00f5a0] bg-[#00f5a0] text-black" : "border-zinc-700 bg-transparent"}`}>
                    {acceptedTerms && <Check size={12} />}
                  </span>
                  <span>
                    <Bi en="I agree to the" bn="আমি সম্মত" />{" "}
                    <Link href="/terms" className="text-[#00f5a0] transition hover:underline">
                      <Bi en="Terms of Service" bn="Terms of Service" />
                    </Link>{" "}
                    <Bi en="and" bn="ও" />{" "}
                    <Link href="/privacy" className="text-[#00f5a0] transition hover:underline">
                      <Bi en="Privacy Policy" bn="Privacy Policy" />
                    </Link>
                    <Bi en="." bn="-তে সম্মত।" />
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!passwordsMatch}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-xs font-mono font-bold uppercase tracking-wider text-black shadow-lg shadow-[#00f5a0]/20 transition duration-300 hover:shadow-[#00f5a0]/35 hover:scale-[1.01] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  <Bi en="Create Account" bn="অ্যাকাউন্ট খোলো" />
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-xs text-zinc-600"><Bi en="Or sign up with" bn="অথবা এর মাধ্যমে সাইন আপ করো" /></span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>
              <SocialBtn />
              <p className="mt-7 text-center text-sm text-zinc-400">
                <Bi en="Already have an account?" bn="আগে থেকেই অ্যাকাউন্ট আছে?" />{" "}
                <Link href="/login" className="font-semibold text-[#00f5a0] transition hover:underline">
                  <Bi en="Sign In" bn="সাইন ইন" />
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
