(function() {

	kexprdio.playlister ={
		R.request({
			method:"getPlaylists",
			content:{
				user: R.currentUser.get("key")
			}
			success: function() {
				var something = result.owned;
				// this is an array of your owned playlists
			}
		});
	};

}();
