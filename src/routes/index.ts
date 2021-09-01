import express,{ NextFunction, Request, Response } from 'express';
const router = express.Router();
import Db from '../libs/db'

/* GET home page. */
router.get('/', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const d = await Db.query('SELECT * FROM task');
    res.json(d);
  } catch(err) {
    console.log(err);
  } finally {
    res.json({ message: process.env.DB_USER, status: true, timeStamp: 324234243 })
  }
});

router.post('/task', async function(req: Request, res: Response) {
  const input = req.body;
  try {
    await Db.query('INSERT INTO task VALUES(NULL, ?, ?)', [input.nama_task, input.status_task])
  } catch(err) {
    
  } finally {
    res.json({ message: 'oke' });
  }
});

router.put('/task/:taskId', async function(req: Request, res: Response) {
  const input = req.body;
  const taskId = req.params.taskId;
  console.log(taskId); 
  try {
    await Db.query('UPDATE task SET nama_task = ?, status_task = ? WHERE id_task = ?', [input.nama_task, input.status_task, taskId])
  } catch(err) {
    
  } finally {
    res.json({ message: 'oke' });
  }
});

router.delete('/task/:taskId', async function(req: Request, res: Response) {
  const taskId = req.params.taskId;
  try {
    await Db.query('DELETE FROM task WHERE id_task = ? ', [taskId])
  } catch(err) {
    
  } finally {
    res.json({ message: 'oke' });
  }
});

export default router;
