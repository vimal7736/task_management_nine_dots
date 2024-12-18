    import asyncHandler from "express-async-handler";
    import mernUser from "../models/userModels.js"
    import generateToken from "../utils/generateToken.js";

    const authUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
      
        const user = await mernUser.findOne({ email });
      
        if (user && (await user.matchPassword(password))) {
          const token = generateToken(res, user._id); // Generate token
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
          });
        } else {
          res.status(401);
          throw new Error("Invalid email or password");
        }
      });
      

      const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
      
        const userExist = await mernUser.findOne({ email });
        if (userExist) {
          res.status(400);
          throw new Error("User already exists");
        }
      
        const user = await mernUser.create({
          name,
          email,
          password,
        });
      
        if (user) {
          const token = generateToken(res, user._id);
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
          });
        } else {
          res.status(400);
          throw new Error("Invalid user data");
        }
      });
      
    const logoutUser = asyncHandler(async (req , res)=>{
        res.cookie('jwt','',{
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({message:'user logged user'})
    })

    //get userprofile
    //private
    //route GET /api/users/profile
    const getUserProfile = asyncHandler(async(req,res)=>{

        const user = await mernUser.findById(req.user._id);
        if(user){
            res.json({
                _id: user._id,
                name: user.name,
                email:user.email,
                
            })
        }else{
            res.status(404);
            throw new Error('User not found');
        }
    
    })

    const updateUserProfile = asyncHandler(async (req, res)=>{
    const user = await mernUser.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email
        })
    }else{
        res.status(401);
        throw new Error("User not found");
        
    }
    })


    export {
        authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile
    }

