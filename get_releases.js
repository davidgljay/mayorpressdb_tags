var dynamo = require('./api/dynamo'),
logger=require('./utils/logger');

var releases = [];

//Get 500 urls that are not yet tagged.
module.exports = function get_releases(lastRelease) {
	logger.info("Getting a batch of releases, starting at:");
	logger.info(lastRelease);
	var params = scan_params();
	if (lastRelease) {params.ExclusiveStartKey=lastRelease;}
	return dynamo.scan(params)
		.then(function (results) {
			releases = releases.concat(results.Items);
			logger.info("Got " + results.Items.length + " results from scan, total " + releases.length + ".");
			if (results.LastEvaluatedKey && releases.length < process.env.NUMRECORDS) {
				return get_releases(results.LastEvaluatedKey);
			} else {
				return dedynoify(releases);
			}
		});
};

//TODO: swith to query against the tagged param.
var scan_params = module.exports.scan_params =  function() {
	return {
		TableName: process.env.RELEASE_TABLE,
		ConsistentRead: true,
		FilterExpression: 'attribute_not_exists (tagged)',
		ReturnConsumedCapacity: 'NONE',
		ExpressionAttributeNames: {
            '#url': 'url',
            '#city': 'city',
            '#date': 'date',
            '#title': 'title',
            '#hash': 'hash'
        },
		ProjectionExpression:'#hash, #url, #city, #date, #title'
	};
};

var dedynoify = module.exports.dedynoify = function(results) {
	logger.info("Running dedynoify");
	//Remove dynamo formatting from results;
	var unformatted_results = [];
	for (var i = 0; i < results.length; i++) {
		var unformatted_result = {};	
		for (var key in results[i]) {
			unformatted_result[key] = results[i][key].S;
		}
		unformatted_results.push(unformatted_result);
	}
	return unformatted_results;
};


//Return params to update a url to tagged = true
module.exports.update_tagged = function(release) {
	return {
		table:process.env.RELEASE_TABLE,
		key:{url:{S:release.release_info.url}},
		attrvalues:{
			':taxonomy':{S:JSON.stringify(release.taxonomy)},
			':entities':{S:JSON.stringify(release.entities)},
			':tagged':{B:'true'}

		},
		update_expression:'SET taxonomy=:taxonomy, entities=:entities, tagged=:tagged'
	};
};