import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import createHttpError from "http-errors";



//desc ; get all task- for authenticated user
// get/ api/tasks
const getTasks = asyncHandler(async (req, res)=>{
    const tasks = await Task.find({user: req.user._id});
    res.json(tasks);
})

//desc  create a new tas
//route post/api/tasks
const createTask = asyncHandler(async(req,res)=>{
    const {title , description, dueDate, status}= req.body;

    if(![title,description,dueDate].every(Boolean)){
        throw createHttpError(400, "All fields required");
    }
    const task = await Task.create({
        user:req.user._id,
        title,
        description,
        dueDate,
        status
    });
    res.status(201).json(task);
})

//desc Update a task
//route/ put/api/task/:id
//private

const updateTask = asyncHandler(async(req,res)=>{
    const task = await Task.findById(req.params.id);

    if(!task){
        res.status(404);
        throw new Error('Task not Found');
    }

    if(task.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error('user not authorised to update this task');
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save()
    res.json(updatedTask);
});


//delete
//delete/api/task
//acess private

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Deleting the task using deleteOne
        await Task.deleteOne({ _id: taskId });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export {getTasks, createTask , updateTask , deleteTask} ;

