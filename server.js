'use strict'

const fs = require('fs')
const path = require('path')
const request = require('request')

// Create an express server
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

// Cache
const mcache = require('memory-cache');
const cache = (duration) => {
	return (req, res, next) => {
		let key = '__express__' + req.originalUrl || req.url
		let cachedBody = mcache.get(key)
		if (cachedBody) {
			res.send(cachedBody)
			return
		} else {
			res.sendResponse = res.send
			res.send = (body) => {
			mcache.put(key, body, duration * 1000);
			res.sendResponse(body)
		}
			next()
		}
	}
}

//View engine
app.set('view engine', 'ejs')

//resolve folders
app.use('/assets', express.static(
	path.resolve(__dirname, 'public')
))
app.use('/style', express.static(
	path.resolve(__dirname, 'style')
))

//Render
app.get('/', (req, res) => {  
	const options = {  
		url: 'http://www.mocky.io/v2/594abb60100000350c1aa595',
		json: true
	};

	request(options, (err, response, body) => {
			console.log(body.response.seasons[0].episodes);
			res.render('index',{
				seasons: body.response.seasons
			})
	});
})

// Listen on port 3000
app.listen(port, (error) => {
	if (error) throw error
	console.log('App is running at localhost:3000')
})

