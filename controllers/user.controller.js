"use strict";
const apiHelper = require('../helpers/api.helper');
const { Sequelize } = require('sequelize');
const { COMMON_MESSAGES } = require('../constants/messages.constant');

/**
    ** function     : userList
    ** description  : This function identifies appraisal comps that are there in our db and if not then adds that comp in the property comp table.
    ** route        : appraisal-identify-comps
*/
const userList = async (req, res, next) => {

    try {
        return apiHelper.success(res, COMMON_MESSAGES.RESOURCE_UPDATED, {});
    } catch (error) {        
        return apiHelper.failure(res, error.message);
    }
};



module.exports = {    
    userList
}