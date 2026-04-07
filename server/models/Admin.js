import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: {          
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    }, { timestamps: true }); 

    export default mongoose.model('Admin', adminSchema);