// public/core.js
var lbsPoints = angular.module('lbsPoints', []);


function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/points')
		.success(function(data) {
			$scope.pointss = data;
			console.log(data);

		
 		var zoom = 14;
		var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
		var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
		map = new OpenLayers.Map("Map");
    	var mapnik         = new OpenLayers.Layer.OSM();
    	map.addLayer(mapnik);
 
  		var position       = new OpenLayers.LonLat(-43.9300, -19.9300).transform( fromProjection, toProjection);
    	
    	map.setCenter(position, zoom);
		})


		.error(function(data) {
			console.log('Error: ' + data);
		});



	$scope.getPoint = function() {
		$http.get('/api/points/'+$scope.formData.text, $scope.formData)
			.success(function(data) {
				$scope.pointss = data;
				
				console.log(data);
				console.log($scope.formData.text);
				var zoom           = 14;
				var markers 	   = new OpenLayers.Layer.Markers( "Markers" );
				var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
				var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to S


    			map.addLayer(markers);

 
    			for (i=0 ;i< data.length ; i++){
    				var position       = new OpenLayers.LonLat(data[i].lon, data[i].lat).transform( fromProjection, toProjection);
    				markers.addMarker(new OpenLayers.Marker(position));
    				console.log('plotado');
    			}
 
    			map.setCenter(position, zoom);

			})
				.error(function(data) {
					console.log('Error: ' + data);
			});
	};
	


	
	
	/*
	// when submitting the add form, send the text to the node API
	$scope.createPoint = function() {
		$http.post('/api/points', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.pointss = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};*/

	// delete a todo after checking it
	$scope.deletePoint = function(id) {
		$http.delete('/api/points/' + id)
			.success(function(data) {
				$scope.pointss = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}


/*

<script>

    	var lat            = -19.9300;
		var lon            = -43.9400;
        var zoom           = 14;
 
		var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
		var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    	var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);
 
		map = new OpenLayers.Map("Map");
    	var mapnik         = new OpenLayers.Layer.OSM();
    	map.addLayer(mapnik);
 
  		var markers = new OpenLayers.Layer.Markers( "Markers" );
    	map.addLayer(markers);
    	markers.addMarker(new OpenLayers.Marker(position));
 
    	map.setCenter(position, zoom);
	
	</script> 

*/






