import mongoose, { Schema} from "mongoose";

const  catergorySchema = new mongoose.Schema({ 
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
   title:{
    type:String,
    required:true,
   },
    
}, {timestamps:true});

const Category = mongoose.model("Category",categorySchema);
export default Category;