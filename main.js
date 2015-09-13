var app = new angular.module("utubeApp", ["firebase"]);

app.controller("mainCtrl", function($scope, $firebaseArray) {
  	var ref = new Firebase("https://utubeplayer.firebaseio.com/vidList");

    var vidSync = $firebaseArray(ref);

    $scope.links = vidSync;

    $scope.watchVideo = function(videoUrl) {
    	var url = videoUrl;
		var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
		if(videoid != null) {
		   alert(videoid[1]);
		   player.loadVideoById(videoid[1], 0, "medium");
		} else { 
		    alert("The youtube url is not valid!");
		}
    };
});