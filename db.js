const fs = require('fs');

const dbPath = './db/db.json';

async function getDBObject() {
    return JSON.parse(await fs.promises.readFile(dbPath, 'utf-8'));
}

async function saveDBObject(db) {
    await fs.promises.writeFile(dbPath, JSON.stringify(db), 'utf-8');
}

module.exports = {
    get: getDBObject,
    set: saveDBObject
};