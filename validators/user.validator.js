const Joi = require('joi');
const moment = require('moment'); // require
moment.tz.setDefault("America/phoenix");
const { INTAKE_UPLOAD } = require('../constants/files.constant');
const { generateErrorMessage } = require('../helpers/common.helper');

const company_id = Joi.number().required().messages({
    'any.required': generateErrorMessage({ type: 'required', field: 'company_id' }),
    'number.base': generateErrorMessage({ type: 'number', field: 'company_id' })
});

const appraisalFile = Joi.array().min(1).max(INTAKE_UPLOAD.APPRAISAL.MAX_FILE).items({
    mimetype: Joi.string().valid(...INTAKE_UPLOAD.APPRAISAL.ACCEPTS).required().messages({ 'any.only': INTAKE_UPLOAD.APPRAISAL.ERROR_MESSAGE_ACCEPTS }),
    size: Joi.number().max(INTAKE_UPLOAD.APPRAISAL.MAX_FILE_SIZE).required().messages({ 'number.max': INTAKE_UPLOAD.APPRAISAL.ERROR_MESSAGE_MAX_SIZE, }),
    fieldname: Joi.any().required(),
    originalname: Joi.any().required(),
    encoding: Joi.any().required(),
    buffer: Joi.any().required(),
}).required().messages({ 'any.required': generateErrorMessage({ type: 'optional', field: 'appraisal_file' }), 'array.max': INTAKE_UPLOAD.APPRAISAL.ERROR_MESSAGE_MAX_FILE })


const checkCompanyAVCredits = Joi.object().keys({
    company_id
});

const appraisalFiles = Joi.object().keys({
    appraisal_file: appraisalFile
});
module.exports = {
    checkCompanyAVCredits,
    appraisalFiles
};
