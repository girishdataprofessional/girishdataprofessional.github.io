/**
 * BLOG POSTS DATA — Girish E Portfolio
 * ─────────────────────────────────────────────────────────────
 * Add / edit your LinkedIn posts and platform articles here.
 * Each entry maps to a blog card on the website.
 *
 * Fields:
 *   title      – Post headline (keep it punchy, ≤80 chars)
 *   summary    – Short description shown on the card (≤160 chars)
 *   date       – ISO date string: "YYYY-MM-DD"
 *   tag        – Category chip label
 *   url        – Full LinkedIn post URL or article URL
 *   emoji      – Emoji used as the card visual accent
 * ─────────────────────────────────────────────────────────────
 */

const BLOG_POSTS = [
    {
        title: "I Built a Browser Extension to Fix YouTube — Solo, From Scratch",
        summary: "CleanTube started as a personal project to stop losing hours to YouTube's attention traps. Here's how I built a 20+ feature extension with AI summaries, analytics, and Zen Mode — all running locally with zero data collection.",
        date: "2025-03-20",
        tag: "Side Project",
        url: "https://clean-tube.netlify.app/",
        emoji: "🧹"
    },
    {
        title: "How I Added Gemini AI Summarization to a Chrome Extension",
        summary: "One-click video summaries powered by Google Gemini AI — natively in the browser, no server required. Here's the architecture I used to wire up the Gemini API inside a Chrome extension content script.",
        date: "2025-02-14",
        tag: "AI / Browser Extension",
        url: "https://clean-tube.netlify.app/features",
        emoji: "🤖"
    },
    {
        title: "Building Smart Finance Manager: AI + Voice for Personal Finance",
        summary: "I built a full AI-powered finance webapp with voice expense input, intelligent budget alerts, and real-time charts — now serving 25+ active daily users. Here's what I learned shipping a PWA from zero.",
        date: "2025-01-10",
        tag: "Web App",
        url: "https://financetrackerpro.netlify.app/",
        emoji: "💰"
    },
    {
        title: "LinkedIn's Data Architecture: How They Handle Billions of Events",
        summary: "A deep dive into how LinkedIn manages massive data scale using their custom-built infrastructure to deliver real-time insights.",
        date: "2024-12-23",
        tag: "System Architecture",
        url: "https://www.linkedin.com/posts/girish02_linkedin-data-architecture-activity-7278754438431850496-771l",
        emoji: "🏢"
    },
    {
        title: "Netflix's Advanced Data Engineering Architecture",
        summary: "Breaking down how Netflix engineers handle petabytes of streaming data daily using Keystone, Flink, and Iceberg to drive personalization.",
        date: "2024-12-05",
        tag: "Data Engineering",
        url: "https://www.linkedin.com/posts/girish02_netflixs-advanced-data-engineering-architecture-activity-7271129889334804481-MFch",
        emoji: "🍿"
    },
    {
        title: "Technical Dive into Low-Latency Cricket Streaming",
        summary: "How do you stream live cricket to millions concurrently with ultra-low latency? An architecture breakdown of scaling high-traffic video streaming.",
        date: "2024-11-20",
        tag: "Streaming Tech",
        url: "https://www.linkedin.com/posts/girish02_technical-dive-into-low-latency-cricket-streaming-activity-7266059022020026368-F0II",
        emoji: "🏏"
    },
    {
        title: "Swiggy's Tech Stack Overview: Scaling Food Delivery",
        summary: "Exploring the backend systems, microservices, and geographic routing algorithms that power millions of food deliveries daily at Swiggy.",
        date: "2024-11-12",
        tag: "System Design",
        url: "https://www.linkedin.com/posts/girish02_swiggys-tech-stack-overview-activity-7263540812494323712-SD6P",
        emoji: "🛵"
    },
    {
        title: "QR Codes: From Mahjong Tiles to Living Bacteria",
        summary: "The fascinating evolution and engineering behind QR codes, exploring how a simple factory tracking system became a global standard.",
        date: "2024-11-05",
        tag: "Tech History",
        url: "https://www.linkedin.com/posts/girish02_qr-codes-from-mahjong-tiles-to-living-bacteria-activity-7261009508531855360-lZeb",
        emoji: "🔲"
    }
];
