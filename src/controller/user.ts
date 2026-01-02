import { Database } from "bun:sqlite";
export const UserController = {
    createUser: (db: Database, username: string, password: string) => {
        // password is in base64
        const stmt = db.prepare("INSERT INTO players (name, password) VALUES (?, ?)")
        stmt.run(username, Bun.password.hashSync(password))
    }
}