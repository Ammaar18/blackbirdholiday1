import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get("file");

    if (!file)
      return NextResponse.json({ error: "No file specified" }, { status: 400 });

    const filePath = path.join(process.cwd(), "public", file);
    const data = await fs.readFile(filePath);

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${file.split("/").pop()}"`
      }
    });

  } catch (error) {
    console.error("Download Error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
