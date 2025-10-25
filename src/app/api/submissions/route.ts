import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function resolveDataFile(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const isTestCookie = /(?:^|;\s*)useTestData=1(?:;|$)/.test(cookieHeader);
  const url = new URL(request.url);
  const isTestQuery = url.searchParams.get("__test") === "1";
  const useTest = isTestCookie || isTestQuery;
  return useTest
    ? path.join(process.cwd(), "cypress", "fixtures", "submissions.json")
    : path.join(process.cwd(), "data", "submissions.json");
}

export async function GET(request: Request) {
  try {
    const DATA_FILE = resolveDataFile(request);
    const url = new URL(request.url);
    const sp = url.searchParams;
    const q = (sp.get("q") || "").trim();
    const nameQ = (sp.get("name") || "").trim();
    const companyQ = (sp.get("company") || "").trim();
    const phoneQ = (sp.get("phone") || "").trim();
    const emailQ = (sp.get("email") || "").trim();
    const limitParam = sp.get("limit");
    const offsetParam = sp.get("offset");
    const limit = limitParam
      ? Math.max(0, Number.parseInt(limitParam, 10) || 0)
      : 0;
    const offset = offsetParam
      ? Math.max(0, Number.parseInt(offsetParam, 10) || 0)
      : 0;
    // Simulate network latency (~800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));
    const content = await fs.readFile(DATA_FILE, "utf-8").catch(async (_e) => {
      if ((_e as NodeJS.ErrnoException).code === "ENOENT") {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify([]), "utf-8");
        return "[]";
      }
      throw _e;
    });
    let data = JSON.parse(content || "[]");
    const hasFilters = q || nameQ || companyQ || phoneQ || emailQ;
    if (hasFilters) {
      const qi = q.toLowerCase();
      const nameQi = nameQ.toLowerCase();
      const companyQi = companyQ.toLowerCase();
      const phoneQi = phoneQ.toLowerCase();
      const emailQi = emailQ.toLowerCase();
      type Row = {
        name?: string;
        company?: string;
        mobile_phone?: string;
        email_address?: string;
      };
      data = (data as Row[]).filter((item) => {
        const name = String(item.name || "").toLowerCase();
        const company = String(item.company || "").toLowerCase();
        const phone = String(item.mobile_phone || "").toLowerCase();
        const email = String(item.email_address || "").toLowerCase();
        const matchesQ = qi
          ? name.includes(qi) ||
            company.includes(qi) ||
            phone.includes(qi) ||
            email.includes(qi)
          : true;
        const matchesName = nameQi ? name.includes(nameQi) : true;
        const matchesCompany = companyQi ? company.includes(companyQi) : true;
        const matchesPhone = phoneQi ? phone.includes(phoneQi) : true;
        const matchesEmail = emailQi ? email.includes(emailQi) : true;
        return (
          matchesQ &&
          matchesName &&
          matchesCompany &&
          matchesPhone &&
          matchesEmail
        );
      });
    }
    const total = data.length;
    const items = limit > 0 ? data.slice(offset, offset + limit) : data;
    return NextResponse.json({ items, total });
  } catch {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const DATA_FILE = resolveDataFile(request);
    const body = await request.json();
    const content = await fs.readFile(DATA_FILE, "utf-8").catch(async (_e) => {
      if ((_e as NodeJS.ErrnoException).code === "ENOENT") {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify([]), "utf-8");
        return "[]";
      }
      throw _e;
    });
    const data = JSON.parse(content || "[]");
    const item = { id: Date.now(), ...body };
    data.push(item);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
