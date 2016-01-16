var dynamo = require('./api/dynamo');

//Gets 1000 urls from dynamoDB where tagged = false;

module.exports = function(numurls) {
	return dynamo.scan(params(numurls)).then(dedynoify);
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
            '#title': 'title'
        },
		ProjectionExpression:'#url, #city, #date, #title'
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
module.exports.update_tagged = function(article) {
	return {
		table:process.env.RELEASE_TABLE,
		key:{url:{S:article.article_info.url}},
		values:{
			':taxonomy':{S:JSON.stringify(article.taxonomy)},
			':entities':{S:JSON.stringify(article.entities)}

		},
		update_expression:'SET taxonomy :taxonomy, entities :entities'
	};
};