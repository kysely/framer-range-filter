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

## Customizable features
#### from
Set the minimum ›from‹ range value. Default ›1‹
```javascript
priceyCoats = new RangeFilter
	from: 499
```
#### to
Set the maximum ›to‹ range value. Default ›100‹
```javascript
priceyCoats = new RangeFilter
	to: 2899
```
#### bottom
Initialize filter with a different than ›from‹ value. Default ›same as from‹
```javascript
priceyCoats = new RangeFilter
	bottom: 699
```
#### top
Initialize filter with a different than ›to‹ value. Default ›same as to‹
```javascript
priceyCoats = new RangeFilter
	top: 2199
```

```javascript
priceyCoats = new RangeFilter
	# Set the height of the range bar (default 12)
  height: 10
  
  # Set the width of the range bar (default 600)
	width: 500
  
  # Set the color of inactive (background) bar
	backgroundColor: "rgba(30,0,53,1)"
  
  # Set the color of active (selected) range
	activeRange: "rgba(105,0,230,1)"
  
  # Set the color of the controller knobs
	knobColor: "rgba(30,0,49,1)"
  
  # Set the color of shadow of the controller knobs
	knobShadowColor: "rgba(0,0,0,0.5)"
  
  # Set the color of text values above the the knobs
	valueColor: "rgba(212,196,251,0.76)"
  
	from: 499
	to: 2899
```
