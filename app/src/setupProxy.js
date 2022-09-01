//const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
	app.use('/api', createProxyMiddleware({
		target: 'http://localhost:8080',
		changeOrigin: true
	}));
	app.use('/upload', createProxyMiddleware({
		target: 'http://localhost:8080',
		changeOrigin: true
	}));
}