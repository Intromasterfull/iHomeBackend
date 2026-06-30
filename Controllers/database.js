const Database = require('better-sqlite3');

//const db_path= /Volumes/IhomeDataBa/iHomeAssets/database/app.db; version mac
const db_path= '/media/intromas33/IhomeDataBa/iHomeAssets/database/app.db';

const db = new Database(db_path);

db.exec(`
CREATE TABLE IF NOT EXISTS relay_schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    relay_1 TEXT,
    relay_2 TEXT,
    relay_3 TEXT,
    relay_4 TEXT,
    relay_5 TEXT,
    relay_6 TEXT,
    dateToRun TEXT
);
`);

module.exports = db;