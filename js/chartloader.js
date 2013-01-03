(function() {
  
  kexprdio.chartLoader = {
    fullCurrentChart: {
      title: '',
      charts: []
    },

    //-----
    //
    // local utility loading behaviors
    //
    //-----
    _loadFromStorage: function(chartToLoad) {
      var self = this;
      var _newChart = chartToLoad;

      $.getJSON('charts/' + _newChart.fileId + '.json', function(data) {
        $('.range').remove();
        self.fullCurrentChart.title = _newChart.displayName;

        $.each(data.chart, function(key, val) {
          var index = key; 
          var $dr = $('<div />', {
            'class': 'range',
            'style':'display:none;',
            html: val.daterange
            }).appendTo('.monthbar');
          
          _newChart.charts.push({
              header: {
                title: val.daterange,
                html: '<li class="chart-header">' + val.daterange + '</li>'
              },
              chart: []
          });

          $.each(val.albums, function (key2, val2) {
            var rdioQuery = val2. artist + ' ' + val2.album + ' ';// + val2.label;
            var lfmArtist = val2.artist;
            var _displayName = val2.album + " - " + val2.artist;
            _newChart.charts[index].chart.push(
              '<li class="chartitem" data-rdioquery="' + rdioQuery + '" data-artist="' + lfmArtist + '">'
              + '<div class="songname">'+ val2.rank + '. ' + _displayName + '</div>'
              + '<img class="albumart" src=""/>'
              + '<div class="albuminfo">'
                + '<div class="biobox"><div class="bioshort shown"></div>'
                + '<div class="biolong" style="display: none;"></div></div>'
                + '<div class="playlistview"  style="display: none;"></div>'
              + '</div>'
              + '<div class="chartitemoptions">'
                + '<div class="chartoption playlists">Playlist Options</div>'
                + '<div class="chartoption tracklist">Show Tracklist</div>'
                + '<div class="chartoption stats"><div class="statsicon"></div>Show Stats</div></div>'
              + '</li>'
            );
          });
        });

        self.fullCurrentChart = _newChart;
        self._attach(0);
        kexprdio.chooser.activateRangeOptions();
        $('.monthbar').children(':eq(0)').addClass('chosen').show();
      });
    },

    //-----
    _attach: function(index) {
      var chartToAttach = {
        header: '',
        chart: ''
      };

      if ($.type(index) == 'string') {
        console.log(this.fullCurrentChart);
        $.each(this.fullCurrentChart.charts, function(k, v) {
            if (v.header.title == index) {
                chartToAttach.chart = v.chart.join('');
                chartToAttach.header = v.header.html;
                return;
            }
        });
      } else {
        var _masterChart = this.fullCurrentChart.charts[index];
        chartToAttach.chart = _masterChart.chart.join('');
        chartToAttach.header = _masterChart.header.html;
      }

      var $ul = $('<ul/>', 
        {'class': 'chart',
          html: (chartToAttach.header += chartToAttach.chart)
        })
      .appendTo('.chartdisplay');

      // Reconsidering how to do the playlistoptions
      kexprdio.playlister.addPlaylistViews();      
      kexprdio.playlister.addPlaylistOptions();

      kexprdio.chooser.showHide();

      R.ready(function() {
        kexprdio.chartLoader._getAlbumInfo($ul);
      });
    },

    //-----
    _clearcharts: function() {
      $('.chart').remove();
      $('.chart-header').remove();
    },

    //-----
    _getAlbumInfo: function($ul) {
      //Find each of the chart items
      $ul.find('li').not('.chart-header').each(function(i, v) {
        var $li = $(v);
        //Rdio for album art
        var rdioQuery = $li.data('rdioquery');
        R.request({
          method: 'search',
          content: {query: rdioQuery, types: 'Album'},
          success: function(response) {
            // Album art
            var trackImageUrl = response.result.results[0].icon;
            $li.find('img').attr('src', trackImageUrl);
          },
          error: function() {
            // Needs to load placeholder album art for "Track not available on Rdio"
            $li.find('img').attr('src', 'img/failicon.png');
            console.log('R.request failed for search term:' + rdioQuery);
          }
        });

        var lfmArtist = $li.data('artist');
        var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='
          + lfmArtist
          + '&api_key=d43e672a5af20763d43866fcbbf2d201&format=json&callback=?';
        
        $.getJSON(url, function(data) {
          self.loading = false;
          $li.find('.bioshort').html('Last.FM Bio:  ' + data.artist.bio.summary + '... CLICK TO READ MORE.').bind('click', function() {
           kexprdio.chartLoader._bioToggle(this);
          });
          $li.find('.biolong').html('Last.FM Bio:  ' + data.artist.bio.content + ' ( Click to return to summary. )').bind('click', function() {
           kexprdio.chartLoader._bioToggle(this);
          });
        });

      });
    },

    _bioToggle: function(caller) {
      $(caller).toggle().toggleClass('shown').siblings().toggle().toggleClass('shown');
    },
    //+++++++++
    //
    // available commands
    //
    //+++++++++
    appendTocharts: function() {
      this._loadFromStorage(kexprdio.chooser.chartToLoad());
    },

    //+++++++++
    replacecharts: function() {
      this._clearcharts();
      var $_newChart = $('.monthbar .chosen').text();
      this._attach($_newChart);
    },

    //++++++++++
    loadingtest: function() {
      this._clearcharts();
      this._loadFromStorage(kexprdio.chooser.chartToLoad());
    }
  };

})();
