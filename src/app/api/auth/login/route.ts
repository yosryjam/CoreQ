import { NextResponse } from "next/server";

const USERS = new Set(["yusrij", "yurik"]);

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim().toLowerCase();

  if (!username || !USERS.has(username) || body.password !== "123456") {
    return NextResponse.json({ message: "שם משתמש או סיסמה שגויים" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, username, role: "ADMIN" });
  response.cookies.set("coreq_demo_session", "admin", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  response.cookies.set("coreq_demo_user", username, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return response;
}
