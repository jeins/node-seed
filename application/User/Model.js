import AbstractModel from '../Default/AbstractModel';
import UserField from './Field';
import config from '../../config/config';
import crypto from 'crypto';

class User extends AbstractModel{

    constructor(){
        super();

        this.db = this.getConnection();
        this.user = this.db.define(UserField.tableName, this._generateModel());
    }

    /**
     *
     * @returns {{}}
     * @private
     */
    _generateModel(){
        let model = {};

        model[UserField.fullName.f] = {type: this.getDataType(UserField.fullName.type)};
        model[UserField.email.f] = {type: this.getDataType(UserField.email.type), validate: {isEmail: true}};
        model[UserField.password.f] = {type: this.getDataType(UserField.password.type)};
        model[UserField.created_at.f] = {type: this.getDataType(UserField.created_at.type)};
        model[UserField.updated_at.f] = {type: this.getDataType(UserField.updated_at.type)};

        return model;
    }

    getUser(){
        return this.user;
    }

    /**
     * retrieve all users
     *
     * @param callback
     */
    getAll(callback){
        this.user.findAll().then((user)=>{
            callback(user);
        });
    }

    /**
     * get user with specific id
     *
     * @param id
     * @param callback
     */
    getById(id, callback){
        this.user.findById(id)
            .then((user)=>{
                callback(null, user);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    /**
     * get user from existed email and password
     *
     * @param email
     * @param password
     * @param callback
     */
    getByEmailAndPassword(email, password, callback){
        let condition = {};

        condition[UserField.email.f] = email;
        condition[UserField.password.f] = this._getHash(password);

        this.user.find({attributes: [UserField.id.f, UserField.email.f], where: condition})
            .then((user)=>{
                callback(null, user);
            })
            .catch((err)=>{callback(err.message, null)})
        ;
    }

    /**
     * add new user
     *
     * @param data
     * @param callback
     */
    add(data, callback){
        let user = {};

        user[UserField.fullName.f] = data[UserField.fullName.f];
        user[UserField.email.f] = data[UserField.email.f];
        user[UserField.password.f] = this._getHash(data[UserField.password.f]);

        this.user.create(user)
            .then((user)=>{
                let result = {};
                result[UserField.id.f] = user.get(UserField.id.f);
                result[UserField.email.f] = user.get(UserField.email.f);

                callback(null, result);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    /**
     * update user with specific id
     *
     * @param id
     * @param data
     * @param callback
     */
    update(id, data, callback){
        let user = {}, condition = {};

        condition[UserField.id.f] = id;

        user[UserField.fullName.f] = data[UserField.fullName.f];
        user[UserField.password.f] = data[UserField.password.f];

        this.user.update(user, {where: condition})
            .then((result)=>{
                callback(null, result);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    /**
     * update user with specific id
     *
     * @param id
     * @param callback
     */
    delete(id, callback){
        let condition = {};
        condition[UserField.id.f] = id;

        this.user.destroy({where: condition})
            .then((result)=>{
                callback(null, result);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    /**
     *
     * @param string
     * @returns {*}
     * @private
     */
    _getHash (string){
        return crypto
            .createHmac('sha256', config.sha256.secret)
            .update(string)
            .digest('hex');
    };
}

module.exports = User;