(function() {
  
  kexprdio.chartLoader = {

    init: function() {
      //nothing anymroe... change that soon to load initial info
    },

    // local utility loading behaviors
    //
    //-----
    _loadFromStorage: function(chartToLoad) { // Ready to remove argument
      var self = this;
      // The function below determines the filename to ask for based on the chosen buttons
      //var _chartToLoad = kexprdio.chooser.chartToLoad();
      //  console.log('Current Choice: ' + _chartToLoad + '.json');
      var _newChart = {
        title: '',
        chart: []
      };
      
      // Don't forget to remove this

      $.getJSON('charts/' + chartToLoad + '.json', function(data) {
        $('.range').not('#all').remove();
        $.each(data.chart, function(key, val) {
          var $dr = $('<div />', {
            'class': 'range',
            'style':'display:none;',
            html: val.daterange
            }).appendTo('.monthbar');
          _newChart.chart.push(
              '<li class="chart-header">' + val.daterange + '</li>'
              );
          $.each(val.albums, function (key2, val2) {
            var rdioQuery = val2. artist + ' ' + val2.album + ' ';// + val2.label;
            var _displayName = val2.album + " - " + val2.artist;

            // Build out the chart html as a string for the push
            _newChart.chart.push(
              '<li class="chartitem" data-rdioquery="' + rdioQuery + '">'
              + '<div class="songname">'+ val2.rank + '. ' + _displayName + '</div>'
              + '<img class="albumart" src="img/failicon.png"/>'
              + '<div class="songinfo">This is where artist biography and related artists will go.<p>May remind you of\:  Related Artist, Other Artist, No-name Band</p><p>Similar artists not in your collection\:  Related Artist, Other Artist, No-name Band</p></div>'
              + '<div class="playlistoptions">'
                + '<div class="playlistoption">Queue Album</div>'
                + '<div class="playlistoption">Your Playlists</div>'
                + '<div class="playlistoption">Share Song</div>'
                + '<div class="playlistoption">Show Stats</div>'
                //+ '<div class="playlistsview" style="visibility: hidden"><div class="userplaylist">Playlist</div><div class="userplaylist">Playlist</div><div class="userplaylist">Playlist</div></div>'
              + '</div>'
              + '</li>'
            );
          });
        });

        $('.range').not('#all').each(function(i, v) {
          $(v).bind('click', function() {
            kexprdio.chooser.toggleChosen(this, this.parentElement);
          });
        });

        self._attach(_newChart);
      });
    },
    //-----
    _clearcharts: function() {
      $('.chart').remove();
      $('.chart-header').remove();
    },
    //-----
    _attach: function(chartToAttach) {
      var $ul = $('<ul/>', 
        {'class': 'chart',
          html: chartToAttach.chart.join('')
        }
       ).appendTo('.chartdisplay');
      
      kexprdio.playlister.addPlaylistOptions();



      // Call for the artwork now, when it arrives it will find the song it belongs to
      // R.ready(function() {
      //   $ul.find('li').each(function(i, v) {
      //     var $li = $(v);
      //     var rdioQuery = $li.data('rdioquery');
      //     R.request({
      //       method: 'search',
      //       content: {query: rdioQuery, types: 'Track'},
      //       success: function(response) {
      //         var trackImageUrl = response.result.results[0].icon;
      //         $li.find('img').attr('src', trackImageUrl);
      //       },
      //       error: function() {
      //         // Needs to load placeholder album art for "Track not available on Rdio"
      //         $li.find('img').attr('src', 'img/failicon.png');
      //         console.log('R.request failed for search term:' + rdioQuery);
      //       }
      //     });
      //   });
      // });
    },
    
    // available commands
    //
    //+++++++++
    //+++++++++    
    appendTocharts: function() {
      var chartName = 'top100rap'; // Temporarily assigned to one of the test charts
      this._loadFromStorage(chartName);
    },
    //+++++++++
    replacecharts: function() {
      var chartName = 'streetsounds_092112'; // Temporarily assigned to one of the test charts
      this._clearcharts();
      this._loadFromStorage(chartName);
    },
    //++++++++++
    loadingtest: function() {
      this._clearcharts();
      this._loadFromStorage('el2012')
    }
  };

})();
