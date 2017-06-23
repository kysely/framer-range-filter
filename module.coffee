###

READ GIVEN RANGE VALUES FROM ›bottom‹ AND ›top‹ KEYS (OPTIONS)
OF THE ›RangeFilter‹ OBJECT.

FOR INTERACTIVITY, THE ›PanEnd‹ EVENT IS PREFERED AS IT WORKS
FOR BOTH DEKSTOP AND TOUCH DEVICES AND ENGAGES EVEN IF A USER
OVERDRAGS MIN/MAX VALUE.

EXAMPLE:
priceyCoats = new RangeFilter
	from: 419
	to: 2499

priceyCoats.on Events.PanEnd, ->
	print "You're seeing coats from $#{priceyCoats.bottom} to $#{priceyCoats.top}"

NOTE:
THE MODULE RETURNS VALUES AS floats (w/ decimal point).
YOU MAY WANT TO ROUND THE VALUES FOR THE USE.

###

class exports.RangeFilter extends Layer
	constructor: (options = {}) ->
		@options = options
		# Range states for the filter
		options.from ?= 1
		options.to ?= 100
		options.bottom ?= options.from
		options.top ?= options.to

		# Custom options for the controls
		options.activeRange ?= "rgba(0,0,0,0.6)"
		options.knobColor ?= "rgba(239,242,242,1)"
		options.knobSize ?= 80
		options.knobRadius ?= options.knobSize/2
		options.knobBorder ?= 2
		options.knobBorderColor ?= "rgba(0,0,0,0.2)"
		options.knobShadowColor ?= "rgba(201,203,203,0.3)"
		options.showValue ?= true
		options.valueColor ?= "rgb(130,130,130)"
		options.valueSize ?= "34px"
		options.currency ?= "€"

		# Defaults for the filter
		options.width ?= 600
		options.height ?= 12
		options.x ?= options.knobSize/2
		options.y ?= options.knobSize/2 - options.height/2
		options.backgroundColor ?= "rgba(239,244,244,1)"
		options.borderRadius ?= options.height/2

		super options


		# If initialized ›bottom‹ or ›top‹ are not at their
		# maximums, calculate their pixel position
		if @bottom != @from || @top != @to
			options.initBottom = Utils.modulate(options.bottom, [options.from, options.to], [0, options.width])
			options.initTop = Utils.modulate(options.top, [options.from, options.to], [0, options.width])
		else
			options.initBottom = 0
			options.initTop = options.width


# ///////////////////////////////////////////////////////

		# Create ›active range‹ indicator
		sliderHLight = new Layer
			superLayer: @
			height: @height
			width: @width
			x: options.initBottom
			backgroundColor: options.activeRange
			borderRadius: @borderRadius

# ///////////////////////////////////////////////////////

		# Create ›knob‹ controllers
		slidFrom = new Layer
			superLayer: @
			height: options.knobSize
			width: options.knobSize
			y: - options.knobSize/2 + options.height/2
			backgroundColor: options.knobColor
			borderRadius: options.knobRadius
			borderWidth: options.knobBorder
			borderColor: options.knobBorderColor
			shadowY: 10
			shadowBlur: 20
			shadowColor: options.knobShadowColor

		slidTo = new Layer
			superLayer: @
			height: options.knobSize
			width: options.knobSize
			y: - options.knobSize/2 + options.height/2
			backgroundColor: options.knobColor
			borderRadius: options.knobRadius
			borderWidth: options.knobBorder
			borderColor: options.knobBorderColor
			shadowY: 10
			shadowBlur: 20
			shadowColor: options.knobShadowColor

# ///////////////////////////////////////////////////////

		# If wanted, create floating value indicators for each knob
		if options.showValue
			fromIndicator = new Layer
				superLayer: slidFrom
				height: 60
				width: 200
				x: - 200/2 + options.knobSize/2
				y: - 70
				backgroundColor: null
				style:
					"textAlign" : "center"
					"fontSize" : options.valueSize
					"color" : options.valueColor

			toIndicator = new Layer
				superLayer: slidTo
				height: 60
				width: 200
				x: - 200/2 + options.knobSize/2
				y: - 70
				backgroundColor: null
				style:
					"textAlign" : "center"
					"fontSize" : options.valueSize
					"color" : options.valueColor

# ///////////////////////////////////////////////////////

		# Just some behavior options for both knobs
		# (looping, because the code is same for both knobs)
		for knob, i in [slidFrom, slidTo]
			knob.draggable = true
			knob.draggable.vertical = false
			knob.draggable.overdrag = false
			knob.draggable.momentum = false
			knob.draggable.bounce = false

			# Constrain the ›knobs‹ to be draggable only
			knob.draggable.constraints =
				x: - options.knobSize/2
				width: options.width + options.knobSize

			# When a ›knob‹ is dragging, call giveMeRange()
			# to calculate what's going on
			knob.on "change:x", ->
				giveMeRange()
		# /// END of ›for‹ loop


# ///////////////////////////////////////////////////////

		giveMeRange = ->
			# Make sure knobs do not overdrag each other
			if (slidFrom.midX >= slidTo.midX)
				tempHold = slidTo.midX
				slidTo.midX = slidFrom.midX
				slidFrom.midX = tempHold

			# Calculate and set the ›active‹ range
			sliderHLight.x = slidFrom.x + options.knobSize/2
			sliderHLight.width = slidTo.x - slidFrom.x

			# Calculate ›bottom‹ and ›top‹ ranges
			# in relation to the set from—to range in the input
			fromR = Utils.modulate(slidFrom.midX, [0, options.width], [options.from, options.to])
			toR = Utils.modulate(slidTo.midX, [0, options.width], [options.from, options.to])

			# If ›showValue‹ is true, update value indicators
			if options.showValue
				fromIndicator.html = "#{options.currency}#{Math.floor(fromR)}"
				toIndicator.html = "#{options.currency}#{Math.floor(toR)}"

			# Update the object's ›bottom‹ and ›top‹ options
			# as you need to read them in the prototype
			options.bottom = fromR
			options.top = toR

			# Return the calculations from the function
			return {from: fromR, to: toR}
		# /// END of giveMeRange() function

# ///////////////////////////////////////////////////////

		# Animate to a given position
		@goToRange = (min, max) ->
			minimum = Utils.modulate(min, [options.from, options.to], [0, options.width])
			maximum = Utils.modulate(max, [options.from, options.to], [0, options.width])

			animationA = new Animation slidFrom,
				midX: minimum
				options:
					curve: "ease-in-out"
					time: .2

			animationB = new Animation slidTo,
				midX: maximum
				options:
					curve: "ease-in-out"
					time: .2

			animationA.start()
			animationB.start()

		@goToRange(options.bottom, options.top)

# ///////////////////////////////////////////////////////

	# Add a method for calling goToRange() animation
	goTo: (from, to) ->
		@goToRange(from, to)

# ///////////////////////////////////////////////////////

	# Define getters/setters for custom options ›bottom‹ and ›top‹
	# as you need to read them outside the constructor
	@define 'bottom',
		get: ->
			@options.bottom
		set: (value) ->
			@options.bottom = value
	@define 'top',
		get: ->
			@options.top
		set: (value) ->
			@options.top = value

# ///////////////////////////////////////////////////////
