const fs = require('fs'),
    path = require('path'),
    { db } = require('./database'),
    request = require('request'),
    SERVICE_URL = 'https://jsonbin.org/fallen90/_backups',
    authToken = 'token a6ca3e01-99de-4193-b921-a266ddb0b5a8',
    headers = {
    	'Authorization' : authToken,
    	'Content-Type' : 'application/json'
    };

const backup = (done) => {
    const uri = SERVICE_URL + '/' + (new Date).valueOf();
    const data = db.value();

    const options = {
        uri,
        method: 'POST',
        json: data,
        headers
    };

    request(options, function(error, response, body) {
    	done(error, body);
    });

};

const restore = () => {};

const getBackupList = (done) => {
	const options = {
        uri : SERVICE_URL + '/',
        method: 'GET',
        headers
    };

    request(options, function(error, response, body) {
    	done(error, (body) ? JSON.parse(body) : {});
    });
};

getBackupList(function(error, result){
	console.log(typeof result);
});

module.exports = { backup, restore };