const express = require('express'); 
const app = express();
const cors=require('cors');
const pool = require('./db'); //import the databse model
const port=5000;// using port 5000

//middleware
app.use(cors());
app.use(express.json());
//Routes
//create

// POST method used to create a new database entry.
app.post("/todos",async(req,res)=>{
    try {
        const {description} = req.body;
        const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);

        res.json(newTodo);
    } catch (error) {
        console.log(error.message);
        
    }
})
//update
// PUT method used to update an existing entry in the db. :id read using req.params;
app.put("/todos/:id",async(req,res)=>{
    try {
        const {description} = req.body;
        const {id}=req.params;

        const updateTodo = await pool.query("UPDATE todo SET description= $1 WHERE todo_id= $2",[description,id]);
        res.json(updateTodo); 
    } catch (error) {
        console.log(error.message);
    }

})
//delete

app.delete("/todos/:id",async(req,res) => {
    try {
        const { id}=req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id= $1",[id]);

        res.json(deleteTodo);
    } catch (error) {
        console.log(error.message);
    }
})

//get

app.get("/todos",async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get single todo

app.get("/todos/:id",async(req,res)=>{
    try {
        const {id }=req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id]);
        res.json(todo.rows);
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(port,()=>{
    console.log('listening on port',port);
});