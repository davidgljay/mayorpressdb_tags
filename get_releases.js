var dynamo = require('./api/dynamo'),
logger=require('./utils/logger');

//Gets 1000 urls from dynamoDB where tagged = false;

module.exports = function(numurls) {
	return dynamo.scan(scan_params(numurls)).then(dedynoify);
};

var scan_params = module.exports.scan_params =  function(numurls) {
	return {
		TableName: process.env.RELEASE_TABLE,
		ConsistentRead: true,
		FilterExpression: 'attribute_not_exists (taxonomy)',
		Limit: numurls,
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
	//Remove dynamo formatting from results;
	var unformatted_results = [];
	for (var i = 0; i < results.Items.length; i++) {
		var unformatted_result = {};
		for (var key in results.Items[i]) {
			unformatted_result[key] = results.Items[i][key].S;
		}
		unformatted_results.push(unformatted_result);
	}
	return unformatted_results;
};


//Return params to update a url to tagged = true
module.exports.update_tagged = function(release) {
	return {
		table:process.env.RELEASE_TABLE,
		key:{hash:{S:release.release_info.hash}},
		attrvalues:{
			':taxonomy':{S:JSON.stringify(release.taxonomy)},
			':entities':{S:JSON.stringify(release.entities)}

		},
		update_expression:'SET taxonomy=:taxonomy, entities=:entities'
	};
};