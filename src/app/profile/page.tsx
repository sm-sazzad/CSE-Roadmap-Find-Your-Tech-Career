"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useToast } from "@/lib/notifications";
import { authClient } from "@/lib/auth-client";
import NextImage from "next/image";
import { Pencil, X } from "lucide-react";

const MAX_IMAGE_BYTES = 200 * 1024;
const MAX_DISPLAY_DIMENSION = 400;
const MAX_NAME_LENGTH = 100;

function initialsOf(nameOrEmail: string): string {
  const trimmed = (nameOrEmail || "").trim();
  if (!trimmed) return "U";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }
  return trimmed.charAt(0).toUpperCase();
}

function compressToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > MAX_DISPLAY_DIMENSION || height > MAX_DISPLAY_DIMENSION) {
        const scale = Math.min(
          MAX_DISPLAY_DIMENSION / width,
          MAX_DISPLAY_DIMENSION / height,
        );
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Unable to process image."));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      try {
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("Unable to read image."));
    img.src = URL.createObjectURL(file);
  });
}

function dataUrlByteSize(dataUrl: string): number {
  const base64 = dataUrl.split(",")[1] || "";
  return Math.ceil((base64.length * 3) / 4);
}

export default function ProfilePage() {
  const { t } = useLang();
  const router = useRouter();
  const { success, error, loading: showLoading, dismiss } = useToast();
  const { data: session, isPending, refetch } = authClient.useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || null;
  const [name, setName] = useState(userName);
  const [image, setImage] = useState<string | null>(userImage);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingRemove, setPendingRemove] = useState(false);

  const [prevUserName, setPrevUserName] = useState(userName);
  if (userName !== prevUserName) {
    setPrevUserName(userName);
    setName(userName);
  }

  if (isPending) {
    return null;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      error(t("profile_error_invalid_type"), undefined, { duration: 4000 });
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      error(t("profile_error_file_too_large"), undefined, { duration: 4000 });
      return;
    }
    try {
      const dataUrl = await compressToDataUrl(file);
      if (dataUrlByteSize(dataUrl) > MAX_IMAGE_BYTES) {
        error(t("profile_error_file_too_large"), undefined, { duration: 4000 });
        return;
      }
      setImage(dataUrl);
      setPreviewUrl(URL.createObjectURL(file));
      setPendingRemove(false);
    } catch {
      error(t("profile_error_upload_failed"), undefined, { duration: 4000 });
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setPendingRemove(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return;

    const trimmedName = name.trim();
    if (trimmedName.length === 0 || trimmedName.length > MAX_NAME_LENGTH) {
      error(t("profile_error_name"), undefined, { duration: 4000 });
      return;
    }

    setIsLoading(true);
    const loadingId = showLoading(t("profile_save"), undefined);

    let imageToSend: string | null | undefined = undefined;
    if (pendingRemove) {
      imageToSend = null;
    } else if (image && image !== userImage) {
      imageToSend = image;
    }

    try {
      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, image: imageToSend }),
      });

      const result = (await res.json()) as { message?: string; ok?: boolean };

      if (!res.ok) {
        dismiss(loadingId);
        setIsLoading(false);
        error(result.message || t("profile_error_upload_failed"), undefined, {
          duration: 4000,
        });
        return;
      }

      dismiss(loadingId);
      setIsLoading(false);
      await refetch();
      setImage(imageToSend ?? null);
      setPreviewUrl(null);
      setPendingRemove(false);
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (imageToSend === null && userImage) {
        success(t("profile_image_updated"), undefined, { duration: 3000 });
      } else if (imageToSend) {
        success(t("profile_image_updated"), undefined, { duration: 3000 });
      } else if (trimmedName !== userName) {
        success(t("profile_name_updated"), undefined, { duration: 3000 });
      } else {
        success(t("profile_save_success"), undefined, { duration: 3000 });
      }
    } catch {
      dismiss(loadingId);
      setIsLoading(false);
      error(t("profile_error_upload_failed"), undefined, { duration: 4000 });
    }
  };

  const avatarSrc = userImage || image || previewUrl;
  const hasAvatar = Boolean(avatarSrc);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-2 text-3xl font-bold text-white tracking-tight sm:text-4xl">
          {t("profile_title")}
        </h2>
        <p className="mt-2 text-zinc-400">
          {t("profile_welcome", { name: userName || userEmail })}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 sm:mt-14 max-w-lg mx-auto space-y-8"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            {hasAvatar ? (
              <NextImage
                src={avatarSrc!}
                alt={userName || "Profile"}
                width={128}
                height={128}
                className="h-32 w-32 rounded-full border border-[#00f5a0]/40 object-cover shadow-[0_0_30px_rgba(0,245,160,0.18)]"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#00f5a0]/40 bg-[#00f5a0]/15 text-4xl font-bold font-mono uppercase tracking-tight text-[#00f5a0] shadow-[0_0_30px_rgba(0,245,160,0.18)]">
                {initialsOf(userName || userEmail)}
              </div>
            )}
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-[#00f5a0] text-black cursor-pointer transition hover:scale-105"
            >
              <input
                id="profile-image"
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="sr-only"
              />
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </label>
            {(image || previewUrl) && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-zinc-300 cursor-pointer transition hover:bg-red-500/20 hover:text-red-300"
                aria-label={t("profile_remove")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400"
          >
            {t("profile_edit_name")}
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            className="w-full rounded-xl border border-white/[0.08] bg-[#0c101c] px-4 py-3 text-white placeholder-zinc-600 focus:border-[#00f5a0]/50 focus:ring-1 focus:ring-[#00f5a0]/50 transition backdrop-blur-sm"
            aria-label={t("profile_edit_name")}
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400"
          >
            {t("profile_email")}
          </label>
          <input
            id="profile-email"
            type="email"
            value={userEmail}
            readOnly
            className="w-full rounded-xl border border-white/[0.08] bg-[#0c101c] px-4 py-3 text-zinc-400 placeholder-zinc-600 backdrop-blur-sm"
            aria-label={t("profile_email")}
          />
        </div>

        {/* Save */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(0,245,160,0.3)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,245,160,0.45)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="flex h-4 w-4 rounded-full border-current border-2 animate-spin">
                <span className="sr-only">Saving</span>
              </span>
              {t("profile_save")}
            </span>
          ) : (
            t("profile_save")
          )}
        </button>
      </form>

      <nav className="mt-12 sm:mt-16 flex items-center justify-center gap-3 text-sm">
        <Link
          href="/sector"
          className="rounded-lg px-4 py-2 text-zinc-400 transition hover:text-white hover:bg-white/[0.05]"
        >
          ← {t("nav_roadmaps")}
        </Link>
      </nav>
    </div>
  );
}
