import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

// ✅ データベースに接続する関数
export async function getDB(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });
  }
  return db;
}



