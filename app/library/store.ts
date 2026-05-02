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

export function createUser(data: Omit<User, "id">): User {
    const users = readUsers();

    const id = Date.now().toString();
    const newUser: User = {id, ...data}

    users.push(newUser);
    writeData(users);

    return newUser;
}

export function getUserById(id: string): User | undefined {
    const users = readUsers();

    return users.find((u) => String(u.id) === id);
}

export function updateUser(id: string, data: Omit<User, "id">): User | null {
    const users = readUsers();
    const index = users.findIndex((u) => String(u.id) === id);

    if(index === -1) {
        return null
    }

    const updated: User = {...users[index], ...data};
    users[index] = updated;

    writeData(users);
    return updated;
}

export function deleteUser(id: string): boolean {
    const users = readUsers();
    const filtered = users.filter((u) => String(u.id) !== id);

    if (filtered.length === users.length) {
        return false;
    }

    writeData(filtered);
    return true;
}
