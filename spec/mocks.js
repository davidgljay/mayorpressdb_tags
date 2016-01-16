var alchemy_tags = module.exports.alchemy_tags = [
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
];

var alchemy_entities = module.exports.alchemy_entities = [
{
	"type":"Person",
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
	},
	{
		"type":"Monster",
		"text":"Sockmonster"
	},
	{
		"type":"Person",
		"text":"Angelica Schyler",
		"disambiguated": {
			"subtype": [
				"Badass",
				"Diva"
			]
		}
	},
	{
		"type":"Person",
		"text":"Bruce"
	}
];

var article = module.exports.article = {
	title:'All about that Ace',
	date:new Date('1/1/2016').toISOString(),
	url:'http://www.asexuality.org/stuff/and/things',
	city:'New York'
};

module.exports.tagged_article = {
	taxonomy:alchemy_tags,
	entities:alchemy_entities,
	article_info:article
};

module.exports.formatted_tags = [{
    table: process.env.TAGS_DB,
    key: {
        tag: {
            S: 'airlines'
        }
    },
    values: {':tag_count': {
            N: 1
        },
        ':dates': {
            NN: ['2016-01-01T05:00:00.000Z']
        },
        ':articles': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':city_nameNewYork': {
            S: 'New York'
        },
        ':city_articlesNewYork': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAnniseParker': {
            S: 'Annise Parker'
        },
        ':person_articlesAnniseParker': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAngelicaSchyler': {
            S: 'Angelica Schyler'
        },
        ':person_articlesAngelicaSchyler': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameBruce': {
            S: 'Bruce'
        },
        ':person_articlesBruce': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_travel': {
            S: '_New York_travel'
        },
        ':tag_articles_New York_travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_transports': {
            S: '_New York_transports'
        },
        ':tag_articles_New York_transports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_air travel': {
            S: '_New York_air travel'
        },
        ':tag_articles_New York_air travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airports': {
            S: '_New York_airports'
        },
        ':tag_articles_New York_airports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        }
    },
    update_expression: 'ADD tag_count :tag_count, dates :dates SET tag_name_New York_airports=if_not_exists(tag_name_New York_airports, :tag_name_New York_airports), tag_name_New York_air travel=if_not_exists(tag_name_New York_air travel, :tag_name_New York_air travel), tag_name_New York_transports=if_not_exists(tag_name_New York_transports, :tag_name_New York_transports), tag_name_New York_travel=if_not_exists(tag_name_New York_travel, :tag_name_New York_travel), person_nameBruce=if_not_exists(person_nameBruce, :person_nameBruce), person_nameAngelicaSchyler=if_not_exists(person_nameAngelicaSchyler, :person_nameAngelicaSchyler), person_nameAnniseParker=if_not_exists(person_nameAnniseParker, :person_nameAnniseParker), city_nameNewYork=if_not_exists(city_nameNewYork, :city_nameNewYork), tag_articles_New York_airports=list_append(tag_articles_New York_airports, :tag_articles_New York_airports), tag_articles_New York_air travel=list_append(tag_articles_New York_air travel, :tag_articles_New York_air travel), tag_articles_New York_transports=list_append(tag_articles_New York_transports, :tag_articles_New York_transports), tag_articles_New York_travel=list_append(tag_articles_New York_travel, :tag_articles_New York_travel), person_articlesBruce=list_append(person_articlesBruce, :person_articlesBruce), person_articlesAngelicaSchyler=list_append(person_articlesAngelicaSchyler, :person_articlesAngelicaSchyler), person_articlesAnniseParker=list_append(person_articlesAnniseParker, :person_articlesAnniseParker), city_artcilesNewYork=list_append(city_artcilesNewYork, :city_artcilesNewYork), articles=list_append(articles, :articles)'
}, {
    table: undefined,
    key: {
        tag: {
            S: 'travel'
        }
    },
    values: {':tag_count': {
            N: 1
        },
        ':dates': {
            NN: ['2016-01-01T05:00:00.000Z']
        },
        ':articles': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':city_nameNewYork': {
            S: 'New York'
        },
        ':city_articlesNewYork': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAnniseParker': {
            S: 'Annise Parker'
        },
        ':person_articlesAnniseParker': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAngelicaSchyler': {
            S: 'Angelica Schyler'
        },
        ':person_articlesAngelicaSchyler': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameBruce': {
            S: 'Bruce'
        },
        ':person_articlesBruce': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airlines': {
            S: '_New York_airlines'
        },
        ':tag_articles_New York_airlines': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_transports': {
            S: '_New York_transports'
        },
        ':tag_articles_New York_transports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_air travel': {
            S: '_New York_air travel'
        },
        ':tag_articles_New York_air travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airports': {
            S: '_New York_airports'
        },
        ':tag_articles_New York_airports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        }
    },
    update_expression: 'ADD tag_count :tag_count, dates :dates SET tag_name_New York_airports=if_not_exists(tag_name_New York_airports, :tag_name_New York_airports), tag_name_New York_air travel=if_not_exists(tag_name_New York_air travel, :tag_name_New York_air travel), tag_name_New York_transports=if_not_exists(tag_name_New York_transports, :tag_name_New York_transports), tag_name_New York_airlines=if_not_exists(tag_name_New York_airlines, :tag_name_New York_airlines), person_nameBruce=if_not_exists(person_nameBruce, :person_nameBruce), person_nameAngelicaSchyler=if_not_exists(person_nameAngelicaSchyler, :person_nameAngelicaSchyler), person_nameAnniseParker=if_not_exists(person_nameAnniseParker, :person_nameAnniseParker), city_nameNewYork=if_not_exists(city_nameNewYork, :city_nameNewYork), tag_articles_New York_airports=list_append(tag_articles_New York_airports, :tag_articles_New York_airports), tag_articles_New York_air travel=list_append(tag_articles_New York_air travel, :tag_articles_New York_air travel), tag_articles_New York_transports=list_append(tag_articles_New York_transports, :tag_articles_New York_transports), tag_articles_New York_airlines=list_append(tag_articles_New York_airlines, :tag_articles_New York_airlines), person_articlesBruce=list_append(person_articlesBruce, :person_articlesBruce), person_articlesAngelicaSchyler=list_append(person_articlesAngelicaSchyler, :person_articlesAngelicaSchyler), person_articlesAnniseParker=list_append(person_articlesAnniseParker, :person_articlesAnniseParker), city_artcilesNewYork=list_append(city_artcilesNewYork, :city_artcilesNewYork), articles=list_append(articles, :articles)'
}, {
    table: undefined,
    key: {
        tag: {
            S: 'transports'
        }
    },
    values: {':tag_count': {
            N: 1
        },
        ':dates': {
            NN: ['2016-01-01T05:00:00.000Z']
        },
        ':articles': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':city_nameNewYork': {
            S: 'New York'
        },
        ':city_articlesNewYork': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAnniseParker': {
            S: 'Annise Parker'
        },
        ':person_articlesAnniseParker': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAngelicaSchyler': {
            S: 'Angelica Schyler'
        },
        ':person_articlesAngelicaSchyler': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameBruce': {
            S: 'Bruce'
        },
        ':person_articlesBruce': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airlines': {
            S: '_New York_airlines'
        },
        ':tag_articles_New York_airlines': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_travel': {
            S: '_New York_travel'
        },
        ':tag_articles_New York_travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_air travel': {
            S: '_New York_air travel'
        },
        ':tag_articles_New York_air travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airports': {
            S: '_New York_airports'
        },
        ':tag_articles_New York_airports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        }
    },
    update_expression: 'ADD tag_count :tag_count, dates :dates SET tag_name_New York_airports=if_not_exists(tag_name_New York_airports, :tag_name_New York_airports), tag_name_New York_air travel=if_not_exists(tag_name_New York_air travel, :tag_name_New York_air travel), tag_name_New York_travel=if_not_exists(tag_name_New York_travel, :tag_name_New York_travel), tag_name_New York_airlines=if_not_exists(tag_name_New York_airlines, :tag_name_New York_airlines), person_nameBruce=if_not_exists(person_nameBruce, :person_nameBruce), person_nameAngelicaSchyler=if_not_exists(person_nameAngelicaSchyler, :person_nameAngelicaSchyler), person_nameAnniseParker=if_not_exists(person_nameAnniseParker, :person_nameAnniseParker), city_nameNewYork=if_not_exists(city_nameNewYork, :city_nameNewYork), tag_articles_New York_airports=list_append(tag_articles_New York_airports, :tag_articles_New York_airports), tag_articles_New York_air travel=list_append(tag_articles_New York_air travel, :tag_articles_New York_air travel), tag_articles_New York_travel=list_append(tag_articles_New York_travel, :tag_articles_New York_travel), tag_articles_New York_airlines=list_append(tag_articles_New York_airlines, :tag_articles_New York_airlines), person_articlesBruce=list_append(person_articlesBruce, :person_articlesBruce), person_articlesAngelicaSchyler=list_append(person_articlesAngelicaSchyler, :person_articlesAngelicaSchyler), person_articlesAnniseParker=list_append(person_articlesAnniseParker, :person_articlesAnniseParker), city_artcilesNewYork=list_append(city_artcilesNewYork, :city_artcilesNewYork), articles=list_append(articles, :articles)'
}, {
    table: process.env.TAGS_DB,
    key: {
        tag: {
            S: 'air travel'
        }
    },
    values: {':tag_count': {
            N: 1
        },
        ':dates': {
            NN: ['2016-01-01T05:00:00.000Z']
        },
        ':articles': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':city_nameNewYork': {
            S: 'New York'
        },
        ':city_articlesNewYork': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAnniseParker': {
            S: 'Annise Parker'
        },
        ':person_articlesAnniseParker': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAngelicaSchyler': {
            S: 'Angelica Schyler'
        },
        ':person_articlesAngelicaSchyler': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameBruce': {
            S: 'Bruce'
        },
        ':person_articlesBruce': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airlines': {
            S: '_New York_airlines'
        },
        ':tag_articles_New York_airlines': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_travel': {
            S: '_New York_travel'
        },
        ':tag_articles_New York_travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_transports': {
            S: '_New York_transports'
        },
        ':tag_articles_New York_transports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airports': {
            S: '_New York_airports'
        },
        ':tag_articles_New York_airports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        }
    },
    update_expression: 'ADD tag_count :tag_count, dates :dates SET tag_name_New York_airports=if_not_exists(tag_name_New York_airports, :tag_name_New York_airports), tag_name_New York_transports=if_not_exists(tag_name_New York_transports, :tag_name_New York_transports), tag_name_New York_travel=if_not_exists(tag_name_New York_travel, :tag_name_New York_travel), tag_name_New York_airlines=if_not_exists(tag_name_New York_airlines, :tag_name_New York_airlines), person_nameBruce=if_not_exists(person_nameBruce, :person_nameBruce), person_nameAngelicaSchyler=if_not_exists(person_nameAngelicaSchyler, :person_nameAngelicaSchyler), person_nameAnniseParker=if_not_exists(person_nameAnniseParker, :person_nameAnniseParker), city_nameNewYork=if_not_exists(city_nameNewYork, :city_nameNewYork), tag_articles_New York_airports=list_append(tag_articles_New York_airports, :tag_articles_New York_airports), tag_articles_New York_transports=list_append(tag_articles_New York_transports, :tag_articles_New York_transports), tag_articles_New York_travel=list_append(tag_articles_New York_travel, :tag_articles_New York_travel), tag_articles_New York_airlines=list_append(tag_articles_New York_airlines, :tag_articles_New York_airlines), person_articlesBruce=list_append(person_articlesBruce, :person_articlesBruce), person_articlesAngelicaSchyler=list_append(person_articlesAngelicaSchyler, :person_articlesAngelicaSchyler), person_articlesAnniseParker=list_append(person_articlesAnniseParker, :person_articlesAnniseParker), city_artcilesNewYork=list_append(city_artcilesNewYork, :city_artcilesNewYork), articles=list_append(articles, :articles)'
}, {
    table: process.env.TAGS_DB,
    key: {
        tag: {
            S: 'airports'
        }
    },
    values: {':tag_count': {
            N: 1
        },
        ':dates': {
            NN: ['2016-01-01T05:00:00.000Z']
        },
        ':articles': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':city_nameNewYork': {
            S: 'New York'
        },
        ':city_articlesNewYork': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAnniseParker': {
            S: 'Annise Parker'
        },
        ':person_articlesAnniseParker': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameAngelicaSchyler': {
            S: 'Angelica Schyler'
        },
        ':person_articlesAngelicaSchyler': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':person_nameBruce': {
            S: 'Bruce'
        },
        ':person_articlesBruce': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_airlines': {
            S: '_New York_airlines'
        },
        ':tag_articles_New York_airlines': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_travel': {
            S: '_New York_travel'
        },
        ':tag_articles_New York_travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_transports': {
            S: '_New York_transports'
        },
        ':tag_articles_New York_transports': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        },
        ':tag_name_New York_air travel': {
            S: '_New York_air travel'
        },
        ':tag_articles_New York_air travel': {
            L: [{
                title: 'All about that Ace',
                date: '2016-01-01T05:00:00.000Z',
                url: 'http://www.asexuality.org/stuff/and/things',
                city: 'New York'
            }]
        }
    },
    update_expression: 'ADD tag_count :tag_count, dates :dates SET tag_name_New York_air travel=if_not_exists(tag_name_New York_air travel, :tag_name_New York_air travel), tag_name_New York_transports=if_not_exists(tag_name_New York_transports, :tag_name_New York_transports), tag_name_New York_travel=if_not_exists(tag_name_New York_travel, :tag_name_New York_travel), tag_name_New York_airlines=if_not_exists(tag_name_New York_airlines, :tag_name_New York_airlines), person_nameBruce=if_not_exists(person_nameBruce, :person_nameBruce), person_nameAngelicaSchyler=if_not_exists(person_nameAngelicaSchyler, :person_nameAngelicaSchyler), person_nameAnniseParker=if_not_exists(person_nameAnniseParker, :person_nameAnniseParker), city_nameNewYork=if_not_exists(city_nameNewYork, :city_nameNewYork), tag_articles_New York_air travel=list_append(tag_articles_New York_air travel, :tag_articles_New York_air travel), tag_articles_New York_transports=list_append(tag_articles_New York_transports, :tag_articles_New York_transports), tag_articles_New York_travel=list_append(tag_articles_New York_travel, :tag_articles_New York_travel), tag_articles_New York_airlines=list_append(tag_articles_New York_airlines, :tag_articles_New York_airlines), person_articlesBruce=list_append(person_articlesBruce, :person_articlesBruce), person_articlesAngelicaSchyler=list_append(person_articlesAngelicaSchyler, :person_articlesAngelicaSchyler), person_articlesAnniseParker=list_append(person_articlesAnniseParker, :person_articlesAnniseParker), city_artcilesNewYork=list_append(city_artcilesNewYork, :city_artcilesNewYork), articles=list_append(articles, :articles)'
}]