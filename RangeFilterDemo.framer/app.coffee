Framer.Extras.Hints.disable()
Framer.Extras.ShareInfo.disable()

# IMPORT ›RangeFilter‹ MODULE FROM modules FOLDER
{RangeFilter} = require "RangeFilter"
# //////// 


# Layers for the sake of this demo

Screen.backgroundColor = "rgba(18,2,28,1)"

header = new Layer
	width: 750
	height: 300
	html: "<a style='text-decoration: none; color: #fff' href='http://framer.com'>Shop Vacations</a>"
	backgroundColor: null
	style:
		"fontFamily": "Avenir Next, Helvetica, sans-serif"	
		"fontSize": "98px"
		"fontWeight": "700"
		"lineHeight": "160px"
		"letterSpacing": "-2px"
		"color": "#fff"
		"textAlign": "left"
		"paddingLeft": "20px"

forMe = new Layer
	superLayer: header
	x: 20
	y: 170
	height: 100
	width: 345
	borderRadius: 8
	html: "Shop for Me"
	backgroundColor: "rgba(149,0,255,0.12)"
	style:
		"fontFamily": "Avenir, Helvetica, sans-serif"	
		"fontSize": "40px"
		"fontWeight": "600"
		"lineHeight": "105px"
		"color": "#fff"
		"textAlign": "center"

forRich = new Layer
	superLayer: header
	x: 385
	y: 170
	height: 100
	width: 345
	borderRadius: 8
	html: "Shop for Rich"
	backgroundColor: "rgba(149,0,255,0.12)"
	style:
		"fontFamily": "Avenir, Helvetica, sans-serif"	
		"fontSize": "40px"
		"fontWeight": "600"
		"lineHeight": "105px"
		"color": "#fff"
		"textAlign": "center"


# Initialize ›RangeFilter‹ instance with custom options
priceyDays = new RangeFilter
	y: Screen.height - 100
	x: Screen.width/2 - 250
	height: 10
	width: 500
	backgroundColor: "rgba(30,0,53,1)"
	activeRange: "rgba(105,0,230,1)"
	knobColor: "rgba(30,0,49,1)"
	knobShadowColor: "rgba(0,0,0,0.5)"
	valueColor: "rgba(212,196,251,0.76)"
	from: 499
	to: 2899

# Create recommended event listener ›PanEnd‹
priceyDays.on Events.PanEnd, ->
	min = Math.round(priceyDays.bottom)
	max = Math.round(priceyDays.top)
	showMeVacations(min, max)

# Demo of ›goTo‹ animation method
forMe.onClick ->
	priceyDays.goTo(499, 1500)
	showMeVacations(499, 1500)

forRich.onClick ->
	priceyDays.goTo(1500, 2899)
	showMeVacations(1500, 2899)




# Some more layer for the demo
holidays = new Layer

data = JSON.parse Utils.domLoadDataSync "vacations.json"

showMeVacations = (min, max) ->
	layouter = 0
	
	holidays.destroy()
	holidays = new ScrollComponent
		y: 300
		height: 800
		width: 750
		scrollHorizontal: false
	
	for vacation, i in data.vacations
		if vacation.price <= max && vacation.price >= min
			opaque = 1
		else
			opaque = 0.1
		
		if layouter > 1
			layouter = 0
		
		if layouter == 1
			i = i-1
		
		vacationn = new Layer
			parent: holidays.content
			y: 565 * (i/2)
			x: 20 + layouter*365
			width: 345
			height: 545
			opacity: opaque
			borderRadius: 10
			clip: true
			image: "images/#{vacation.photo}"
		
		vacationnInfo = new Layer
			superLayer: vacationn
			width: 345
			height: 200
			y: vacationn.height-200
			backgroundColor: "rgba(9,0,11,0.7)"
			html: """
				<style>
					h3 { margin: 20px 0 0 20px; font-size: 40px; color: #fff; font-family: "Avenir", sans-serif; line-height: 60px}
					span { margin: 20px 0 0 20px; font-family: "Avenir", sans-serif; color: #fff; display: inline-block; font-size: 50px; line-height: 70px; font-weight: 500}
					
				</style>
				<h3>#{vacation.vacation}</h3>
				<span class="price">€#{vacation.price}</span>"""

		layouter++


min = Math.round(priceyDays.bottom)
max = Math.round(priceyDays.top)
showMeVacations(min, max)
