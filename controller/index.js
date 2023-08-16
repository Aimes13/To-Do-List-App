const formidable = require('formidable');
const { create, get, remove } = require('../model/todo');

// Middleware function for adding tasks to the todo db
exports.create = (req,res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
        const { description } = fields;

        // If descriptio does not exist, send error
        if (!fields.description) {
            return res.status(400).json({
                error: 'Description is required'
            });
        }
        //If description exists, add to db using create() function
        try {
            const newTask = await create(description);
            return res.status(201).send({ data: newTask.rows[0] });
        } catch (error) {
            //If description cannot be added to db, send error
            return res.status(400).json({ error });
        }
    });
};

// Async function for fetching all existing items in the todo db
exports.read = async (req, res) => {
    try {
        const task = await get();
        return res.json({ data: task.rows });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

// Async function for deleting a task from the todo db
exports.removeTodo = async (req,res) => {
    const id = Number(req.params.id);
    try {
        await remove(id);
        return res.status(200).send({ data: id });
    } catch (error) {
        return res.status(400).json({ error });
    }
};