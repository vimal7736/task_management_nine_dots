import mernUser from "../models/userModels.js";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await mernUser.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await mernUser.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});

export { protect };
