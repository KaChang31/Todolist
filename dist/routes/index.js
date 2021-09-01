"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = __importDefault(require("../libs/db"));
/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const d = await db_1.default.query('SELECT * FROM task');
        res.json(d);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        res.json({ message: process.env.DB_USER, status: true, timeStamp: 324234243 });
    }
});
router.post('/task', async function (req, res) {
    const input = req.body;
    try {
        await db_1.default.query('INSERT INTO task VALUES(NULL, ?, ?)', [input.nama_task, input.status_task]);
    }
    catch (err) {
    }
    finally {
        res.json({ message: 'oke' });
    }
});
router.put('/task/:taskId', async function (req, res) {
    const input = req.body;
    const taskId = req.params.taskId;
    console.log(taskId);
    try {
        await db_1.default.query('UPDATE task SET nama_task = ?, status_task = ? WHERE id_task = ?', [input.nama_task, input.status_task, taskId]);
    }
    catch (err) {
    }
    finally {
        res.json({ message: 'oke' });
    }
});
router.delete('/task/:taskId', async function (req, res) {
    const taskId = req.params.taskId;
    try {
        await db_1.default.query('DELETE FROM task WHERE id_task = ? ', [taskId]);
    }
    catch (err) {
    }
    finally {
        res.json({ message: 'oke' });
    }
});
exports.default = router;
