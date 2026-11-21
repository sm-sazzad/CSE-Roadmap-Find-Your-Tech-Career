"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import Bi from "@/components/Bi";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/lib/notifications";
import Link from "next/link";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { lang, t } = useLang();
  const { success, error } = useToast();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const verifiedToastRef = useRef(false);
  const errorToastRef = useRef(false);

  const urlError = typeof searchParams.error === "string" ? searchParams.error : undefined;
  const isVerified = Boolean(session?.user?.emailVerified);

  const initialStatus: "verified" | "pending" | "error" = isVerified
    ? "verified"
    : urlError === "expired" || urlError === "invalid"
      ? "error"
      : "pending";

  const [status] = useState<"verified" | "pending" | "error">(initialStatus);

  useEffect(() => {
    if (isVerified && !verifiedToastRef.current) {
      verifiedToastRef.current = true;
      success(t("verify_success"), undefined, { duration: 2500, celebration: true });
    }
  }, [isVerified, success, t]);

  useEffect(() => {
    if (isVerified) {
      router.push("/sector");
    }
  }, [isVerified, router]);

  useEffect(() => {
    if (status === "error" && !errorToastRef.current) {
      errorToastRef.current = true;
      error(t("verify_failed"), undefined, { duration: 4000 });
    }
  }, [status, error, t]);

  const handleResend = async () => {
    if (isResending || resendCooldown > 0) return;

    const email = session?.user?.email;
    if (!email) {
      error(t("notif_email_not_found"), undefined, {
        duration: 3000,
      });
      return;
    }

    setIsResending(true);
    try {
      await authClient.sendVerificationEmail({
        email,
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

  const renderContent = () => {
    if (status === "verified") {
      return (
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            ✓
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            <Bi en="Email Verified!" bn="ইমেইল যাচাইকৃত!" />
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            <Bi en="Your email has been verified. Redirecting..." bn="আপনার ইমেইল যাচাই করা হয়েছে। রিডাইরেক্ট করা হচ্ছে..." />
          </p>
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-300">
            !
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            <Bi en="Verification Failed" bn="যাচাইকরণ ব্যর্থ" />
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            <Bi en={t("verify_failed")} bn={t("verify_failed")} />
          </p>
          <button
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
            className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-linear-to-r from-violet-600 to-indigo-500 text-sm font-semibold text-white transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending
              ? lang === "bn"
                ? "পাঠানো হচ্ছে..."
                : "Sending..."
              : resendCooldown > 0
                ? `${t("verify_cooldown", { seconds: resendCooldown })}`
                : lang === "bn"
                  ? "যাচাইকরণ ইমেইল আবার পাঠান"
                  : t("verify_resend")}
          </button>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
          📧
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          <Bi en="Check Your Inbox" bn="ইনবক্স যাচাই করুন" />
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          <Bi en={t("verify_email_sent")} bn={t("verify_email_sent")} />
          <span className="text-violet-400 font-medium">{session?.user?.email}</span>
          <Bi en=" to verify your email address." bn=" আপনার ইমেইল ঠিকানা যাচাই করার জন্য।" />
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          <Bi en="Did not receive the email?" bn="ইমেইল পাননি?" />{" "}
          <button
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
            className="ml-1 text-sm font-medium text-violet-400 transition cursor-pointer hover:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending
              ? lang === "bn"
                ? "পাঠানো হচ্ছে..."
                : "Sending..."
              : resendCooldown > 0
                ? `${t("verify_cooldown", { seconds: resendCooldown })}`
                : lang === "bn"
                  ? "আবার পাঠান"
                  : "Resend"}
          </button>
        </p>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070710] text-white flex items-center justify-center">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-md p-6 sm:p-9">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c18]/90 p-6 shadow-[0_0_80px_rgba(109,40,217,0.08)] backdrop-blur-xl sm:p-9">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <span className="text-2xl">📧</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight">
              {status === "verified"
                ? lang === "bn"
                  ? "ইমেইল যাচাইকৃত!"
                  : "Email Verified!"
                : status === "error"
                  ? lang === "bn"
                    ? "যাচাইকরণ ব্যর্থ"
                    : "Verification Failed"
                  : lang === "bn"
                    ? "আপনার ইনবক্স যাচাই করুন"
                    : "Check Your Inbox"}
            </h2>

            {renderContent()}

            <p className="mt-8 text-center text-xs text-zinc-600">
              <Link href="/login" className="font-medium text-violet-400 transition hover:text-violet-300">
                <Bi en="Back to Sign In" bn="সাইন ইন ফেরত যাও" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
