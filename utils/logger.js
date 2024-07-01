const winston = require('winston')
const CloudWatchTransport = require('winston-aws-cloudwatch');
const { DB_MODELS } = require('../constants/models.constant');
const { NODE_ENV, CLOUDWATCH_GROUP_NAME, CLOUDWATCH_ACCESS_KEY_ID, CLOUDWATCH_SECRET_ACCESS_KEY, CLOUDWATCH_REGION } = require('./../configs/env.config');
const moment = require('moment'); // require
moment.tz.setDefault("America/phoenix");

const { insertEmailInQueue } = require('./../helpers/email.helper');

const logger = winston.createLogger({
    transports: [
        new CloudWatchTransport({
            logGroupName: CLOUDWATCH_GROUP_NAME, // REQUIRED
            logStreamName: NODE_ENV, // REQUIRED
            createLogGroup: true,
            createLogStream: true,
            submissionInterval: 2000,
            submissionRetryCount: 1,
            batchSize: 20,
            awsConfig: {
                accessKeyId: CLOUDWATCH_ACCESS_KEY_ID,
                secretAccessKey: CLOUDWATCH_SECRET_ACCESS_KEY,
                region: CLOUDWATCH_REGION
            },
            formatLog: item =>
                `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
        })
    ]
});

const logError = async (req, res, file, functionName, error, other = {}) => {

    try {
        // logger.log('error', `${file}->${functionName}`, error?.stack);
        let errorData = {};
        let stack = "";

        if (error.name === 'SequelizeDatabaseError') {
            errorData = error;
            stack = error.stack;
        } else {
            stack = error.stack;
        }

        let request_payload = req ? { body: req.body, params: req.params, query: req.query } : { body: {}, params: {}, query: {} };

        if (request_payload?.body?.password) {
            request_payload.body.password = 'REMOVED';
        }

        if (request_payload?.params?.password) {
            request_payload.params.password = 'REMOVED';
        }

        if (request_payload?.query?.password) {
            request_payload.query.password = 'REMOVED';
        }

        request_payload = JSON.stringify(request_payload);

        await DB_MODELS.API_ERROR_LOGS.create({
            user_id: req && req.user?.user_id,
            request_url: req ? req.protocol + '://' + req.get('host') + req.originalUrl : null,
            request_payload,
            function: `${file}->${functionName}`,
            message: error?.message,
            stack: JSON.stringify({ error: errorData, stack }),
            status: 'PENDING',
            server: 'INTAKE-API',
            created_at: moment().toString(),
        });

        // PREPARING EMAIL VARIABLES
        const templatePATH = "templates/errorEmail";
        const templateParams = {
            layout: 'reportOrder.hbs',
            error: {
                file,
                functionName,
                message: error?.message,
                error: JSON.stringify(errorData, null, 2),
                stack: stack
            }
        };

        await insertEmailInQueue({
            templatePATH, templateParams,
            subject: "Error occurred: Intake API",
            emailType: 'RV_API_ERROR',
            attachments: other?.attachments ? other.attachments : null
        });

    } catch (e) {
        console.error("<<<<<<<<<<<<<<<< ERROR OCCURRED >>>>>>>>>>>>>>>>");
        console.error({ file, functionName, error, e });
    }
}

module.exports = {
    logError
}