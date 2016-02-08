var AlchemyAPI = require('alchemy-api'),
Promise = require('promise'),
format_tags = require('./format_tags'),
dynamodb = require('./api/dynamo'),
logger = require('./utils/logger'),
// config = require('./config'),
get_releases = require('./get_releases');

var alchemy_api = new AlchemyAPI(process.env.ALCHEMY_API_KEY);

/*
* Takes a stream of press releases and uses IBM's AlchemyAPI to identify their topics an any people mentioned. 
* Data is then stored in a DynamoDB table of the form:
* 
* A mayorsdb_tags table of the form:
*  {"tag":
		{
		"count":1,
		"releases":[
			{
				"title":"TITLE",
				"date:"20160101",
				"url":"http://url.url",
				"hash":"adshf98yh"
			}
		],
		"person1Name":"Mr. Mayor",
		"person1releases":[],
		"city1Name":"New York",
		"city1Count:1,
		"city1releases":[],
	}
*/

//TODO: After successful completion, set the tag_complete:true property.
get_releases()
	.then(function(releases) {
		logger.info("Got " + releases.length + " releases");
		releases = releases.slice(0,process.env.NUMRECORDS)
		logger.info("Shortening to " + releases.length + " releases");
		var promise_array=[];
		for (var i = 0; i < releases.length ; i++) {
			promise_array.push(
				//Ping alchemyAPI for the taxonomy
				Promise.all([
					get_alchemy(releases[i], 'taxonomies'),
					get_alchemy(releases[i], 'entities')
				])

				//Then update the tags table with the results
				.then(function(results) {
					logger.info('Got results from alchemy');
					var tagged_release = {
						taxonomy:results[0].alchemy_result.taxonomy,
						entities:results[1].alchemy_result.entities,
						release_info:results[0].release
					};
					return dynamodb.batch_update(format_tags(tagged_release))
						.then(function() {
							logger.info('Posted batch update to tag db.');
							return tagged_release;
						});
				})

				//Then update the release and store the alchemy results, just in case we need them later.
				.then(function(completed_release) {
					if (completed_release.taxonomy === undefined || completed_release.entities === undefined) {
						logger.error("Failed to get alchemy info for: " + completed_release.release_info.url);
						return new Promise(function(resolve) {resolve()});
					}
					logger.info('Updating completed_release');
					return dynamodb.update(get_releases.update_tagged(completed_release));
				})
			);
		}

		return Promise.all(promise_array)	
	})
	.then(
		function(results) {
			logger.info("DONEZO!!!!");
			logger.info(releases.length + 'releases AlchemyAPIed and posted to DynamoDB');
		}, 
		function(err) {
			logger.error('Got me an error:\n' + err);
	});

//Function which returns a promise to deliver a list of tags in an array.
var get_alchemy = function(release, operation) {
	return new Promise(function(resolve, reject) {
		console.log(release)
		alchemy_api[operation](release.url, {}, function(err, result) {
			if (err) {
				reject("AlchemyAPI error: " + err);
			} else if (result.status == "ERROR") {
				if (result.statusInfo=="page-is-not-html") {
					//TODO: perform a query for page text and send it to alchemy.
					resolve({
						alchemy_result:{},
						release:release
					})
				} else {
					logger.error(result);
					reject("AlchemyAPI error: " + result.statusInfo);
				}
			} else {
				resolve({
					alchemy_result:result,
					release:release
					});
			}
		});
	});
};



