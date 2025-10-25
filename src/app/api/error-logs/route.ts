import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "data", "error-logs.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(LOG_FILE);
  } catch (e) {
    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
    await fs.writeFile(LOG_FILE, JSON.stringify([]), "utf-8");
  }
}

export async function GET() {
  try {
    await ensureFile();
    const txt = await fs.readFile(LOG_FILE, "utf-8");
    const items = JSON.parse(txt || "[]");
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to read error logs" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    await ensureFile();
    const txt = await fs.readFile(LOG_FILE, "utf-8");
    const items = JSON.parse(txt || "[]");
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...body,
    };
    items.push(entry);
    await fs.writeFile(LOG_FILE, JSON.stringify(items, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to write error log" },
      { status: 500 },
    );
  }
}
