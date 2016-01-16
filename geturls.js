var dynamo = require('./api/dynamo');

//Gets 1000 urls from dynamoDB where tagged = false;

module.exports = function() {
	var params = {
		TableName: process.env.RELEASE_TABLE,
		ConsistentRead: true,
		FilterExpression: 'not tagged',
		Limit: 10,
		ReturnConsumedCapacity: 'TOTAL',
		ProjectionExpression:'url'
	};
	return dynamo.scan(params).then(
		function(results) {
			logger.info("Got scan restults")
			var urls = [];
			for (var i=0; i<results.data.Items.length; i++) {
				urls = results.data.Items[i].url.S;
			}
			console.log(urls);
			return urls;
		})
}


//Return params to update a url to tagged = true
module.exports.update_params = function(url) {
	return {
		table:process.env.RELEASE_TABLE,
		key:{url:{S:url}},
		values:{':tagged':{BOOL:true}},
		update_expression:'SET tagged :tagged'
	};
}