import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

// ✅ 一覧取得 (GET)
export async function GET() {
  try {
    const db = await getDB();
    const tools = await db.all("SELECT * FROM tools");
    return NextResponse.json(tools);
  } catch (error) {
    console.error("DBエラー:", error);
    return NextResponse.json({ message: "データベースエラー" }, { status: 500 });
  }
}

// ✅ 追加 (POST)
export async function POST(req: Request) {
  try {
    const { workName, photoUrl, name, quantity } = await req.json();
    const db = await getDB();
    await db.run("INSERT INTO tools (workName, photoUrl, name, quantity) VALUES (?, ?, ?, ?)", workName, photoUrl, name, quantity);
    return NextResponse.json({ message: "追加しました" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "追加に失敗しました" }, { status: 500 });
  }
}

// ✅ 更新 (PATCH)
export async function PATCH(req: Request) {
  try {
    const { id, quantity } = await req.json();
    const db = await getDB();
    await db.run("UPDATE tools SET quantity = ? WHERE id = ?", quantity, id);
    return NextResponse.json({ message: "個数を更新しました" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "個数の更新に失敗しました" }, { status: 500 });
  }
}

// ✅ 削除 (DELETE)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const db = await getDB();
    await db.run("DELETE FROM tools WHERE id = ?", id);
    return NextResponse.json({ message: "削除しました" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "削除に失敗しました" }, { status: 500 });
  }
}

