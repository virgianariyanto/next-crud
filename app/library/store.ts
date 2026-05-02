import fs from "fs";
import { User } from "./types";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

function readUsers(): User[] {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as User[];
}

function writeData(users: User[]): void {
    const json = JSON.stringify(users, null, 2);

    fs.writeFileSync(DB_PATH, json, "utf-8")
}

export function getAllUsers(): User[] {
    const users = readUsers();
    return users.sort((a,b) => a.name.localeCompare(b.name))
}
