// models/Record.js
import mongoose, { Schema } from "mongoose";

const recordSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            enum: ['income', 'expense'],
            required: true,
        },
        notes: String,
    },
    {
        timestamps: true,
    }
);

const Record = mongoose.models.Record || mongoose.model("Record", recordSchema);
export default Record;
