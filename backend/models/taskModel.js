import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'mernUser'

    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    dueDate:{
        type: Date,
        required: true,
    },
    status:{
        type: String,
        enum: ['Pending' , 'In Progress', 'Completed'],
        default: 'Pending',
    }
},
{
 timestamps : true
}
)

const Task = mongoose.model('Task', taskSchema);
export default Task;