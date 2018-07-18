const api = require('express').Router();
const { files } = require('../lib/database');
const path = require('path');
const fs = require('fs');

api.get('/files', (req, res) => {
    return res.send(200);
});

api.post('/upload', function(req, res) {
	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
		
	 	var extname = path.extname(filename);
    	var newfilename = Buffer.from(filename).toString('base64').replace(/=/ig, '') + extname;
        var dirname = path.join(process.cwd(), 'uploads');
        var newPath = path.join(dirname, newfilename);
		
        //Path where image will be uploaded
        fstream = fs.createWriteStream(newPath);
        file.pipe(fstream);
		
		fstream.on('error', function (err) {    
        	res.json({ status : 'error', message : 'Error occured', data : { error : err } });
        });

        fstream.on('close', function () {    
        	const attachment = files.insert({ filename : newPath, timestamp : (new Date).toISOString() }).write();
            res.json({ status : 'success', message : 'Upload successfull', data : attachment });
        });
    });
});

module.exports = api;