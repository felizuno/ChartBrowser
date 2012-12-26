(function(){
	kexprdio.chooser = {
		init: function() {
			$('.chooserbar').fadeIn('slow');
		},

		_toggleVisibility: function(buttonbar) {
			$(buttonbar.children).not('.chosen').toggle('fast');
		},

		chartToLoad: function() { //right now nothing calls this, waiting on cleaned jsons
	        var $chart = $('.chartbuttons').find('.chosen');
	        var $year = $('.yearbar').find('.chosen');
	        var filename = ($chart.attr('id') + $year.attr('id'));
	        return filename;
      	},

		showHide: function() {
	        if (!($('.choosertoggle').hasClass('shown'))) {
	          $('.chooserbar').children().not('.choosertoggle').slideDown('fast');
	        } else {
	          $('.chooserbar').children().not('.choosertoggle').slideUp('fast');
	        }

	        $('.choosertoggle').toggleClass('shown');
		},
		
		toggleChosen: function(button, buttonbar) {
			$(buttonbar).find('.chosen').removeClass('chosen');
			$(button).toggleClass('chosen');
			this._toggleVisibility(buttonbar);
		},

		activateRangeOptions: function() {
			if (!$('#all').hasClass('chosen')) {
				$('#all').addClass('chosen').show();
			}

	        $('.range').not('#all').each(function(i, v) {
	          $(v).bind('click', function() {
	            kexprdio.chooser.toggleChosen(this, this.parentElement);
	          });
	        });
		}
	};

})();
