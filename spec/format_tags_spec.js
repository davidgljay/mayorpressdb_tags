var format_tags = require('../format_tags'),
mocks = require('./mocks');

describe ("Format tags", function() {
	describe("main function", function() {
		it ("should format the article correctly", function() {
			expect(format_tags(mocks.tagged_article)).toEqual(mocks.formatted_tags);
		});
	});

	describe("get_tag_list", function() {
		it ("should extract tag list from aclhemy's response", function() {
			var expected_tag_list = ['travel', 'transports', 'air travel', 'airports', 'airlines'];
			expect(format_tags.get_tag_list(mocks.alchemy_tags).sort()).toEqual(expected_tag_list.sort());			
		});
  	});

  	describe("get_people_list", function() {

  	 	it("should return a list of people in the proper format", function() {
	  		var expected = [
	  			{
	  				name:"Bruce"
	  			},
	  			{
	  				name: "Angelica Schyler",
	  				details: {
	  					"subtype": [
	  						"Badass",
	  						"Diva"
	  					]
	  				}
	  			},
	  			{
	  				name:"Annise Parker",
	  				details: {
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
	  			}
	  		];
	  		expect(format_tags.get_people_list(mocks.alchemy_entities).sort()).toEqual(expected.sort());
	  	});
  	});

	describe("format_update_expression", function() {
		it("should properly format the update expression", function() {
			var inputs = {
				add:[':stuff', ':things'],
				set:[':morestuff', ':morethings'],
				list_append:[':appendme']
			};
			var output = 'ADD things :things, stuff :stuff SET morethings=if_not_exists(morethings, :morethings), morestuff=if_not_exists(morestuff, :morestuff), appendme=list_append(appendme, :appendme)';
			expect(format_tags.format_update_expression(inputs)).toEqual(output);
		});
	});
});