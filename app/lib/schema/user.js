import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    number: Number,
    age: Number,
    batch: Number,
    lastEnrolled: Date,
    pendingFees: Number
});

export default UserSchema;