const api = require('express').Router();
const { restore, backup, sync, getRestorePoints } = require('../lib/backupAndRestore');

api.get('/database/backup', (req, res) => {
	backup(() => {
		res.status(200).json({
			status : 'success',
			message : 'databased backup complete'
		});
	});
});

api.get('/database/restore/:id', (req, res) => {
	restore(req.params.id, (err, result) => {
		res.status((err) ? 500 : 200).json((err) ? err : result);
	});
});

api.get('/database/restore-points', (req, res) => {
	getRestorePoints((err, result) => {
		res.status((err) ? 500 : 200).json((err) ? err : result);
	});
});


api.get('/database/sync', (req, res) => {
	sync((err, result) => {
		res.status((err) ? 500 : 200).json((err) ? err : result);
	});
});

module.exports = api;