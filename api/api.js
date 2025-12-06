import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config()
const app = express()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const origins = [
    "http://localhost:5173",
    "https://codewithbry.github.io",
    "https://codewithbry.github.io/Spread/",
];

async function categorizeData(articles) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });

    const prompt = `
        You are a news classifier. Assign EXACTLY ONE category to each news article.

        Valid categories:
        [Technology, Sports, Business, Entertainment, Health, Science, Politics, General]

        Return ONLY a JSON array like:
        [
          { "index": 0, "category": "Technology" },
          { "index": 1, "category": "Health" }
        ]

        NO explanations, NO commentary, NO markdown.

        Articles:
        ${JSON.stringify(articles)}
    `;

    const result = await model.generateContent(prompt);
    let raw = result.response.text();

    // Clean AI output more aggressively
    raw = raw
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .replace(/^\s*[\r\n]/gm, "")
        .trim();

    let aiCategories;

    // Safe JSON parse
    try {
        aiCategories = JSON.parse(raw);
    } catch (err) {
        console.error("AI JSON parse failed. Using General category for all.");

        aiCategories = articles.map((_, i) => ({
            index: i,
            category: "General",
        }));
    }

    // Merge categories with real articles
    const finalArticles = articles.map((article, i) => ({
        ...article,
        category: aiCategories[i]?.category || "General",
    }));

    return finalArticles;
}

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow non-browser tools

        const isAllowed = origins.some((allowed) =>
            origin === allowed || origin.startsWith(allowed)
        );

        if (isAllowed) callback(null, true);
        else {
            console.log("❌ CORS Blocked:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options(/. */, cors({ origin: true }))
app.use(express.json())

app.get("/api/getNews", async (req, res) => {
    try {
        const phData = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: 'Philippines OR Filipino OR "Philippine government" OR "Metro Manila"',
                domains: [
                    "rappler.com",
                    "inquirer.net",
                    "philstar.com",
                    "mb.com.ph",
                    "manilatimes.net",
                    "gmanetwork.com",
                    "news.abs-cbn.com",
                ].join(","),
                language: "en",
                sortBy: "publishedAt",
                pageSize: 30,
                apiKey: process.env.NEWS_API_KEY,
            },
        });
        let phArticles = phData.data.articles;
        const seenPH = new Set();
        phArticles = phArticles.filter(a => {
            if (seenPH.has(a.url)) return false;
            seenPH.add(a.url);
            return true;
        });
        const categorizedPH = await categorizeData(phArticles);

        const worldData = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                country: "us",
                pageSize: 30,
                apiKey: process.env.NEWS_API_KEY,
            },
        });
        let worldArticles = worldData.data.articles;
        const categorizedWorld = await categorizeData(worldArticles);
        return res.json({
            phNews: categorizedPH,
            worldNews: categorizedWorld,
        });

    } catch (err) {
        console.error("ERROR:", err);
        return res.status(500).json({ error: "Server Error" });
    }
});

app.get("/api/loadMoreNews", async (req, res) => {
    try {
        const worldData = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                country: "us",
                pageSize: 25,
                apiKey: process.env.NEWS_API_KEY,
            },
        });
        let worldArticles = worldData.data.articles;
        const categorizedWorld = await categorizeData(worldArticles);
        return res.json({
            worldNews: categorizedWorld,
        });

    } catch (err) {
        console.error("ERROR:", err);
        return res.status(500).json({ error: "Server Error" });
    }
})

app.listen(3000, "0.0.0.0", () => console.log("FROM BACKEND"))

app.get("/", (req, res) => {
    res.send("This is the backend!");
});