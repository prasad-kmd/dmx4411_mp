# Engineering Workspace

A modern, high-performance technical documentation and engineering portfolio platform built with **Next.js 16**, **Tailwind CSS 4**, and **TypeScript**. Optimized for mechatronics research, digital architecture, and high-fidelity documentation.

---
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge&logo=node.js)
![pnpm](https://img.shields.io/badge/pnpm-9+-orange?style=for-the-badge&logo=pnpm)
![Code Style](https://img.shields.io/badge/code_style-eslint-4B32C3?style=for-the-badge&logo=eslint)
[![License](https://img.shields.io/github/license/prasad-kmd/dmx4411_mp?style=for-the-badge)](LICENSE)
[![Commit Activity](https://img.shields.io/github/commit-activity/w/prasad-kmd/dmx4411_mp?style=for-the-badge&logo=github)](https://github.com/prasad-kmd/dmx4411_mp/commits)
[![Last Commit](https://img.shields.io/github/last-commit/prasad-kmd/dmx4411_mp?style=for-the-badge&logo=github)](https://github.com/prasad-kmd/dmx4411_mp/commits)
![Star Count](https://img.shields.io/github/stars/prasad-kmd/dmx4411_mp?style=for-the-badge)
![Fork Count](https://img.shields.io/github/forks/prasad-kmd/dmx4411_mp?style=for-the-badge)

---

## ✨ Features

- **🚀 Performance-First Architecture:** Built with **Next.js 16** (App Router) for lightning-fast server-side rendering and minimal client-side hydration.
- **📂 File-Based CMS:** Zero-database architecture. Manage your entire site via Markdown (`.md`) and HTML (`.html`) files with robust frontmatter support.
- **🎨 Unique Design Identity:** 
  - **Redesigned Hero (v7):** A technical "Engineering Excellence" dashboard with a timed carousel of latest works, code-focused aesthetics, and geometric grid systems.
  - **Specialized Cards:** Distinct visual identities for **Blog**, **Articles**, and **Projects** to distinguish different content types.
  - **Technical Wiki:** A structured digital garden for persistent knowledge and documentation.
- **✍️ Authors System:** A comprehensive directory of contributors with high-fidelity "Dossier" profile pages, contribution metrics, and social integration.
- **🛠️ Advanced Technical Pipeline:**
  - **Premium Shiki Highlighting:** VS Code-accurate syntax highlighting using Shiki themes (One Dark Pro) with a custom Mac-style window UI.
  - **LaTeX Support:** Full math notation rendering via KaTeX ($...$ and $$...$$).
  - **Interactive Quizzes:** Dynamic, base64-encoded quiz components injectable directly into content.
  - **GitHub-style Alerts:** Support for `[!NOTE]`, `[!TIP]`, `[!WARNING]`, etc.
- **🛡️ Enterprise-Grade Utilities:**
  - **Spam Protection:** Integrated temp-mail domain blocker for the contact form via `public/data/tempmail.json`.
  - **Smart TOC:** Automatically generated Table of Contents with active-state scroll tracking.
  - **Search & Command Palette:** Global `Cmd+K` search modal for quick navigation.

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:
- **Node.js**: v20.x or higher
- **Package Manager**: `pnpm` (highly recommended)

### 2. Installation & Setup

```bash
# Clone the repository
git clone https://github.com/prasad-kmd/dmx4411_mp.git

# Navigate to the project directory
cd dmx4411_mp

# Install dependencies
pnpm install

# Create local data directory if missing
mkdir -p public/data
```

### 3. Development Mode

Start the development server with hot-reloading:

```bash
pnpm dev
```
The site will be available at `http://localhost:3000`.

### 4. Production Build

To build the application for production:

```bash
pnpm build
pnpm start
```

## 📂 Project Structure

```text
├── app/              # Next.js App Router (Routes & Pages)
├── components/       # Reusable UI components
├── content/          # Markdown/HTML files (Blog, Projects, Wiki, Authors)
├── lib/              # Content loader, utilities, and CMS logic
├── public/           # Static assets (Fonts, Images, Blacklists)
└── types/            # Shared TypeScript definitions
```

## 📝 Content Management

To add new content, create a `.md` or `.html` file in the appropriate `content/` subdirectory.

### Frontmatter Example

```markdown
---
title: "Technical Research Paper"
slug: "technical-research-paper"
date: "2025-05-15"
status: "Published"
description: "In-depth analysis of mechatronic system efficiency."
tags: ["Engineering", "Research"]
category: "Mechatronics"
technical: "Arduino, Python, MATLAB"
author: "your-author-slug"
aiAssisted: false
final: true
---
```

### Authors

Authors are managed in `content/authors/`. Create a `.md` file with the following structure:

```markdown
---
name: "Your Name"
role: "Engineering Undergraduate"
bio: "Documenting the intersection of hardware and digital architecture."
avatar: "/img/authors/your-avatar.webp"
twitter: "your-twitter"
github: "your-username"
linkedin: "your-username"
---
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Syntax Highlighting** | Shiki |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Theme Management** | next-themes |
| **Markdown Processing** | gray-matter, remark, rehype |
| **Math Rendering** | KaTeX |
| **Package Manager** | pnpm |

---

## 📄 License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for the Engineering Community by [@prasad-kmd](https://github.com/prasad-kmd).
