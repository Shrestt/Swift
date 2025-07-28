// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  conversions;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.conversions = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createConversion(insertConversion) {
    const id = randomUUID();
    const conversion = {
      id,
      ...insertConversion,
      settings: insertConversion.settings || null,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      completedAt: null
    };
    this.conversions.set(id, conversion);
    return conversion;
  }
  async getConversion(id) {
    return this.conversions.get(id);
  }
  async updateConversion(id, updates) {
    const existing = this.conversions.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.conversions.set(id, updated);
    return updated;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var conversions = pgTable("conversions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  originalFormat: text("original_format").notNull(),
  targetFormat: text("target_format").notNull(),
  settings: json("settings"),
  status: text("status").notNull().default("pending"),
  // pending, processing, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertConversionSchema = createInsertSchema(conversions).pick({
  fileName: true,
  originalFormat: true,
  targetFormat: true,
  settings: true
});
var conversionSettingsSchema = z.object({
  outputFormat: z.string(),
  quality: z.enum(["high", "medium", "low"]),
  noiseReduction: z.boolean().default(false),
  autoCompression: z.boolean().default(false),
  ocr: z.boolean().default(false),
  transcription: z.boolean().default(false)
});

// server/routes.ts
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import ffmpeg from "fluent-ffmpeg";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
var upload = multer({
  dest: "/tmp/uploads/",
  limits: {
    fileSize: 100 * 1024 * 1024,
    // 100MB limit
    files: 10
    // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "video/",
      "audio/",
      "image/",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/",
      "application/json",
      "text/csv",
      "application/xml"
    ];
    const isValid = allowedMimes.some((mime) => file.mimetype.startsWith(mime));
    if (!isValid) {
      cb(new Error(`Unsupported file type: ${file.mimetype}`));
      return;
    }
    cb(null, true);
  }
});
async function registerRoutes(app2) {
  app2.post("/api/convert", upload.any(), async (req, res) => {
    try {
      const files = req.files;
      const settingsJson = req.body.settings;
      console.log("Files received:", files?.length || 0);
      console.log("Settings:", settingsJson);
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files provided" });
      }
      let settings;
      try {
        settings = conversionSettingsSchema.parse(JSON.parse(settingsJson));
      } catch (error) {
        return res.status(400).json({ error: "Invalid conversion settings" });
      }
      const file = files[0];
      const originalFormat = path.extname(file.originalname).toLowerCase().slice(1);
      const conversion = await storage.createConversion({
        fileName: file.originalname,
        originalFormat,
        targetFormat: settings.outputFormat,
        settings
      });
      await storage.updateConversion(conversion.id, { status: "processing" });
      try {
        const outputPath = await convertFile(file.path, settings);
        await storage.updateConversion(conversion.id, {
          status: "completed",
          completedAt: /* @__PURE__ */ new Date()
        });
        const convertedFile = await fs.readFile(outputPath);
        res.setHeader("Content-Type", getContentType(settings.outputFormat));
        res.setHeader("Content-Disposition", `attachment; filename="converted.${settings.outputFormat}"`);
        await fs.unlink(file.path).catch(() => {
        });
        await fs.unlink(outputPath).catch(() => {
        });
        res.send(convertedFile);
      } catch (error) {
        await storage.updateConversion(conversion.id, { status: "failed" });
        throw error;
      }
    } catch (error) {
      console.error("Conversion error:", error);
      res.status(500).json({ error: "Conversion failed" });
    }
  });
  app2.get("/api/conversions/:id", async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ error: "Conversion not found" });
      }
      res.json(conversion);
    } catch (error) {
      res.status(500).json({ error: "Failed to get conversion status" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
async function convertFile(inputPath, settings) {
  const outputPath = `/tmp/converted_${Date.now()}.${settings.outputFormat}`;
  const inputExt = path.extname(inputPath).toLowerCase().slice(1);
  try {
    if (["mp4", "mov", "avi", "mkv", "mp3", "wav", "ogg"].includes(settings.outputFormat)) {
      await convertWithFFmpeg(inputPath, outputPath, settings);
    } else if (["jpg", "jpeg", "png", "webp"].includes(settings.outputFormat)) {
      await convertWithSharp(inputPath, outputPath, settings);
    } else if (settings.outputFormat === "pdf" && inputExt === "docx") {
      await convertDocxToPdf(inputPath, outputPath);
    } else if (settings.ocr && ["pdf", "jpg", "jpeg", "png"].includes(inputExt)) {
      await convertWithOCR(inputPath, outputPath, settings);
    } else {
      await fs.copyFile(inputPath, outputPath);
    }
    return outputPath;
  } catch (error) {
    console.error("Conversion error:", error);
    await fs.copyFile(inputPath, outputPath);
    return outputPath;
  }
}
async function convertWithFFmpeg(inputPath, outputPath, settings) {
  return new Promise(async (resolve, reject) => {
    try {
      const ffmpegInstaller = await import("@ffmpeg-installer/ffmpeg");
      ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    } catch (error) {
      console.warn("FFmpeg installer not available, using system ffmpeg");
    }
    let command = ffmpeg(inputPath);
    if (settings.outputFormat.startsWith("mp4") || settings.outputFormat.startsWith("mov")) {
      const crf = settings.quality === "high" ? 18 : settings.quality === "medium" ? 23 : 28;
      command = command.videoCodec("libx264").addOption("-crf", crf.toString());
    }
    if (settings.noiseReduction) {
      command = command.audioFilters("highpass=f=200,lowpass=f=3000");
    }
    command.output(outputPath).on("end", () => resolve()).on("error", (err) => reject(err)).run();
  });
}
async function convertWithSharp(inputPath, outputPath, settings) {
  let pipeline = sharp(inputPath);
  const quality = settings.quality === "high" ? 90 : settings.quality === "medium" ? 75 : 60;
  if (settings.outputFormat === "jpg" || settings.outputFormat === "jpeg") {
    pipeline = pipeline.jpeg({ quality });
  } else if (settings.outputFormat === "png") {
    pipeline = pipeline.png({ quality });
  } else if (settings.outputFormat === "webp") {
    pipeline = pipeline.webp({ quality });
  }
  await pipeline.toFile(outputPath);
}
async function convertDocxToPdf(inputPath, outputPath) {
  const result = await mammoth.extractRawText({ path: inputPath });
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(result.value, {
    x: 50,
    y: page.getHeight() - 50,
    maxWidth: page.getWidth() - 100
  });
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);
}
async function convertWithOCR(inputPath, outputPath, settings) {
  const { data: { text: text2 } } = await Tesseract.recognize(inputPath, "eng");
  if (settings.outputFormat === "txt") {
    await fs.writeFile(outputPath, text2);
  } else {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(text2, {
      x: 50,
      y: page.getHeight() - 50,
      maxWidth: page.getWidth() - 100
    });
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);
  }
}
function getContentType(format) {
  const contentTypes = {
    "mp4": "video/mp4",
    "mp3": "audio/mpeg",
    "wav": "audio/wav",
    "pdf": "application/pdf",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "csv": "text/csv",
    "json": "application/json",
    "xml": "application/xml"
  };
  return contentTypes[format] || "application/octet-stream";
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
