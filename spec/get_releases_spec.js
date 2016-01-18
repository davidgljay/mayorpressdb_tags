var get_releases = require('../get_releases');

describe ("Getting releases", function() {
	describe("scan params", function() {
		it ("should call dynamodb with proper scan params", function() {
			var expected = {
				TableName: process.env.RELEASE_TABLE,
				ConsistentRead: true,
				FilterExpression: 'attribute_not_exists (taxonomy)',
				Limit: 123,
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
			expect(get_releases.scan_params(123)).toEqual(expected);
		});
	});

	describe("dedynoify", function() {
		it("should dedynoify an item from dynamodb, assuming the result has only S types",function() {
			var dynoed = {
				Items: [
					{
						stuff:{S:'Stuff'},
						things:{S:'Things'}
					},
					{
						morestuff:{S:'Morestuff'},
						morethings:{S:'Morethings'}
					}
				]
			};
			var expected = [
				{
					stuff:'Stuff',
					things:'Things'
				},
				{
					morestuff:'Morestuff',
					morethings:'Morethings'
				}
			];
			var dedynoed = get_releases.dedynoify(dynoed);
			for (var i = dedynoed.length - 1; i >= 0; i--) {
				expect(dedynoed[i]).toEqual(expected[i]);
			}
		});
	});
});