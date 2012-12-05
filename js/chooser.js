(function(){
	kexprdio.chooser = {
		choice: {
			show: '',
			freq: '',
			date: '',
			time: ''
		},

		$showMap: { 'cw':'wd', 'kc':'wd', 'es': 'wk', 'wp': 'wk',
					 'rh': 'wk', 'sd': 'wk', 'sh': 'wk', 'mm': 'wk',
					 'pv': 'wk', 'ao': 'wk', 'sr': 'wk', 'sk': 'wk',
					 'pb': 'wk', 'ss': 'wk', 'ex': 'wk', 'sa': 'wk',
					 'jt': 'wk', 'vm':'da', 'jr': 'wd'
			},

		init: function() {
			this.choice.show = 'jr';
			this._toggleDays();
		},

		toggleChosen: function(button) {
			$('.chosen').removeClass('chosen');
			$(button).toggleClass('chosen');
			this.choice.show = $(button).attr('id');
			this._toggleDays();
		},

		_toggleDays: function() {
			var self = this;

			$.each(self.$showMap, function (k, v) {

				if (self.choice.show == k) {
					self.choice.freq = v;
					console.log(self.choice.freq);
				};
			});
		}

	};
})();
