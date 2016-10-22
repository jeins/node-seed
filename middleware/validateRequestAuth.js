import jwt from 'jsonwebtoken';
import AuthController from '../application/User/AuthController';
import config from '../config/config';

export default (req, res, next)=>{
    let token = (req.body && req.body.access_token) || req.headers['authorization'];
    let authCtrl = new AuthController();

    if(token){
        try{
            let decodeToken = jwt.verify(token, config.token.secret);

            if(decodeToken.exp <= Date.now()){
                res.status(400).send({error: "Token Expired"});
                return;
            }

            authCtrl.validateUserByIdAndEmail(decodeToken.data, (isUserValid)=>{
                if(!isUserValid){
                    res.status(401).send({error: "Invalid User"});
                    return;
                }
            });
        } catch (err){
            res.status(500).send({error: err.message});
            return;
        }
    } else{
        res.status(401).send({error: "Invalid Token or Key"});
        return;
    }

    next();
};