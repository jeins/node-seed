'use strict';

import AbstractModel from '../common/AbstractModel';
import PurchaseField from './Field';
import UserField from '../User/Field';
import User from '../User/Model';
import ProductField from '../Product/Field';
import Product from '../Product/Model';

class Purchase extends AbstractModel{

    constructor(){
        super();

        this.db = this.getConnection();
        this.purchase = this.db.define(PurchaseField.tableName, this._generateModel());

        this.user = new User().getUser();
        this.product = new Product().getProduct();

        this.purchase.belongsTo(this.user);
        this.purchase.belongsTo(this.product);

        this.user.hasMany(this.purchase);
        this.product.hasMany(this.purchase);
    }

    /**
     *
     * @returns {{}}
     * @private
     */
    _generateModel(){
        let model = {};

        model[PurchaseField.userId.f] = {type: this.getDataType(PurchaseField.userId.type)};
        model[PurchaseField.productId.f] = {type: this.getDataType(PurchaseField.productId.type)};
        model[PurchaseField.amount.f] = {type: this.getDataType(PurchaseField.amount.type)};
        model[PurchaseField.totalPrice.f] = {type: this.getDataType(PurchaseField.totalPrice.type)};
        model[PurchaseField.created_at.f] = {type: this.getDataType(PurchaseField.created_at.type)};
        model[PurchaseField.updated_at.f] = {type: this.getDataType(PurchaseField.updated_at.type)};

        return model;
    }

    /**
     * get item filter by limit and offset (pagination)
     *
     * @param limit
     * @param offset
     * @param callback
     */
    getByPagination(offset, limit, callback){
        this.purchase.findAll({
            include: [
                {model: this.user, attributes: [UserField.fullName.f, UserField.email.f]},
                {model: this.product, attributes: [ProductField.product.f, ProductField.name.f, ProductField.price.f]}
            ],
            offset: parseInt(offset), limit: parseInt(limit)
        })
            .then((item)=>{
                callback(null, item);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    /**
     * get specific purchase item by id
     *
     * @param id
     * @param callback
     */
    getById(id, callback){
        let condition = {};
        condition[PurchaseField.id.f] = id;

        this.purchase.findAll({
            include: [
                {model: this.user, attributes: [UserField.fullName.f, UserField.email.f]},
                {model: this.product, attributes: [ProductField.product.f, ProductField.name.f, ProductField.price.f]}
            ],
            where: condition
        })
            .then((item)=>{
                callback(null, item);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    /**
     * add new purchase item
     *
     * @param data
     * @param callback
     */
    add(data, callback){
        let purchase = {};

        purchase[PurchaseField.userId.f] = data[PurchaseField.userId.f];
        purchase[PurchaseField.productId.f] = data[PurchaseField.productId.f];
        purchase[PurchaseField.amount.f] = data[PurchaseField.amount.f];
        purchase[PurchaseField.totalPrice.f] = data[PurchaseField.totalPrice.f];

        this.purchase.create(purchase)
            .then((result)=>{
                callback(null, result.get());
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    /**
     * delete purchase item
     *
     * @param id
     * @param callback
     */
    delete(id, callback){
        let condition = {};
        condition[PurchaseField.id.f] = id;

        this.purchase.destroy({where: condition})
            .then((result)=>{
                callback(null, result);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }
}

module.exports = Purchase;