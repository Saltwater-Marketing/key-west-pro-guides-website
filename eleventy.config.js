const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

const IMG_DIR = "src/images";

// Turn an output path like /our-trips/backcountry-fishing.html into the live
// address /our-trips/backcountry-fishing (Netlify serves page.html at /page).
function clean(url) {
  if (!url) return url;
  return url.replace(/index\.html$/, "").replace(/\.html$/, "") || "/";
}

async function imageHtml(src, alt, sizes, opts = {}) {
  if (alt === undefined) throw new Error(`Missing alt text for ${src}`);
  const full = path.join(IMG_DIR, src);
  const widths = opts.widths || [400, 800, 1200];
  const meta = await Image(full, {
    widths,
    formats: ["webp", "jpeg"],
    outputDir: "_site/img/",
    urlPath: "/img/",
    sharpWebpOptions: { quality: 72 },
    sharpJpegOptions: { quality: 76, progressive: true },
    filenameFormat: (id, s, width, format) =>
      `${path.basename(s, path.extname(s))}-${width}.${format}`,
  });
  const eager = !!opts.eager;
  const attrs = {
    alt,
    sizes: sizes || "100vw",
    loading: eager ? "eager" : "lazy",
    decoding: eager ? "sync" : "async",
  };
  if (eager) attrs.fetchpriority = "high";
  if (opts.cls) attrs.class = opts.cls;
  return Image.generateHTML(meta, attrs);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  eleventyConfig.addFilter("clean", clean);
  eleventyConfig.addFilter("abs", (url, site) => site.url + clean(url));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("minPrice", (rates) => { const p = (rates || []).map((x) => Number(x.p)).filter((n) => n > 0); return p.length ? Math.min(...p) : null; });
  eleventyConfig.addFilter("hourRange", (rates) => { const h = (rates || []).map((x) => parseInt(x.d, 10)).filter((n) => n > 0); if (!h.length) return null; const lo = Math.min(...h), hi = Math.max(...h); return lo === hi ? `${lo}-hour trips` : `${lo} to ${hi} hour trips`; });
  eleventyConfig.addFilter("money", (n) => "$" + Number(n).toLocaleString("en-US"));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("longDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("byKey", (arr, key, val) => (arr || []).filter((x) => x[key] === val));
  eleventyConfig.addFilter("find", (arr, key, val) => (arr || []).find((x) => x[key] === val));
  eleventyConfig.addFilter("inList", (arr, key, list) => (list || []).map((v) => (arr || []).find((x) => x[key] === v)).filter(Boolean));
  eleventyConfig.addFilter("byKeyData", (arr, key, val) => (arr || []).filter((x) => x.data[key] === val));
  eleventyConfig.addFilter("notUrl", (arr, url) => (arr || []).filter((x) => x.url !== url));
  eleventyConfig.addFilter("bySlugs", (posts, slugs) => slugs.map((s) => (posts || []).find((p) => p.fileSlug === s)).filter(Boolean));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("excludeSlug", (arr, slug) => (arr || []).filter((x) => x.slug !== slug));

  // Site CSS is read once per build and inlined into <head>.
  eleventyConfig.addGlobalData("inlineCss", () =>
    fs.readFileSync("src/assets/css/site.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "")
  );

  eleventyConfig.addAsyncShortcode("img", (src, alt, sizes, cls) => imageHtml(src, alt, sizes, { cls }));
  eleventyConfig.addAsyncShortcode("heroimg", (src, alt, sizes, cls) =>
    imageHtml(src, alt, sizes, { eager: true, cls, widths: [600, 900, 1400, 1920] })
  );
  // Home banner: Paul's graphic on desktop, the restacked phone crop on phones.
  eleventyConfig.addAsyncShortcode("banner", async (desk, phone, alt) => {
    const opts = (widths) => ({
      widths, formats: ["webp", "jpeg"], outputDir: "_site/img/", urlPath: "/img/",
      sharpWebpOptions: { quality: 72 }, sharpJpegOptions: { quality: 76, progressive: true },
      filenameFormat: (id, s, w, f) => `${path.basename(s, path.extname(s))}-${w}.${f}`,
    });
    const d = await Image(path.join(IMG_DIR, desk), opts([800, 1200, 1600, 1920]));
    const p = await Image(path.join(IMG_DIR, phone), opts([390, 600, 780]));
    const ss = (list) => list.map((m) => `${m.url} ${m.width}w`).join(", ");
    const big = d.jpeg[d.jpeg.length - 1];
    return `<picture>
<source media="(max-width: 700px)" type="image/webp" srcset="${ss(p.webp)}" sizes="100vw">
<source media="(max-width: 700px)" type="image/jpeg" srcset="${ss(p.jpeg)}" sizes="100vw">
<source type="image/webp" srcset="${ss(d.webp)}" sizes="100vw">
<img src="${big.url}" srcset="${ss(d.jpeg)}" sizes="100vw" width="${big.width}" height="${big.height}" alt="${alt}" fetchpriority="high" decoding="async">
</picture>`;
  });
  eleventyConfig.addAsyncShortcode("logo", async (lazy) => {
    const meta = await Image(path.join(IMG_DIR, "logo/kwpg-logo.png"), {
      widths: [240, 360, 480],
      formats: ["webp", "png"],
      outputDir: "_site/img/",
      urlPath: "/img/",
      filenameFormat: (id, s, w, f) => `kwpg-logo-${w}.${f}`,
    });
    return Image.generateHTML(meta, {
      alt: "Key West Pro Guides",
      sizes: "(max-width: 380px) 128px, (max-width: 1023px) 156px, 220px",
      loading: lazy ? "lazy" : "eager",
      decoding: "async",
    });
  });
  // Returns only a URL (for og:image and preload).
  eleventyConfig.addAsyncShortcode("imgurl", async (src, width) => {
    const meta = await Image(path.join(IMG_DIR, src), {
      widths: [width || 1200],
      formats: ["jpeg"],
      outputDir: "_site/img/",
      urlPath: "/img/",
      filenameFormat: (id, s, w, f) => `${path.basename(s, path.extname(s))}-${w}.${f}`,
    });
    return meta.jpeg[0].url;
  });

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.html").sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
