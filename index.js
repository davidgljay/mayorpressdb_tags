var AlchemyAPI = require('alchemy-api'),
// Promise = require('promise'), //Lint seems to think that this is already defined??
format_tags = require('./format_tags'),
dynamodb = require('./api/dynamo'),
config = require('./config');

var alchemy_api = new AlchemyAPI(process.env.ALCHEMY_API_KEY);

/*
* Takes a stream of press releases and uses IBM's AlchemyAPI to identify their topics an any people mentioned. 
* Data is then stored in a DynamoDB table of the form:
* 
* A mayorsdb_tags table of the form:
*  {"tag":
		{
		"count":1,
		"articles":[
			{
				"title":"TITLE",
				"date:"20160101",
				"url":"http://url.url",
				"hash":"adshf98yh"
			}
		],
		"person1Name":"Mr. Mayor",
		"person1Articles":[],
		"city1Name":"New York",
		"city1Count:1,
		"city1Articles":[],
	}
*/

module.exports.handler = function(event, context) {
	var promise_array=[];

	//Extract URLs from event;
	for (var i = event.Records.length - 1; i >= 0; i--) {
		var article_info = event.Records[i].NewImage,
		url = article_info.url;

		//Delete the body, it doesn't need to be stored, and could wind up taking up a lot of extra space.
		delete article_info.body;
		promise_array.push(
			Promise.all([
				get_alchemy(url, 'taxonomy'),
				get_alchemy(url, 'entities')
			])
			.then(format_and_post)
		);
	}

	Promise.all(promise_array)
		.then(
			function(results) {
				context.succeed(event.Records.length + 'articles AlchemyAPIed and posted to DynamoDB');
			}, 
			function(err) {
				context.fail(err);
			});

};

var format_and_post = function(results) {
	var article = {
		taxonomy:results[0].taxonomy,
		entities:results[1].entities,
		article_info:event.Records[i].NewImage
	};
	return dynamodb.batch_update(format_tags(results));
};


//Function which returns a promise to deliver a list of tags in an array.
var get_alchemy = function(url, operation) {
	return new Promise(function(resolve, reject) {
		alchemy_api[operation](url, null, function(result) {
			if (result.status == 'ERROR') {
				reject(result);
			} else {
				resolve(result);
			}
		});
	});
};



