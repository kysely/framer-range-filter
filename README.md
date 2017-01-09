# RangeFilter Module for Framer

A simple module for creating range filter with slider.

## How To Install

- Download the module
- Copy the RangeFilter.coffee file to your prototype's modules folder.
- Call ```{RangeFilter} = require "RangeFilter"``` in your Framer prototype.
- Initialize with ```priceyCoats = new RangeFilter```

#### [Try the live demo] (https://framer.cloud/TNFYC/)

![Screen Demo](./rangeFilterDemo.gif)

## How To Use

#### Initialize default range filter
```javascript
priceyCoats = new RangeFilter
```

#### Set the slider range values
```javascript
priceyCoats = new RangeFilter
  from: 499
  to: 2899
```

## Read the Range Values
Current values set at a filter are the object's keys ›bottom‹ and ›top‹


```javascript
someLay.onClick ->
	print priceyCoats.bottom
	print priceyCoats.top
```

## Animate to Range

Call the goTo() method
```javascript
priceyCoats.goTo(25, 75)
```

## Customizable features
#### from
Set the minimum ›from‹ range value. Default ›1‹
```javascript
	from: 499
```
#### to
Set the maximum ›to‹ range value. Default ›100‹
```javascript
	to: 2899
```
#### bottom
Initialize filter with a different than ›from‹ value. Default ›same as from‹
```javascript
	bottom: 699
```
#### top
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	top: 2199
```

#### backgroundColor
Set the color of the range bar (inactive/background)
```javascript
	backgroundColor: "rgba(239,244,244,1)"
```

#### width
Set the width of filter range bar. Default ›600‹
```javascript
	width: 500
```

#### height
Set the height of filter range bar. Default ›12‹
```javascript
	height: 8
```

#### borderRadius
Set the corner radius for the filter range bar. Default ›half of height‹
```javascript
	borderRadius: 0
```

#### activeRange
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	activeRange: "rgba(0,0,0,0.6)"
```

#### knobColor
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	knobColor: "rgba(239,242,242,1)"
```

#### knobSize
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	knobSize: 80
```

#### knobRadius
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	knobRadius: options.knobSize/2
```

#### knobBorder
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	knobBorder: 2
```

#### knobBorderColor
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	knobBorderColor: "rgba(0,0,0,0.2)"
```

#### knobShadowColor
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	knobShadowColor: "rgba(201,203,203,0.3)"
```

#### showValue
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	showValue: true
```

#### valueColor
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	valueColor: "rgb(130,130,130)"
```

#### valueSize
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	valueSize: "34px"
```

#### currency
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
	currency: "€"
```


### Example of fully customized range filter
```javascript
priceyCoats = new RangeFilter
	y: Screen.height - 100
	x: Screen.width/2 - 250
	height: 10
	width: 500
	backgroundColor: "rgba(30,0,53,1)"
	activeRange: "rgba(105,0,230,1)"
	knobColor: "rgba(30,0,49,1)"
	knobShadowColor: "rgba(0,0,0,0.5)"
	valueColor: "rgba(212,196,251,0.76)"
	currency: "$"
	from: 499
	to: 2899
```
