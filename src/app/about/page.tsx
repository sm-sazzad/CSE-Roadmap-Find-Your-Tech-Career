import Image from "next/image";
// import profile from "@/assets/profile.png";
// import backdrop from "@/assets/backdrop.jpg";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithubAlt,
  FaJava,
  FaPython,
} from "react-icons/fa6";

import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiCplusplus,
  SiVercel,
  SiNetlify,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: FaGithub,
    link: "https://github.com/sm-sazzad",
    color: "hover:bg-[#181717] hover:border-[#181717]",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/sm-sazzad/",
    color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://www.facebook.com/sazzad.hossain.5758",
    color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/sazzad_hossain5758/",
    color:
      "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent",
  },
  {
    name: "X",
    icon: FaXTwitter,
    link: "https://x.com/sm_sazzad58",
    color: "hover:bg-black hover:border-black",
  },
  {
    name: "Email",
    icon: FaEnvelope,
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com",
    color: "hover:bg-[#EA4335] hover:border-[#EA4335]",
  },
];

const TECH_STACK = [
  { name: "HTML", icon: FaHtml5, color: "hover:text-[#E34F26]" },
  { name: "CSS", icon: FaCss3Alt, color: "hover:text-[#1572B6]" },
  { name: "JavaScript", icon: FaJs, color: "hover:text-[#F7DF1E]" },
  { name: "TypeScript", icon: SiTypescript, color: "hover:text-[#3178C6]" },
  { name: "React", icon: FaReact, color: "hover:text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "hover:text-white" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
  { name: "C++", icon: SiCplusplus, color: "hover:text-[#00599C]" },
  { name: "Java", icon: FaJava, color: "hover:text-[#F89820]" },
  { name: "Python", icon: FaPython, color: "hover:text-[#3776AB]" },
  { name: "Git", icon: FaGitAlt, color: "hover:text-[#F05032]" },
  { name: "GitHub", icon: FaGithubAlt, color: "hover:text-white" },
  { name: "VS Code", icon: VscVscode, color: "hover:text-[#007ACC]" },
  { name: "Vercel", icon: SiVercel, color: "hover:text-white" },
  { name: "Netlify", icon: SiNetlify, color: "hover:text-[#00C7B7]" },
];

const Page = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f172a] mt-20 md:mt-0">
      {/* Backdrop */}

      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-[90%] px-5 py-16 md:px-8 md:py-24">
        {/* Profile + About */}
        <section
          aria-labelledby="about-heading"
          className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20"
        >
          {/* Profile */}
          <div className="flex flex-col items-center md:items-start motion-safe:animate-[fadeIn_0.8s_ease-out]">
            <div className="group relative">
              {/* Animated gradient ring */}
              <div className="absolute -inset-3 rounded-full bg-linear-to-tr from-indigo-500 via-violet-500 to-purple-500 opacity-60 blur-lg transition duration-700 group-hover:opacity-100 group-hover:blur-xl" />

              {/* Rotating conic border */}
              <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#a855f7,#6366f1)] opacity-80 motion-safe:animate-[spin_8s_linear_infinite]" />

              {/* Image */}
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-[#0f172a] shadow-2xl md:h-72 md:w-72">
                <Image
                  src={
                    "https://vistora-sm-sazzad.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimmutable%2Fmedia%2Fprofile.3kznwjxqril1g.png&w=384&q=75"
                  }
                  alt="Portrait of Sheikh Md Sazzad Hossain"
                  fill
                  priority
                  sizes="(min-width: 768px) 18rem, 14rem"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Status dot */}
              <div
                className="absolute bottom-4 right-4 flex h-5 w-5 items-center justify-center md:bottom-6 md:right-6"
                role="status"
                aria-label="Available for opportunities"
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#0f172a]" />
              </div>
            </div>

            <div className="mt-8 text-center md:text-left">
              <h1
                id="about-heading"
                className="bg-linear-to-r from-white via-white to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
              >
                Sheikh Md Sazzad Hossain
              </h1>

              <p className="mt-3 text-sm font-medium text-slate-300 md:text-base">
                Web Developer <span className="text-indigo-400">•</span> CSE
                Student <span className="text-indigo-400">•</span> Future
                Software Engineer
              </p>

              <p className="mt-3 text-sm italic text-slate-400">
                &ldquo;Building, Learning &amp; Growing One Project at a
                Time.&rdquo;
              </p>

              {/* Primary actions */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  Get In Touch
                </a>

                <a
                  href="https://github.com/sm-sazzad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              About Me
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight md:text-[2.5rem]">
              Turning ideas into{" "}
              <span className="bg-linear-to-r from-indigo-400 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                real-world projects.
              </span>
            </h2>

            <div className="mt-6 space-y-5 text-[15px] leading-7 text-slate-300 md:text-base">
              <p>
                I&apos;m a Computer Science &amp; Technology student passionate
                about building modern and user-friendly web experiences.
                I&apos;m currently strengthening my skills in JavaScript,
                TypeScript, React, Next.js, Tailwind CSS, and modern frontend
                development.
              </p>

              <p>
                I enjoy learning new technologies, solving programming problems,
                and turning ideas into real-world projects. My long-term goal is
                to become a skilled Software Engineer, and I&apos;m using web
                development as one of the first steps toward that journey.
              </p>
            </div>

            {/* Social */}
            <div className="mt-9">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Connect With Me
              </p>

              <ul className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ name, icon: Icon, link, color }) => (
                  <li key={name}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={name}
                      aria-label={name}
                      className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lg text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:text-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 ${color}`}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-20 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Tech Stack */}
        <section aria-labelledby="toolkit-heading">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              My Toolkit
            </span>

            <h2
              id="toolkit-heading"
              className="mt-5 text-3xl font-bold text-white md:text-4xl"
            >
              Technologies I Work With
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 md:text-base">
              A curated set of tools and languages I use to craft modern web
              experiences.
            </p>
          </div>

          <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4">
            {TECH_STACK.map(({ name, icon: Icon, color }) => (
              <li
                key={name}
                title={name}
                tabIndex={0}
                className={`group relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-3xl text-slate-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-400 ${color}`}
              >
                <Icon aria-hidden="true" />

                {/* Tooltip */}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0f172a] px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-top-10 group-hover:opacity-100 group-focus-visible:-top-10 group-focus-visible:opacity-100">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer note */}
        <footer className="mt-24 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Sheikh Md Sazzad Hossain — Built with
            Next.js &amp; Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Page;
