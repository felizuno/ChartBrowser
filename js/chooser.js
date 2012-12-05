(function(){
	kexprdio.chooser = {
		choice: {
			show: '',

			dateDay: new Date().getDay(),
			dateWeek: '',
			dateMonth: '',
			dateYear: new Date().getFullYear(),
			time: ''
		},

		init: function() {
			this.choice.show = 'jr';
			this.choice.freq = 'wd';
		},

		_refreshDatechooser: function() {
			switch(this.choice.freq) {
				case 'wk':
					// switch the date chooser accordingly
					break;
				case 'wd':
					// switch the date chooser accordingly
					break;
				case 'da':
					// switch the date chooser accordingly
					break;
				case 'ed':
					// switch the date chooser accordingly
					break;
			}
		},

		toggleChosen: function(button) {
			$('.chosen').removeClass('chosen');
			$(button).toggleClass('chosen');
			this.choice.show = $(button).data('name');
			//this._refreshDatechooser();
		}
	};
})();
