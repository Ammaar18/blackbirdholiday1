// scripts/extract-itinerary.js
// Usage: node scripts/extract-itinerary.js "/absolute/or/relative/path/to/Itenery Black Bird Himachal Shimla-1.pdf" ./data/himachal-itinerary.json

const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

async function run() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: node scripts/extract-itinerary.js <pdfPath> <outJson>");
    process.exit(1);
  }
  const [pdfPath, outJson] = args;
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdf(dataBuffer);
  let text = pdfData.text || "";

  // Normalize whitespace
  text = text.replace(/\r/g, "\n").replace(/\n{2,}/g, "\n\n").trim();

  // Regex to capture Day blocks. Matches 'Day 1', 'Day 01', 'Day 1:' etc.
  const dayRegex = /(Day\s*\d{1,2}\b[:\-–—]?\s*)([\s\S]*?)(?=(?:\bDay\s*\d{1,2}\b[:\-–—]?\s*)|$)/gi;

  const items = [];
  let match;
  while ((match = dayRegex.exec(text)) !== null) {
    const heading = match[1].trim();                 // ex: "Day 1"
    const block = match[2].trim();                   // rest of day block
    // Try to split first line as title (if it looks like a title)
    const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
    let title = "";
    let description = "";

    if (lines.length > 0) {
      // If first line is short (< 60 chars) treat as title
      if (lines[0].length <= 80 && /[A-Za-z]/.test(lines[0])) {
        title = lines[0];
        description = lines.slice(1).join(" ");
      } else {
        // otherwise no separate title
        description = lines.join(" ");
      }
    }

    items.push({
      day: Number((heading.match(/\d+/) || ["0"])[0]),
      title: title,
      description: description,
      raw: block
    });
  }

  // If no days found, fallback: try "Day" spelled differently or "Day 01"
  if (items.length === 0) {
    // fallback: split by common "Day 1" patterns using simple scan lines
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    // group by lines that start with "Day"
    let current = null;
    lines.forEach(line => {
      const d = line.match(/^Day\s*(\d{1,2})\b[:\-–—]?\s*(.*)/i);
      if (d) {
        if (current) items.push(current);
        current = { day: Number(d[1]), title: d[2] || "", description: "" };
      } else {
        if (current) {
          current.description += (current.description ? " " : "") + line;
        }
      }
    });
    if (current) items.push(current);
  }

  // Output a polished JSON with elaborated description (we keep original raw too)
  const out = items.map(it => ({
    day: it.day,
    title: it.title || `Day ${it.day}`,
    description:
      it.description ||
      it.raw ||
      "Details available in original PDF (please check download).",
    raw: it.raw || ""
  }));

  // Ensure output directory exists
  const outDir = path.dirname(outJson);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify({ generatedAt: new Date().toISOString(), itinerary: out }, null, 2));

  console.log("Wrote", outJson, "with", out.length, "days.");
}

run().catch(err => {
  console.error("Error parsing PDF:", err);
  process.exit(1);
});
