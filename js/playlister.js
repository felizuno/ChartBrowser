(function() {

	kexprdio.playlister = {
		userPlaylists: [],
		playlistButtons: '',

		init: function () {
			//get the users playlists so they are ready by the time we load a list
			R.ready(function() {
				R.request({
					method:"getUserPlaylists",
					content:{
						user: R.currentUser.get("key")
					},
					success: function(data) {
						$(data.result).each(function(i, v) {
							// this is an array of your owned playlists
							kexprdio.playlister.userPlaylists.push(v);
						});
					}
				});

				kexprdio.playlister._unpackPlaylists();
			    kexprdio.chooser.init();
			});
		},

		_unpackPlaylists: function() {
			var self = this;

			$.each(self.userPlaylists, function(v, i) {
				var string = 
					'<div class="playlistbutton">'
					+ v.name
					+ '</div>';
				self.playlistButtons += string;
			});
		},

		addPlaylistOptions: function() {
		    $('.chartitemoptions').each(function(i, v) {
		        var $albumAction = $('<div />', {
		          'class': 'chartoption',
		          'style':'display:none;',
		          html: 'Add to selected playlist(s)'
		        }).appendTo(v);

		        var $albumAction2 = $('<div />', {
		          'class': 'chartoption',
		          'style':'display:none;',
		          html: 'Use album to start new playlist'
		        }).appendTo(v);

		    });

			$('.playlists').bind('click', function() {
				kexprdio.playlister.showPlaylistOptions(this);
			});
		},

		addPlaylistViews: function(chartItem) {
		    $('.playlistview').each(function(i, v) {
		    	var self = this;
		    	$.each(kexprdio.playlister.userPlaylists, function(i2, v2) {
		    		//console.log()
			        var $userPlaylists = $('<div />', {
			          'class': 'userplaylist chartoption',
			          html: v2.name
			        }).appendTo(self);
			    });
		    });

			$('.userplaylist').bind('click', function() {
				//multiselect
			});
		},		

		showPlaylistOptions: function(button) {
			var $chartItem = $(button).parent().parent();
			$($chartItem.find('.playlistview')).add($chartItem.find('.biobox')).slideToggle();
			$(button).siblings().toggle();
		},

		addSelectionToPlaylist: function(choices) {
			R.request({
			    method: "addToPlaylist",
			    content: {
			      playlist: 'playlistKey', 
			      tracks: 'Keys, separated by commas', 
			    },
			    success: function(response) {

			    },
			    error: function(response) {
			      console.log("error");
			    }
			});
		}

	};

})();
