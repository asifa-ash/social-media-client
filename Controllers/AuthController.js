import userModel from "../Model/UserModel.mjs";
import bcrypt from "bcrypt";
import jwt from  'jsonwebtoken'
// Register newUser
export const registerUser = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password=hashedPass
  const newUser = new userModel(req.body );
const {username}=req.body
  try {
    const oldUser=await userModel.findOne({username})

if(oldUser){
  return res.status(400).json("user name already register")
}


    const user=await newUser.save();
    const token=jwt.sign({username:user.username,id:user._id,name:user.name}
      ,"MERN",{expiresIn:'1h'})
    res.status(200).json({user,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(req.body);
  }
};

// login user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json("Wrong password");
      
      } else {

        const token=jwt.sign({username:user.username,id:user._id}
          ,"MERN",{expiresIn:'1h'})
          res.status(200).json({user,token})
       
      }
    } else {
      res.status(400).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
