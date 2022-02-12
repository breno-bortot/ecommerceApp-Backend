import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   seller: {
       type: Boolean,
       default: false
   },
   created_at: {
       type: Date,
       immutable: true,
       default: () => Date.now()
   },
   updated_at: {
    type: Date,
    default: () => Date.now()
   }
});

UserSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) {
            return next();
        }
        
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(this['password'], salt);
        this['password'] = hashed;
        
        return next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest}) => rest 
})


