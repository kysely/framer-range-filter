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

#### Read the Range Values
Current values set at a filter are the object's keys ›bottom‹ and ›top‹


```javascript
someLayer.onClick ->
	print priceyCoats.bottom
	print priceyCoats.top
```

#### Animate to a Specific Range

Call the goTo() method
```javascript
priceyCoats.goTo(699, 1999)
```

## Customizable features
#### from & to
Set the range of your filter. Default ›from 1 to 100‹
```javascript
	from: 499
	to: 2899
```
#### bottom &/or top
Initialize your filter with a custom active range. Default ›same as from/to‹.
You can define none / one of these / both of these options.
```javascript
	bottom: 699
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
Set the color of the active range.
```javascript
	activeRange: "rgba(0,0,0,0.6)"
```

#### knobColor
Set the color of controller knobs.
```javascript
	knobColor: "rgba(239,242,242,1)"
```

#### knobSize
Set the size of controller knobs. Default ›80‹
```javascript
	knobSize: 40
```

#### knobRadius
Set the corner radius of controller knobs. Default ›half of knobSize‹
```javascript
	knobRadius: 5
```

#### knobBorder
Set a border width of controller knobs. Default ›2‹
```javascript
	knobBorder: 1
```

#### knobBorderColor
Set the color of controller knobs' borders.
```javascript
	knobBorderColor: "rgba(0,0,0,0.2)"
```

#### knobShadowColor
Set the shadow color for controller knobs.
```javascript
	knobShadowColor: "rgba(201,203,203,0.3)"
```

#### showValue
Say if you want to show the text values above each knob. Default ›true‹
```javascript
	showValue: false
```

#### valueColor
Set the color of text values above controller knobs.
```javascript
	valueColor: "rgb(130,130,130)"
```

#### valueSize
Set the size of text value above controller knobs. Default ›"34 px"‹
```javascript
	valueSize: "20px"
```

#### currency
Set the currency symbol in front of the text values. Default ›€‹
```javascript
	currency: "¥"
```
