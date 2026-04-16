export const siteConfig = {
  title: "Audio Denoising System | DSP Research",
  description:
    "Digital Signal Processing Mini Project focusing on audio denoising using MATLAB-designed digital filters.",
  author: "DSP Research Group",
  name: "Audio Denoising Project",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "your-github",
  url:
    process.env.SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000/"),
  socialLinks: {
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/your-github",
    twitter:
      process.env.NEXT_PUBLIC_TWITTER_URL ||
      "https://twitter.com/your-twitter",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://linkedin.com/in/your-linkedin",
    email: process.env.NEXT_PUBLIC_EMAIL
      ? `mailto:${process.env.NEXT_PUBLIC_EMAIL}`
      : "mailto:contact@example.com",
    sponsorship:
      process.env.NEXT_PUBLIC_GITHUB_SPONSORS_URL ||
      "https://github.com/sponsors/your-github",
  },
  mainWebsiteUrl: "https://prasadm.vercel.app",
  redirectedPaths: [
    "/authors",
    "/blog",
    "/articles",
    "/projects",
    "/tutorials",
    "/wiki",
    "/snippets",
    "/reading-list",
    "/glossary",
    "/quiz",
    "/researches",
    "/open-books",
    "/game-deal",
    "/feeds",
    "/gallery",
    "/accessibility",
    "/cheat-sheets",
    "/now",
    "/open-source",
    "/portfolio",
    "/resources",
    "/roadmap",
    "/security",
    "/sponsorship",
    "/status",
    "/style-guide",
    "/team",
    "/uses",
  ],
  externalFeeds: {
    blogger: process.env.NEXT_PUBLIC_BLOGGER_RSS || "",
  },
  mission: {
    title: "Our Mission",
    content: [
      "This webapp serves as a comprehensive documentation platform for technical and engineering projects. Our mission is to provide a high-fidelity workspace for documenting research, methodology, and progress.",
      "By leveraging modern web technologies, we aim to bridge the gap between complex engineering data and accessible, professional documentation.",
    ],
  },
  contact: {
    phone: "+00 00 000 0000",
    availability: "Available Mon-Fri, 9:00 AM - 5:00 PM",
    address: [
      "Department of Engineering",
      "University of Technology",
      "City, Country",
    ],
  },
  toolbox: [
    { title: "Design & CAD", items: ["SolidWorks", "AutoCAD", "Fusion 360"] },
    { title: "Programming", items: ["Python", "C++", "TypeScript"] },
    { title: "Analysis", items: ["MATLAB", "Simulation", "Optimization"] },
    { title: "Tools", items: ["Git", "Docker", "AWS"] },
  ],
};

export const ogConfig = {
  baseUrl: "/api/og",
  defaultTitle: "Engineering Workspace",
  defaultDescription:
    "High-performance technical documentation and portfolio platform.",
  // Domain for display in OG images (extracted from SITE_URL)
  domain: process.env.SITE_URL
    ? process.env.SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "template.example.com",
};
