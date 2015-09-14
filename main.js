var app = new angular.module("utubeApp", ["firebase"]);

var newVidName = $("#newVidName");
var newVidLink = $("#newVidLink");
var editDiv = $("#editDiv");

app.controller("mainCtrl", function($scope, $firebaseArray) {
    var ref = new Firebase("https://utubeplayer.firebaseio.com/vidList");

    var vidSync = $firebaseArray(ref);

    $scope.links = vidSync;

    $scope.getVideoYoutubeId = function(videoUrl){
        var url = videoUrl;
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
    		return videoid[1];
        }
    }

    $scope.watchVideo = function(videoUrl) {
        player.loadVideoById($scope.getVideoYoutubeId(videoUrl), 0, "medium");
    };

    $scope.submitVideoInfo = function(e) {
        if (e.keyCode == 13) {
            $scope.pushNewVideo();
        }
    }

    $scope.pushNewVideo = function() {
        var name = newVidName.val();
        var link = newVidLink.val();

        $scope.links.$add({
            name: name,
            link: link
        });

        newVidName.val('');
        newVidLink.val('');
    }

    $scope.deleteMe = function(video) {
        if (confirm("Are you sure you want to delete this video?")) {
            $scope.links.$remove(video);
        }
    }

    $scope.openEditor = function(video) {
        editDiv.toggle("fast");
        $scope.editedVideoId = video.$id;
        $scope.editedVideoName = video.name;
        $scope.editedVideoLink = video.link;
    }

    $scope.autoEditMe = function(e){
        if (e.keyCode == 13) {
            $scope.editMe();
        }
    }

    $scope.editMe = function() {
    	var editRef = new Firebase("https://utubeplayer.firebaseio.com/vidList/"+$scope.editedVideoId);
		editRef.child("name").set($scope.editedVideoName);
		editRef.child("link").set($scope.editedVideoLink);
        $('#editDiv').toggle('fast');
    }
});