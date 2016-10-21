import AbstractModel from '../Default/AbstractModel';
import ProductField from './Field';

class Product extends AbstractModel{
    constructor(){
        super();

        this.db = this.getConnection();
        this.product = this.db.define(ProductField.tableName, this._generateModel());
    }

    /**
     *
     * @returns {{}}
     * @private
     */
    _generateModel(){
        let model = {};

        model[ProductField.product.f] = {type: this.getDataType(ProductField.product.type)};
        model[ProductField.name.f] = {type: this.getDataType(ProductField.name.type)};
        model[ProductField.price.f] = {type: this.getDataType(ProductField.price.type)};
        model[ProductField.created_at.f] = {type: this.getDataType(ProductField.created_at.type)};
        model[ProductField.updated_at.f] = {type: this.getDataType(ProductField.updated_at.type)};

        return model;
    }

    getProduct(){
        return this.product;
    }

    getAll(callback){
        this.product.findAll().then((product)=>{
            callback(product);
        });
    }

    getById(id, callback){
        this.product.findById(id)
            .then((product)=>{
                callback(null, product);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    add(data, callback){
        let product = {};

        product[ProductField.name.f] = data[ProductField.name.f];
        product[ProductField.product.f] = data[ProductField.product.f];
        product[ProductField.price.f] = data[ProductField.price.f];

        this.product.create(product)
            .then((product)=>{
                callback(null, product.get());
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    update(id, callback){
        let product = {}, condition = {};

        condition[ProductField.id.f] = id;

        product[ProductField.name.f] = data[ProductField.name.f];
        product[ProductField.product.f] = data[ProductField.product.f];
        product[ProductField.price.f] = data[ProductField.price.f];

        this.product.update(product, {where: condition})
            .then((result)=>{
                callback(null, result);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }

    delete(id, callback){
        let condition = {};
        condition[ProductField.id.f] = id;

        this.product.destroy({where: condition})
            .then((result)=>{
                callback(null, result);
            })
            .catch((err)=>{
                callback(err.message, null);
            })
        ;
    }
}

module.exports = Product;