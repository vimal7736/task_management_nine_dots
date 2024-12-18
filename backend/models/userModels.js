import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        console.log('password is modified');
        
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully.');
    next();
});

userSchema.methods.matchPassword = async function (enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password)
} 

const mernUser = mongoose.model('mernUser',userSchema);

export default mernUser ;