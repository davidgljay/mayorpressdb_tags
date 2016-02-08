var logger = require('./utils/logger');

/* 
* Takes responses from AlchemyApi and formats them in the form:
* *  {"tag":
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
		person1Details:{}
		"person1releases":[],
		"city#Name":"New York",
		"city#Count:1,
		"city#releases":[],
	}
*/

/*
* Receives a response with entities, response, and city info. 
*Responses will include people of the form:
*
"text": "Mayor Annise Parker",
      "disambiguated": {
        "subType": [
          "Politician",
          "BoardMember"
        ],
        "name": "Annise Parker",
        "website": "http://www.houstontx.gov/mayor/index.html",
        "dbpedia": "http://dbpedia.org/resource/Annise_Parker",
        "freebase": "http://rdf.freebase.com/ns/m.0bq8gb",
        "yago": "http://yago-knowledge.org/resource/Annise_Parker"
      }
*
* And taxonomy will be of the form:

[
    {
      "label": "/travel/transports/air travel/airports",
      "score": "0.683369"
    },
    {
      "label": "/travel/transports/air travel/airlines",
      "score": "0.493831"
    },
    {
      "confident": "no",
      "label": "/religion and spirituality/christianity",
      "score": "0.259101"
    }
  ]
* Each word for which "confident" is not marked "no" should be included as a tag.
*/
module.exports = function(alchemy_response) {
	var tag_list = get_tag_list(alchemy_response.taxonomy),
	people_list = get_people_list(alchemy_response.entities),
	tags = [];
	for (var i = tag_list.length - 1; i >= 0; i--) {
		var update_expression = {
			add:new Set(),
			set:new Set(),
			list_append:new Set()
		};
		//Add core tag info
		var attrvals = {
			':tagCount':{N:'1'},
			':dates':{SS:[alchemy_response.release_info.date]},
			':releases':{SS:[JSON.stringify(alchemy_response.release_info)]}
		};
		update_expression.add.add(':dates');
		update_expression.add.add(':tagCount');
		update_expression.add.add(':releases');
		//Add city info
		var city = alchemy_response.release_info.city,
		city_id = city.replace(/[^a-z0-9]/ig,'');
		attrvals[':cityName' + city_id ] = {S:city};
		update_expression.set.add(':cityName' + city_id);

		attrvals[':cityReleases' + city_id ] = {SS:[JSON.stringify(alchemy_response.release_info)]};
		update_expression.add.add(':cityReleases' + city_id);

		//Add people info
		for (var j = people_list.length - 1; j >= 0; j--) {
			var person_id = people_list[j].name.replace(/[^a-z0-9]/ig,'_');
			attrvals[':personName' + person_id] = {S:people_list[j].name};
			update_expression.set.add(':personName' + person_id );
			if (people_list[j].disambiguated) {
				attrvals[':personDetails' + person_id] = {M:people_list[j].disambiguated};
				update_expression.set.add(':personDetails' + person_id);
			}
			attrvals[':personReleases' + person_id] = {SS:[JSON.stringify(alchemy_response.release_info)]};
			update_expression.add.add(':personReleases' + person_id);
		}

		// //Add cross-tags by city
		for (var k = tag_list.length - 1; k >= 0; k--) {
			if (k==i) {
				continue;
			}
			var tag_id = "_" + city + "_" + tag_list[k].replace(/[^a-z0-9]/ig,'_');
			attrvals[':tagName' + tag_id] = {S:tag_id};
			update_expression.set.add(':tagName' + tag_id);

			attrvals[':tagReleases' + tag_id] = {SS:[JSON.stringify(alchemy_response.release_info)]};
			update_expression.add.add(':tagReleases' + tag_id);
		}

		tags.push({
			table:process.env.TAGS_TABLE,
			key:{tag:{S:tag_list[i]}},
			attrvalues:attrvals,
			update_expression:format_update_expression(update_expression)
		});
	}
	return tags;
};


//Get list of tags from the Alchemy taxonomy response 
var get_tag_list = module.exports.get_tag_list = function(alchemy_tags) {
	var tag_list = new Set();
	for (var i = 0; i < alchemy_tags.length ; i++) {
		if (alchemy_tags[i].confident == 'no') {
			continue;
		}
		var labels = alchemy_tags[i].label.split('/').slice(1);
		for (var j = labels.length - 1; j >= 0; j--) {
			tag_list.add(labels[j]);
		}
	}
	return Array.from(tag_list);
};

//Get list of people. from Alchemy entities response
var get_people_list = module.exports.get_people_list = function(alchemy_entities) {
	var people_list = [];
	for (var i = alchemy_entities.length - 1; i >= 0; i--) {
		if (alchemy_entities[i].type=="Person") {
			var name = alchemy_entities[i].text;
			if (alchemy_entities[i].disambiguated) {
				if (alchemy_entities[i].disambiguated.name) {
					name = alchemy_entities[i].disambiguated.name;
				}
				people_list.push({
					name:name,
					details:alchemy_entities[i].disambiguated
				});
			} else {
				people_list.push({
					name:name
				});
			}
		}
	}
	return people_list;
};

var format_update_expression = module.exports.format_update_expression = function(update_expression) {
	var formatted = '';

	//Add ADD expressions
	update_expression.add = Array.from(update_expression.add)
	if (update_expression.add.length > 0 ) {
		formatted += 'ADD';
		for (var i = update_expression.add.length - 1; i >= 0; i--) {
			formatted += ' ' + update_expression.add[i].slice(1) + ' ' + update_expression.add[i] + ',';
		}	
		//Remove trailing comma.	
		formatted = formatted.slice(0,-1);
	}

	update_expression.set = Array.from(update_expression.set)
	if (update_expression.set.length > 0 || update_expression.list_append.length > 0) {
		//Add SET expressions
		formatted += ' SET';
		for (var j = update_expression.set.length - 1; j >= 0; j--) {
			formatted += ' ' + update_expression.set[j].slice(1) + '=if_not_exists(' + 
			update_expression.set[j].slice(1) + ', ' + update_expression.set[j] + '),';
		}
		//Add list_append expressions
		for (var k = update_expression.list_append.length - 1; k >= 0; k--) {
			formatted += ' ' + update_expression.list_append[k].slice(1) + '=if_not_exists(' + 
			update_expression.list_append[k].slice(1) + ', ' + update_expression.list_append[k] + '), ' +
			update_expression.list_append[k].slice(1) + '=list_append(' + update_expression.list_append[k] + ', ' +
			update_expression.list_append[k].slice(1) + '),';
		}		
		//Remove trailing comma
		formatted = formatted.slice(0,-1);
	}

	return formatted;
};