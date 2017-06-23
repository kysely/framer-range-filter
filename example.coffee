priceyCoats = new RangeFilter
    y: 200
    from: 499
    to: 2899

priceyCoats.on Events.PanEnd, ->
    print "#{priceyCoats.bottom} — #{priceyCoats.top}"

# More detailed docs at 
# https://github.com/kysely/framer-range-filter

# Or just use Framer's core RangeSliderComponent
# https://framer.com/docs/#rangeslider.rangeslidercomponent
