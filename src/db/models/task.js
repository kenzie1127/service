import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    destinationId: String,
    location: String,
    date: String
});

mongoose.model('task', taskSchema);

export default mongoose.model('task');