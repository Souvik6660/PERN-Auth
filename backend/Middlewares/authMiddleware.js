import jwt from 'jsonwebtoken';
import respond from '../utils/respond.js';

export const authMiddleware=(req,res,next)=>{
const token=req.cookies?.token;
try {
    if(!token){
      return respond(res,403,'Access Denied. please signup or login');
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=decoded;
    next();
} catch (error) {
    return respond(res,401,"Invalid Token");
}

}