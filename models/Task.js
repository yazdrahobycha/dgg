import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isUsed: Boolean,
});

export default mongoose.models.Item || mongoose.model('Task', TaskSchema);