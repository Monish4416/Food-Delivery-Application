import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://monishansari164:monish1209@cluster0.4voon.mongodb.net/food-delivery")
    .then(()=> console.log("DB connected"));
}