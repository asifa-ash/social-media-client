import mongoose from "mongoose"
mongoose.connect('mongodb://127.0.0.1:27017/SocialMedia');

const Schema = mongoose.Schema;
const User = new Schema({
  name:{
    type:String,
    required:true
  },
  isAdmin:{
    type:Boolean,
    required:false
  },
 
  username: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:false
  },
  profilePicture:String,
  coverPicture:String,
  about:String,
  livesIn:String,
  relationship:String,
  followers:[] ,
  followings: [],
 
},
{timestamps:true}
);
const  userModel =new mongoose.model("user",User);

export default userModel;
