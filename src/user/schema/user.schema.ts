import * as mongoose from 'mongoose';

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
   updated_at: Date
});