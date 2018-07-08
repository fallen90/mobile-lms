const AuthUtils = {
	createSession : sessionData => Buffer.from(sessionData).toString('base64')
}

module.exports = AuthUtils;