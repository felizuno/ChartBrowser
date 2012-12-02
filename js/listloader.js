(function() {
  
  kexprdio.listLoader = {
    // Rife with self/this issues. Using the blunt "kexprdio.listloader.foo" for the sake of testing 
    currentList: [], // Arrays right now but need to be objects with a name and an array
    nextList: [], // I think it's possible to do all of this without nextList, but I am using it to help with _loadFromStorage


    init: function() {
      // TEMPORARY: loads test JSON immediately. 
      // setTimeout used because it appends an empty <ul> otherwise. :-( 
      this._loadFromStorage('test');
      setTimeout('kexprdio.listLoader._attach(kexprdio.listLoader.currentList)', 300);
    },

    // local utility loading behaviors
    //
    //-----
    _loadFromStorage: function(listToLoad) {
      //
      kexprdio.listLoader.nextList = [];
      $.getJSON('lists/' + listToLoad + '.json', function(data) {
    
        $.each(data.songs, function(key, val) {
          var track =  val.artist + " - " + val.song + " - From: " + val.album; 
          kexprdio.listLoader.nextList.push('<li id="' + key + '" class="song">' + track + '</li>');
        });
        console.log('Just loaded new nextList:' + kexprdio.listLoader.nextList);
      });

      kexprdio.listLoader.currentList = kexprdio.listLoader.nextList.slice();
    },
    //-----
    _clearLists: function() {
      $('.tracklist').remove();
    },
    //-----
    //this should already work
    _attach: function(listToAttach) {
      $('<ul/>', {
      'class': 'tracklist',
      html: listToAttach.join('')
      }).appendTo('.right');

      // this doesn't work, idk why...
      $('.tracklist ul:last-child').addClass('last');
    },
    // available commands
    //
    //+++++++++
    clearLists: function() {
      this._clearLists();
    },
    //+++++++++    
    appendToLists: function() {
      var listName = 'top100rap'; // Temporarily assigned to one of the test lists
      this._loadFromStorage(listName);
      setTimeout('kexprdio.listLoader._attach(kexprdio.listLoader.currentList)', 300);
//      this._attach(listName); // Want to be doing this instead of the setTimeout
    },
    //+++++++++
    replaceLists: function() {
      var listName = 'streetsounds_092112'; // Temporarily assigned to one of the test lists
      this._loadFromStorage(listName);
      
      if (this.nextList[0]) {
        // Want these to be listloader's master variables. this/self cleans this up but IDK how to apply it yet.
        kexprdio.listLoader.currentList = kexprdio.listLoader.nextList.slice(); 
        kexprdio.listLoader.nextList = [];
      }

      this._clearLists();
      this._attach(kexprdio.listLoader.currentList);
    }

  };

})();
