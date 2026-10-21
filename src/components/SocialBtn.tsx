import { signIn } from "@/lib/auth-client";
import { Code2 } from "lucide-react";
import React from "react";

const handleGoogle = async () => {
  const data = await signIn.social({
    provider: "google",
  });
};

const SocialBtn = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={handleGoogle}
        type="button"
        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] text-sm text-zinc-300 transition hover:border-violet-500/30 hover:bg-white/[0.05]"
      >
        <span className="text-base font-bold">G</span>
        Google
      </button>

      <button
        type="button"
        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] text-sm text-zinc-300 transition hover:border-violet-500/30 hover:bg-white/[0.05]"
      >
        <Code2 size={17} />
        GitHub
      </button>
    </div>
  );
};

export default SocialBtn;
