(function() {
  
  kexprdio.chartLoader = {
    fullCurrentChart: {},

    loadJson: function(protoChart, callback) {
      var self = this;
      var _protoChart = protoChart;

      $.getJSON('charts/' + protoChart.fileId + '.json', function(data) {
        if (!data) {
          return;
        }

        self.fullCurrentChart = _protoChart;
        
        $('.range').remove();

        _.each(data.chart, function(v, i) {
          var $dr = $('<div />', {
            'class': 'range',
            'style':'display:none;',
            html: v.daterange
          }).appendTo('.monthbar');
          
          self.fullCurrentChart.charts.push(
            {
              header: {
                title: v.daterange,
                html: '<li class="chart-header">' + v.daterange + '</li>'
              },
              chart: []
            }
          );

          _.each(v.albums, function(v2, i2) {
            var rdioQuery = v2. artist + ' ' + v2.album + ' ';// + v2.label;
            var lfmArtist = v2.artist;
            var _displayName = v2.album + " - " + v2.artist;
            self.fullCurrentChart.charts[i].chart.push(
              '<li class="chartitem" data-rdioquery="' + rdioQuery + '" data-artist="' + lfmArtist + '">'
              + '<div class="songname">'+ v2.rank + '. ' + _displayName + '</div>'
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

        kexprdio.chooser.activateRangeOptions();

        if (_.isFunction(callback)) {
          callback(self);
        }
      });
    },

    changeMonth: function(config, append) {
      var chartToAttach = {};

      if (_.isString(config)) {
        chartToAttach = _.find(this.fullCurrentChart.charts, function(chart) {
          return chart.header.title == config;
        });

        if (!chartToAttach.header) {
          this.changeMonth(0); // THIS IS FOR WHEN YOU JUMP THE 2006/2007 FORMAT
          return;
        }
      } else if (_.isNumber(config)) {
        chartToAttach = this.fullCurrentChart.charts[config];
      } else {
        return;
      }

      if (!append) {
        $('.chartdisplay').children().remove();
      }

      var $newChart = $('<ul/>', 
        {'class': 'chart',
          html: (chartToAttach.header.html += chartToAttach.chart.join(''))
        })
      .appendTo('.chartdisplay');

      // Reconsidering how to do the playlistoptions
      kexprdio.playlister.addPlaylistViews();      
      kexprdio.playlister.addPlaylistOptions();

      kexprdio.chooser.showHide();

      R.ready(function() {
        kexprdio.chartLoader.addInfo($newChart);
      });
    },


    //-----
    addInfo: function($ul) {
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
           kexprdio.bioToggle(this);
          });
          $li.find('.biolong').html('Last.FM Bio:  ' + data.artist.bio.content + ' ( Click to return to summary. )').bind('click', function() {
           kexprdio.bioToggle(this);
          });
        });

      });
    },
    //+++++++++
    //
    // available commands
    //
    //+++++++++

    appendTocharts: function() {
      var newChartName = $('.monthbar .chosen').text();
      this.changeMonth(newChartName, true);
    },

    //+++++++++
    loadReplace: function(protoChart) {
      var newChartName = $('.monthbar .chosen').text();

      if (!this.fullCurrentChart.fileId || protoChart.fileId != this.fullCurrentChart.fileId) {
        this.loadJson(protoChart, function(context) {
          context.changeMonth((newChartName) ? newChartName : 0);
        });
      } else {
        if (newChartName) {
          this.changeMonth(newChartName);
        } else {
          return;
        }
      }
    },
  };

})();
