'use strict';

google.load("visualization", "1");
google.setOnLoadCallback(function() {
	console.log('Google');
	var baseUrl = 'https://docs.google.com/spreadsheet/pub';
	// var key = '0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc';
	// var seetIds = [0];

	var getGSData = function(key, gid) {
		var dfd = $.Deferred();
		dfd.pipe(
			function() {
				console.log('1');
				return requestData(baseUrl, key, gid);
				// return requestData(baseUrl, key, seetIds);
			}
		)
		.then(
			function(data) {
				console.log('2');
				// var fixedData = fixed(data, seetId);
				var retData = {
					key: key,
					gid: gid,
					data: data
					// data: fixed(data, seetId)
				}
				console.log(retData);
				console.log('終了');
				// window.gsData = fixedData;
				$(window).trigger('onCompleteRequestData', [retData]);
			}
		);
		dfd.resolve();


		// function requestData(baseUrl, key, seetIds) {
		function requestData(baseUrl, key, gid) {
			console.log('1 - a');
			var dfd = $.Deferred();
			var retObj = {};
			var count = 0;
			function request(gid, ms) {
				var url = baseUrl + '?key=' + key + '&gid=' + gid + '&pub=1' + '&ms=' + ms;
				var query = new google.visualization.Query(url);
				query.send(handleResponse);
				function handleResponse(response)
				{
					retObj["gid" + gid] = response.getDataTable();
					// if (++count === seetIds.length) {
					// 	dfd.resolve(retObj);
					// }
					dfd.resolve(retObj);
				}
			}
			// for (var i=0,len=seetIds.length; i<len; i++) {
			// 	request(seetIds[i], new Date().getUTCMilliseconds());
			// }
			request(gid, new Date().getUTCMilliseconds());
			return dfd.promise();
		}

		/*
		function fixed(data, seetId) {
			console.log('2 - a');
			var dfd = $.Deferred();
			var row = 0;
			// var $elem = $('#gs-data');
			// var dateData = data["seet0"];
			var dateData = data["seet" + seetId];
			var maxRow = dateData.getNumberOfRows();;
			var retArr = [];
			for (row = 0; row < maxRow; row++) {
				var tmpArr = [dateData.getValue(row, 0), dateData.getValue(row, 1)];
				// if (dateData.getValue(row, 2) !== '') {
				// 	tmpArr.push(dateData.getValue(row, 2));
				// }
				retArr.push(tmpArr);
			}
			return retArr;
		}
		*/
	}
	window.getGSData = getGSData;
});
