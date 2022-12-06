const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/twitter"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7088',
        secure: false
    });

    app.use(appProxy);
};
