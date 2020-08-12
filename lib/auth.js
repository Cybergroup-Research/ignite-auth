const { BasicAuth } = require('../auth/functions');

module.exports = function (RED) {
    function auth(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function (msg) {
            if (config.authType === 'basicAuth') {
                basicAuthInfo = {
                    authHeaders: msg.req.headers.authorization,
                    username: config.username,
                    password: config.password
                }
                BasicAuth(basicAuthInfo)
                    .then(response => {
                        console.log(response)
                        msg.payload = response
                    });
            }
            node.send(msg)
        });
    }
    RED.nodes.registerType("auth", auth);
};