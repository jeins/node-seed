import jwt from 'jsonwebtoken';
import User from './Model';
import config from '../../config/config';

class AuthController{
    constructor(){
        this.user = new User();
    }

    login(req, res){
        let email = req.body.email || '';
        let password = req.body.password || '';

        if(!email || !password){
            res.status(401).send({error: "invalid credentials"});
            return;
        }

        this.validateUser(email, password, (errMessage, user)=>{
            if(errMessage && !user){
                res.status(401).send({error: "invalid credentials"});
                return;
            }

            res.json(this._generateToken(user));
        });
    }

    register(req, res){
        let email = req.body.email || '';
        let password = req.body.password || '';

        if(!email || !password){
            res.status(401).send({error: "invalid credentials"});
            return;
        }

        this.user.add(req.body, (errMessage, user)=>{
            if(errMessage && !user){
                res.status(401).send({error: errMessage});
                return;
            }

            res.json(this._generateToken(user));
        });
    }

    validateUser(email, password, callback){
        this.user.getByEmailAndPassword(email, password, (errMessage, user)=>{
            if(user) callback(null, user);
            else callback(errMessage, null);
        });
    }

    /**
     *
     * @param user
     * @returns {{user: *, token: (*|number), expires: *}}
     * @private
     */
    _generateToken(user){
        let expires = this._expiresIn(7);
        let token = jwt.sign({
            exp: expires,
            data: user
        }, config.token.secret);

        return {
            user: user,
            token: token,
            expires: expires
        }
    }

    /**
     *
     * @param numDays
     * @private
     */
    _expiresIn(numDays) {
        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }
}

module.exports = AuthController;