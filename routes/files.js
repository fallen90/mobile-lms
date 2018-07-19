const api = require('express').Router();
const { files } = require('../lib/database');
const path = require('path');
const fs = require('fs');

api.get('/files', (req, res) => {
    return res.send(files.value());
});

api.get('/files/:file_id', (req, res) => {
    const file_id = req.params.file_id;
    const file = files.getById(file_id).value();

    if(file) return res.download(file.filename);
    
    return res.status(404).send({
        status : 'error',
        message : 'file not found'
    });
});

api.post('/upload', function(req, res) {
	console.log(req.headers);

    if(req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')){
        return res.status(400).send({
            status : 'error',
            message : 'Cannot parse request. Please make sure you\'re using multipart/form-data',
            data : { headers :  req.headers }
        });
    }

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