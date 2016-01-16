var AlchemyAPI = require('alchemy-api'),
Promise = require('promise'),
format_tags = require('./format_tags'),
dynamodb = require('./api/dynamo'),
// config = require('./config'),
get_releases = quire('./get_releases');var alchemy_api = new AlchemyAPI(process.env.ALCHEMY_API_KEY);

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

//TODO: After successful completion, set the tag_complete:true property.


get_releases(10)
	.then(function(releases) {
		var promise_array=[];
		for (var i = releases.length - 1; i >= 0; i--) {
			promise_array.push(
				//Ping alchemyAPI for the taxonomy
				Promise.all([
					get_alchemy(url, 'taxonomy'),
					get_alchemy(url, 'entities')
				])

				//Then update the tags table with the results
				.then(function(results) {
					var tagged_article = {
						taxonomy:results[0].taxonomy,
						entities:results[1].entities,
						article_info:releases[i]
					};
					dynamodb.batch_update(format_tags(article))
						.then(function() {
							return tagged_article;
						});
				})

				//Then update the article and store the alchemy results, just in case we need them later.
				.then(function(tagged_article) {
					return dynamodb.update(get_releases.update_tagged());
				})
			);
		}

		Promise.all(promise_array)
		.then(
			function(results) {
				logger.info(releases.length + 'articles AlchemyAPIed and posted to DynamoDB');
			}, 
			function(err) {
				logger.error(err);
			});		
	})



var format_and_post = ;


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



