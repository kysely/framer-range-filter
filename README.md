# RangeFilter Module for Framer

A simple module for creating range filter with slider.

## How To Install

- Download the module
- Copy the RangeFilter.coffee file to your prototype's modules folder.
- Call ```{RangeFilter} = require "RangeFilter"``` in your Framer prototype.
- Initialize with ```priceyCoats = new RangeFilter```

[Try the live demo] (https://framer.cloud/TNFYC/)
![Demo](./rangeFilterDemo.gif)

## How To Use

#### Initialize default range filter
```javascript
priceyDays = new RangeFilter
```

#### Set the slider range values
```javascript
priceyDays = new RangeFilter
  from: 499
  to: 2899
```

## Customizable features
#### from
#### to
#### bottom
#### top
