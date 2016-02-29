var AWS = require('aws-sdk'),
Promise = require('promise'),
logger = require('../utils/logger');

AWS.config.update({
	accessKeyId: process.env.AWS_KEY, 
	secretAccessKey: process.env.AWS_SECRET, 
	region: process.env.AWS_REGION
})

var dynamodb = this.dynamodb = new AWS.DynamoDB({apiVersion: '2015-02-02'});

//Don't post more frequently than X milliseconds;
var throttle = 150,
last_call=0;
var get_throttle = function() {
	var current_time = new Date().getTime();
	var since_last_call = current_time - last_call;
	last_call = current_time;
	if (since_last_call < throttle) {
		return throttle - since_last_call;
	} else {
		return 0;
	}
};

//TODO: Add query

//Updates a single item in DynamoDB. Assumes that integers and arrays are added rather than updated.

var update = module.exports.update = function(item) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			// logger.info(item.attrvalues);
			// logger.info(item.update_expression);
			// logger.info(item.key)
			// logger.info(item.table)
			if (!item.attrvalues || !item.update_expression) {
				logger.info("Not enough information to post.");
				resolve();
			}
			dynamodb.updateItem({
				TableName:item.table,
				Key:item.key,
				ReturnValues:'NONE',
				ReturnItemCollectionMetrics:'NONE',
				ReturnConsumedCapacity: 'NONE',
				ExpressionAttributeValues: item.attrvalues,
				UpdateExpression: item.update_expression
			},
			function(err, data) {
				if (err) {
					reject("Error updating DynamoDB:\n" + err);
				} else {
					logger.info('Post successful');
					resolve(data);
				}
			});
		}, get_throttle());
	});
};

module.exports.batch_update = function(items) {
	logger.info("Batch updating " + items.length + " items.");
	if (items.length===0) {
		return new Promise(function(resolve) {resolve()});
	}
	var update_promise = update(items[0]);
	for (var i = items.length - 1; i >= 1; i--) {
		update_promise.then(function() {
			return update(items[i])
		})
	}
	return update_promise;
};
//Post up to 25 items to dynamoDB. 
//TODO: Handle that limitation in this class.

module.exports.post = function(items) {
	return new Promise(function(resolve, reject) {
		//TODO: make this a batchputitem for efficiency's sake.
		if (items === null) {
			resolve();
			return;
		}
		var formatted_items = put_params(items);
		if (!formatted_items) {
			resolve();
			return;
		}
		setTimeout(function() {
			dynamodb.batchWriteItem(formatted_items, function(err, response) {
				if (err) {
					logger.error("Error posting item to dynamo:" + err);
					reject(err);
				} else {
					logger.info("Item post to dynamo successful\n" + JSON.stringify(response));
					resolve();
				}
			});	
		},get_throttle);
	});
};

var put_params = function(items) {
	var formatted_items = [];
	for (var i = items.length - 1; i >= 0; i--) {
		//Some items will be null, skip them.
		if (items[i] === null) {
			continue;
		}
		formatted_items.push({
			PutRequest: {
				Item:  items[i]
            }
          });
	}

	if (formatted_items.length === 0) {
		//Handle the case where we get a set entirely of null variables. This seems to happen with Houston.
		return false;
	} else {
		var dynamo_output = {
		    "RequestItems": {},
		    ReturnConsumedCapacity: 'NONE'
		};
		dynamo_output.RequestItems[process.env.DYNAMODB_NAME] = formatted_items;
		return dynamo_output;		
	}

};

module.exports.query = function(params) {
	return new Promise(function(resolve, reject) {
		dynamodb.query(params, function(err, data) {
			if (err) {
				logger.error('Error in query');
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

module.exports.scan = function(params) {
	  return new Promise(function(resolve, reject) {
	  	dynamodb.scan(params, function(err, data) {
	  		if (err) {
	  			logger.error('Error scanning');
	  			reject(err);
	  		}
	  		else {
	  			logger.info("Got scan result");
	  			resolve(data);
	  		}
	  	});
	  });
};

