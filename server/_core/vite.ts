import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { metaForPath, originForRequest, robotsForOrigin, seoHtml, sitemapForOrigin } from "./seo";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(robotsForOrigin(originForRequest(req)));
  });
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml").send(sitemapForOrigin(originForRequest(req)));
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      template = seoHtml(template, req);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(robotsForOrigin(originForRequest(req)));
  });
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml").send(sitemapForOrigin(originForRequest(req)));
  });
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // Fall through to the SEO-enriched application shell for all public routes.
  app.use("*", (req, res) => {
    const templatePath = path.resolve(distPath, "index.html");
    const template = fs.readFileSync(templatePath, "utf-8");
    const html = seoHtml(template, req);
    res.status(200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).send(html);
  });
}
