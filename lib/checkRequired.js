const _ = require('lodash');

const checkRequired = (data, fields) => {
	return _.difference(data, fields);
};

module.exports = checkRequired;