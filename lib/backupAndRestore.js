const fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    { db } = require('./database'),
    request = require('request'),
    SERVICE_URL = 'https://jsonbin.org/fallen90/_backups2',
    authToken = 'token a6ca3e01-99de-4193-b921-a266ddb0b5a8',
    headers = {
        'Authorization': authToken,
        'Content-Type': 'application/json'
    };

const backup = (done) => {
    if (!done) done = function() {};

    const uri = SERVICE_URL + '/' + moment().unix();
    const data = db.getState();

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

const restore = (backup_id, done) => {
    if (!done) done = function() {};

    const data_location = path.join(process.cwd(), 'data', backup_id + '.json');
    if (fs.existsSync(data_location)) {
        const data = require(data_location);
        db.setState(data).write();
        done(null, {
            status: 'success',
            message: 'database restored'
        });
    } else {
        done({
            status: 'error',
            message: 'failed to restore backup. backup doesnt exists locally. sync then try again.'
        }, null);
    }
};

const getRestorePoints = (done) => {
    if (!done) done = function() {};

    const data_location = path.join(process.cwd(), 'data');
    sync(() => {
        fs.readdir(data_location, (err, result) => {
            if (err) done(err, null);
            else {
                const restore_points = result.filter(res => res != 'db.json').map(res => {
                    return {
                        id : res.replace('.json', ''),
                        label : moment.unix(res.replace('.json', '')).format('YYYY-MM-DD HH:mmA')
                    };
                });

                done(null, {
                    status: 'success',
                    data: restore_points
                });
            }
        });
    });
};

const sync = (done) => {
    if (!done) done = function() {};

    // backup current state then sync
    const options = {
        uri: SERVICE_URL + '/',
        method: 'GET',
        headers
    };
    const saveJSONLocally = (id, data) => {
        fs.writeFileSync(path.join(process.cwd(), 'data', id + '.json'), JSON.stringify(data), 'utf8');
    }
    request(options, function(error, response, body) {
        const data = ((body) ? JSON.parse(body) : {});
        if (!error && data && data != {}) {
            const keys = Object.keys(data);

            keys.forEach(key => {
                saveJSONLocally(key, data[key]);
            });

            done(null, {
                status: 'success',
                message: 'sync success'
            });
        } else {
            done({
                status: 'error',
                message: 'sync failed'
            }, null);
        }
    });
};

module.exports = { backup, restore, sync, getRestorePoints };