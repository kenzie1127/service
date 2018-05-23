import express from 'express';
import bodyParser from 'body-parser';
import task from '../db/models/task';
import uuid from 'uuid/v4';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', async (req, res) => {
    try {
        const tasks = await task.find({});
        res.json({ data: tasks });
   } catch (err) {
       return res
        .status(500)
        .json({ error: { message: "An error occurred"} });
   }
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try{
        const foundTask = await task.findOne({taskId: id});
        if(foundTask) {
            res.json({ data: foundTask });
        }else {
            res.status(404).json({message: 'NOT FOUND'});
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({error: { message: `An error as occurred`} });
    }
});

router.post('/', async (req, res) => {
    try {
        let { location, date } = req.body.data;

        const newTask = {
            location: location,
            destinationId: uuid(),
            date: date
        };
        const created = await task.create(newTask);
        res.json({ data: created });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ error: { message: "An error occurred"} });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await task.findOneAndRemove({destinationId: id});
        if(deleted) {
            res.status(200).send();
        }
        res.status(404).json({message: 'NOT FOUND'});
    }
    catch(err) {
        console.log(err);
        return res
            .status(500)
            .send({error: {message: `An error occured`} });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let { location, date , destinationId } = req.body.data;
        const query = { destinationId: id };
        const updateTask = {
            destinationId: id,
            location: location,
            date: date
        }

        const updated = await task.findOneAndUpdate(query, updateTask, { new: true });
        if(updated) {
            res.json( {data: updated });
        } else {
            res.status(404).send({message: 'NOT FOUND'});
        }
    }
    catch(err) {
        console.log(err);
        return res
            .status(500)
            .send({error: { message: `An error occurred` } });
    }
});

export default router;