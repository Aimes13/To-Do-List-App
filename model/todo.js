const pool = require('./database');

// Function that inserts a description into the todo table
const create = (description) =>
    pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
    description,
    ]);

// Function that reads all tasks in the todo table
const get = () => pool.query('SELECT * FROM todo');

// Function that removes a to-do item from todo table using item id
const remove = (id) => pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

module.exports = {
    create, 
    get, 
    remove
};