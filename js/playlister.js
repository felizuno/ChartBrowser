(function() {

	kexprdio.playlister ={

		init: function () {
			//get the users playlists so they are ready by the time we load a list
		},

		addPlaylistOptions: function() {
		    $('.playlistoption').each(function(i, v) {
		        var $dr = $('<div />', {
		          'class': 'albumoption',
		          'style':'display:none;',
		          html: 'User Action'
		        }).appendTo(v);
		    });			
			
			$('.playlistoption').each(function(i, v) {
				$(v).bind('click', function() {
					$('.albumoption', v).slideDown();
				});
			});
		},

		showPlaylistOptions: function() {
		}

		// R.request({
		// 	method:"getPlaylists",
		// 	content:{
		// 		user: R.currentUser.get("key")
		// 	}
		// 	success: function() {
		// 		var something = result.owned;
		// 		// this is an array of your owned playlists
		// 	}
		// });
	};

})();
