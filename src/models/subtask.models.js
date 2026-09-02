import mongoose, { Schema } from 'mongoose';

const subTaskSchema = new Schema({
    title: {String,
    required: true,
    trim: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    isCompleted: {Boolean,
    default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},
{ timestamps: true })

export const Subtask = mongoose.model("Subtask",subTaskSchema);