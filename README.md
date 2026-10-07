# 🚀 CSE Roadmap — Find Your Tech Career

> A modern, interactive roadmap platform designed to help Computer Science & Engineering students discover different technology career paths and learn the skills required to build a career in their chosen field.

**CSE Roadmap** provides structured learning paths for different CSE sectors, including Web Development, AI/ML, Cyber Security, Data Science, Cloud Computing, DevOps, Mobile Development, and many more.

The goal is simple:

**Choose a career path → Follow the roadmap → Learn the skills → Build projects → Become career-ready.**

## 🔗 Live Demo

## Visit: [CSE ROADMAP](https://cse-roadmap-by-sazzad.vercel.app/)

---

## ✨ Features

### 🗺️ Career Roadmaps

Explore different CSE career sectors and follow a structured roadmap for each one.

Each roadmap contains:

- 📌 Sector overview
- 🎯 Difficulty level
- ⏱️ Estimated learning time
- 📚 Prerequisites
- 🧠 Required skills
- 🛠️ Tools & technologies
- 👨‍💻 Career roles
- 🪜 Step-by-step learning path
- 💡 Practice projects
- 📖 Learning resources
- 🚀 Final/capstone project

---

### 🔎 Sector-Based Navigation

Every technology sector has its own unique slug.

Example:

```text
/sector/web-development
/sector/software-engineering
/sector/ai-ml
/sector/data-science
/sector/cyber-security
```

This makes the roadmap pages easy to navigate and share.

---

### 📈 Learning Progress

Users can track their progress through the roadmap stages and understand how much of the learning path they have completed.

---

### 🎨 Premium Dark UI

The website uses a modern dark interface inspired by developer tools and modern SaaS products.

Design characteristics include:

- Dark background
- Violet & blue accents
- Glass-like cards
- Subtle borders
- Soft glows
- Smooth hover effects
- Scroll animations
- Responsive layouts

---

### ✨ Smooth Animations

The project uses **Framer Motion** for subtle UI animations.

Animations include:

- Hero entrance animations
- Scroll reveal
- Staggered sector cards
- Card hover effects
- Roadmap section transitions
- CTA animations

The animations are intentionally subtle so they improve the experience without distracting from the content.

---

## 🧭 Available Career Sectors

The roadmap currently covers multiple CSE-related career paths:

| #   | Sector                      |
| --- | --------------------------- |
| 01  | Web Development             |
| 02  | Software Engineering        |
| 03  | App Development             |
| 04  | AI & Machine Learning       |
| 05  | Data Science                |
| 06  | Cyber Security              |
| 07  | Cloud Computing             |
| 08  | DevOps                      |
| 09  | Database Engineering        |
| 10  | Computer Networking         |
| 11  | Game Development            |
| 12  | Embedded Systems            |
| 13  | Robotics                    |
| 14  | Blockchain & Web3           |
| 15  | UI/UX Design                |
| 16  | Computer Graphics           |
| 17  | AR & VR                     |
| 18  | Natural Language Processing |
| 19  | Computer Vision             |
| 20  | System Administration       |

---

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Animation

- **Framer Motion**

### Icons

- **Lucide React**

### Data

The roadmap content is currently stored locally using JSON files.

```text
src/data/
├── roadmap.json
└── sector.json
```

This keeps the project simple and makes the roadmap content easy to update.

---

## 📁 Project Structure

```text
cse-roadmap
│
├── public
│   └── images
│       └── sectors
│
├── src
│   │
│   ├── app
│   │   ├── about
│   │   │   └── page.tsx
│   │   │
│   │   ├── sector
│   │   │   ├── [slug]
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── page.tsx
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components
│   │   ├── Hero.tsx
│   │   ├── FeaturedSectors.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyCodePath.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── SectorCard.tsx
│   │   │
│   │   ├── roadmap
│   │   │   ├── RoadmapHero.tsx
│   │   │   ├── RoadmapProgress.tsx
│   │   │   └── RoadmapStep.tsx
│   │   │
│   │   └── ui
│   │       └── Reveal.tsx
│   │
│   ├── data
│   │   ├── roadmap.json
│   │   └── sector.json
│   │
│   ├── lib
│   │   └── roadmap.ts
│   │
│   └── types
│       └── roadmap.ts
│
├── .gitignore
├── eslint.config.mjs
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cse-roadmap.git
```

Then enter the project directory:

```bash
cd CSE-Roadmap-Find-Your-Tech-Career
```

---

### 2. Install dependencies

Using npm:

```bash
npm install
```

---

### 3. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

in your browser.

---

## 📦 Important Dependencies

Install the required packages with:

```bash
npm install framer-motion lucide-react
```

The project uses:

```text
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
Lucide React
```

---

## 🗃️ Roadmap Data Structure

The roadmap content is separated from the UI.

### Sector data

```text
src/data/sector.json
```

Contains basic information such as:

```text
slug
name
description
icon
```

Example:

```json
{
  "slug": "web-development",
  "name": "Web Development",
  "description": "Learn how to build modern websites and web applications.",
  "icon": "🌐"
}
```

---

### Roadmap data

```text
src/data/roadmap.json
```

Contains detailed learning information such as:

```text
overview
prerequisites
skills
tools
career_roles
steps
resources
final_project
```

Each roadmap step can contain:

```text
title
level
topics
learning_outcome
projects
```

This separation makes it possible to update roadmap content without changing the UI components.

---

## 🔗 Dynamic Routes

The project uses Next.js dynamic routing.

The route:

```text
/sector/[slug]
```

automatically generates individual roadmap pages.

For example:

```text
/sector/web-development
```

loads the Web Development roadmap.

```text
/sector/ai-ml
```

loads the AI & Machine Learning roadmap.

```text
/sector/cyber-security
```

loads the Cyber Security roadmap.

---

## 🎯 Project Goal

The main goal of CSE Roadmap is to solve a common problem faced by CSE students:

> **"I want to build a career in tech, but I don't know what to learn or where to start."**

Instead of searching through countless tutorials, articles, and random resources, users can choose a career path and follow a structured learning journey.

The platform focuses on:

```text
Discover
   ↓
Choose a Career
   ↓
Follow the Roadmap
   ↓
Learn the Fundamentals
   ↓
Build Projects
   ↓
Build Portfolio
   ↓
Become Career Ready
```

---

## 🔮 Future Improvements

The project is designed to be expanded over time.

Planned improvements include:

- 🔐 User authentication
- 👤 User profiles
- 💾 Cloud-based progress tracking
- 📊 Personal learning dashboard
- 🔖 Bookmark resources
- ✅ Roadmap completion tracking
- 🏆 Achievement system
- 🔔 Learning reminders
- 🔍 Advanced roadmap search
- 🏷️ Skill filtering
- 📚 Resource recommendations
- 🌐 API/database integration
- 📝 User notes
- ⭐ Roadmap reviews
- 📱 Progressive Web App support

---

## 🔐 Authentication

Authentication is planned for a future version.

The current UI already provides:

```text
Sign In
Sign Up
```

buttons, while the actual authentication functionality will be implemented separately.

Possible future authentication providers include:

- Email & Password
- Google
- GitHub

---

## 🤝 Contributing

Contributions are welcome.

If you want to improve the roadmap content, UI, accessibility, performance, or add a new career sector:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-roadmap
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new career roadmap"
```

5. Push the branch.

```bash
git push origin feature/new-roadmap
```

6. Open a Pull Request.

---

## 📜 License

This project is created for educational and learning purposes.

You are free to modify and improve the project according to your needs.

---

## 👨‍💻 Developer

**Sazzad Hossain**

- GitHub: https://github.com/sm-sazzad
- LinkedIn: https://linkedin.com/in/sm-sazzad/

Built with ❤️ using:

**Next.js + TypeScript + Tailwind CSS + Framer Motion**

---

### ⭐ If this project helps you

Consider giving the repository a ⭐ on GitHub and sharing it with other CSE students who are trying to find their path in tech.

**Choose your path. Learn with purpose. Build your future. 🚀**

```

```
