// s3.js
const env = require('dotenv');
env.config();

const AWS = require('aws-sdk');

console.log(process.env.accessKeyId);

const s3 = new AWS.S3({
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey
})


module.exports = s3;
