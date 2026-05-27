import db from './connection.js';
import { hashedPassword } from '../util/passwordHashing.js';

const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
    await db.exec('DROP TABLE IF EXISTS users;');
    await db.exec('DROP TABLE IF EXISTS user_informations;');
    await db.exec('DROP TABLE IF EXISTS weight_tables;');
    await db.exec('DROP TABLE IF EXISTS calories;');
}

await db.exec(`
CREATE TABLE IF NOT EXISTS users(
    username TEXT PRIMARY KEY NOT NULL UNIQUE,
    email TEXT NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_informations(
    username TEXT PRIMARY KEY,
    birthday DATE,
    gender TEXT,
    height INTEGER,
    activity_level TEXT,
    goal TEXT,
    start_weight DECIMAL(5,2),
    start_date DATE,
    calorie_goal INTEGER,
    FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE IF NOT EXISTS weight_tables(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    date_for_weight DATE NOT NULL,
    new_weight DECIMAL(5,2),
    FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE IF NOT EXISTS calories_tables(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    date_for_calories DATE NOT NULL,
    calories INTEGER NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username)
);

`);

if (deleteMode) {
    const password = await hashedPassword('1234');

    await db.run('INSERT INTO users VALUES (?, ?, ? );', ['cami', 'cami.the.developer@gmail.com', password]);

    await db.run('INSERT INTO users VALUES (?, ?, ? );', ['mads', 'cami.the.developer@gmail.com', password]);

    await db.run('INSERT INTO user_informations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? );', ['mads', '1998-01-08', 'male', 197, 'moderate', 'maintain_weight', 98.5, '2026-05-20', 3386]);




}
