import db from './connection.js';
import { hashedPassword } from '../util/passwordHashing.js';

const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
  await db.exec('DROP TABLE IF EXISTS users;');
}

await db.exec(`
CREATE TABLE IF NOT EXISTS users(
    username TEXT PRIMARY KEY NOT NULL UNIQUE,
    email TEXT NOT NULL,
    hashed_password TEXT NOT NULL
);

`);

if (deleteMode) {
  const password = await hashedPassword('1234');

  await db.run('INSERT INTO users VALUES (?, ?, ? );', ['cami', 'cami.the.developer@gmail.com', password]);

  await db.run('INSERT INTO users VALUES (?, ?, ? );', ['mads', 'cami.the.developer@gmail.com', password]);

}
