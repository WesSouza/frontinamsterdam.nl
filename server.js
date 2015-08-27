var express = require('express'),
	compress = require('compression'),
	fs = require('fs'),
	serveStatic = require('serve-static'),
	url = require('url');

var app = express();

var port = process.env.FIA_PORT || 3000;

function redirect (destination, excludeQueryString) {
	return function (req, res, next) {
		var query = url.parse(req.url).query;
		res.redirect(301, destination + (!excludeQueryString && query ? '?' + query : ''));
	}
}

function fourOhFour () {
	var file = fs.readFileSync(__dirname +'/build/404.html', 'utf8');
	return function (req, res, next) {
		res.status(404).send(file);
	}
}

function setHeaders (res, path) {
	if (path.match(/\.(gif|png|jpe?g)$/i)) {
		res.setHeader('Cache-Control', 'public, max-age=7200');
	}
	else if (path.match(/\.(css|js)$/i)) {
		res.setHeader('Cache-Control', 'public, max-age=3024000');
	}
}

app.get('/', function (req, res, next) {
	if (req.query.nr === undefined) {
		var now = Date.now();
		if (now >= 1440743400000 && now <= 1440784800000) {
			res.redirect(302, '/conference.html');
		}
		else {
			next();
		}
	}
	else {
		next();
	}
})

app.use(compress());
app.use(serveStatic(__dirname +'/build', { setHeaders: setHeaders }));

app.get('/c', redirect('/conference.html'))
app.get('/conf', redirect('/conference.html'))
app.get('/conference', redirect('/conference.html'))
app.get('/tickets', redirect('https://ti.to/front-in-amsterdam/2015'))
app.get('/register', redirect('https://ti.to/front-in-amsterdam/2015'))

app.get('/loaderio-b45c6f70577e3c08fc8f7a3cbedac55e', function (req, res) {
	res.end('loaderio-b45c6f70577e3c08fc8f7a3cbedac55e');
});

app.get('*', fourOhFour())

app.listen(port);
