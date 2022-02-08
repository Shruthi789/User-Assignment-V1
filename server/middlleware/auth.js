import jwt from 'jsonwebtoken';

function adminAuth(request,response,next){
    try{
    const adminToken=request.header('x-auth-token');
    jwt.verify(adminToken,process.env.ADMIN_SECRETKEY);
    next();
    }catch(error){
      response.status(401).send(error.message);
    }

}
export {adminAuth};