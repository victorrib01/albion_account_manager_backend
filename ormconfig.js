module.exports = {
    "type": "postgres",
    "host": `${process.env.HOST}`,
    "port": process.env.PORT,
    "username": `${process.env.USER}`,
    "password": `${process.env.PASS}`,
    "database": `${process.env.DB}`,
    "entities": [
        `${process.env.DIR}/entity/**/*.${process.env.EXT}`
    ],
    "migrations": [
        `${process.env.DIR}/database/migrations/**/*.${process.env.EXT}`
    ],
    "subscribers": [
        `${process.env.DIR}/database/migrations/**/*.${process.env.EXT}`
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/database/migrations",
        "subscribersDir": "src/subscriber"
    }
}