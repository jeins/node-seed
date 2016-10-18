'use strict';

import Sequelize from 'sequelize';
import dbConf from '../config/database';

class AbstractModel {

    /**
     * setup Sequelize connection
     */
    getConnection(){
        var config = process.env.NODE_ENV || dbConf.development;
        return new Sequelize(
            config.database,
            config.username,
            config.password,
            {
                host: config.host,
                dialect: config.dialect
            }
        );
    }

    /**
     * get data type from Sequelize
     *
     * @param reqType
     * @returns {string}
     */
    getDataType(reqType){
        let dataType = "";

        switch (reqType){
            case 'string': dataType = Sequelize.STRING; break;
            case 'integer': dataType = Sequelize.INTEGER; break;
            case 'text': dataType = Sequelize.TEXT; break;
            case 'float': dataType = Sequelize.FLOAT; break;
            case 'double': dataType = Sequelize.DOUBLE; break;
            case 'date': dataType = Sequelize.DATE; break;
            case 'boolean': dataType = Sequelize.BOOLEAN; break;
        }

        return dataType;
    }
}

module.exports = AbstractModel;