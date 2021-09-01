"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Db {
    static query(query, param) {
        return new Promise((resolve, reject) => {
            this.init();
            this.db.getConnection().then(async (conn) => {
                if (param == undefined)
                    param = [];
                try {
                    const res = await conn.query(query, param);
                    conn.release();
                    resolve(res);
                }
                catch (err) {
                    conn.release();
                    reject(err);
                }
            }).catch((err) => reject(err));
        });
    }
    static init() {
        if (!Db.db) {
            const mariadb = require('mariadb');
            this.db = mariadb.createPool({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            });
        }
    }
}
exports.default = Db;
Db.db = null;
;
