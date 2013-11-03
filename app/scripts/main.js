Checkerboard = {};

var gradientColor;

var orderListened = 0;

Checkerboard.Square = Backbone.Model.extend({
	initialize: function(){
		console.log('hello i\'m a square')
	},

	defaults: function() {
		return {
			color: this.randomize()
		}
	},

	randomize: function() {
		return (Math.floor(Math.random()*16777215))
	}
})

Checkerboard.SquareView = Backbone.View.extend({

	className: 'square',

	events: {
		'click': 'initailColor'
	},

	initialize: function() {

		var tmpl = $('.square-template').text()
		var dayTemplate = _.template(tmpl);
		this.$el.html(dayTemplate())

		$('.container').append(this.el);
		this.render();
	},

	render: function() {
		this.$el.css({
			background: '#' + this.model.get('color').toString(16)
			// color: '#' + (this.model.get('color') - Math.floor(gradientColor * 0.0001)).toString(16)
		});
		// console.log(this.displayOrder());
		this.listenForChange()
	},

	setGradientColor: function() {
		gradientColor += Math.floor(gradientColor * 0.0001)
		this.model.set('color', gradientColor)
		this.render();
	},

	initailColor: function() {
		orderListened = 0;
		gradientColor = this.model.get('color');
		this.setGradientColor();
	},
	
	listenForChange: function() {
		this.listenToOnce(squares, 'change:color', this.setGradientColor)
	},

	displayOrder: function() {
		this.$el.text((orderListened = orderListened + 1) + ('#' + this.model.get('color').toString(16)).toUppercase())
	}
})

Checkerboard.SquareCollection = Backbone.Collection.extend({
	model: Checkerboard.Square,

	initialize: function() {
		this.on('add', function(square) {
			new Checkerboard.SquareView({ model: square })
		})
	}
})

squares = new Checkerboard.SquareCollection();

for(i = 0; i < 72; i++) {
	squares.add({})
}


