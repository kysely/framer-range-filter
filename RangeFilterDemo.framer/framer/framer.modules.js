require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"RangeFilter":[function(require,module,exports){

/*

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
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.RangeFilter = (function(superClass) {
  extend(RangeFilter, superClass);

  function RangeFilter(options) {
    var fromIndicator, giveMeRange, i, j, knob, len, ref, slidFrom, slidTo, sliderHLight, toIndicator;
    if (options == null) {
      options = {};
    }
    this.options = options;
    if (options.from == null) {
      options.from = 1;
    }
    if (options.to == null) {
      options.to = 100;
    }
    if (options.bottom == null) {
      options.bottom = options.from;
    }
    if (options.top == null) {
      options.top = options.to;
    }
    if (options.activeRange == null) {
      options.activeRange = "rgba(0,0,0,0.6)";
    }
    if (options.knobColor == null) {
      options.knobColor = "rgba(239,242,242,1)";
    }
    if (options.knobSize == null) {
      options.knobSize = 80;
    }
    if (options.knobRadius == null) {
      options.knobRadius = options.knobSize / 2;
    }
    if (options.knobBorder == null) {
      options.knobBorder = 2;
    }
    if (options.knobBorderColor == null) {
      options.knobBorderColor = "rgba(0,0,0,0.2)";
    }
    if (options.knobShadowColor == null) {
      options.knobShadowColor = "rgba(201,203,203,0.3)";
    }
    if (options.showValue == null) {
      options.showValue = true;
    }
    if (options.valueColor == null) {
      options.valueColor = "rgb(130,130,130)";
    }
    if (options.valueSize == null) {
      options.valueSize = "34px";
    }
    if (options.currency == null) {
      options.currency = "€";
    }
    if (options.width == null) {
      options.width = 600;
    }
    if (options.height == null) {
      options.height = 12;
    }
    if (options.x == null) {
      options.x = options.knobSize / 2;
    }
    if (options.y == null) {
      options.y = options.knobSize / 2 - options.height / 2;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "rgba(239,244,244,1)";
    }
    if (options.borderRadius == null) {
      options.borderRadius = options.height / 2;
    }
    RangeFilter.__super__.constructor.call(this, options);
    if (this.bottom !== this.from || this.top !== this.to) {
      options.initBottom = Utils.modulate(options.bottom, [options.from, options.to], [0, options.width]);
      options.initTop = Utils.modulate(options.top, [options.from, options.to], [0, options.width]);
    } else {
      options.initBottom = 0;
      options.initTop = options.width;
    }
    sliderHLight = new Layer({
      superLayer: this,
      height: this.height,
      width: this.width,
      x: options.initBottom,
      backgroundColor: options.activeRange,
      borderRadius: this.borderRadius
    });
    slidFrom = new Layer({
      superLayer: this,
      height: options.knobSize,
      width: options.knobSize,
      y: -options.knobSize / 2 + options.height / 2,
      backgroundColor: options.knobColor,
      borderRadius: options.knobRadius,
      borderWidth: options.knobBorder,
      borderColor: options.knobBorderColor,
      shadowY: 10,
      shadowBlur: 20,
      shadowColor: options.knobShadowColor
    });
    slidTo = new Layer({
      superLayer: this,
      height: options.knobSize,
      width: options.knobSize,
      y: -options.knobSize / 2 + options.height / 2,
      backgroundColor: options.knobColor,
      borderRadius: options.knobRadius,
      borderWidth: options.knobBorder,
      borderColor: options.knobBorderColor,
      shadowY: 10,
      shadowBlur: 20,
      shadowColor: options.knobShadowColor
    });
    if (options.showValue) {
      fromIndicator = new Layer({
        superLayer: slidFrom,
        height: 60,
        width: 200,
        x: -200 / 2 + options.knobSize / 2,
        y: -70,
        backgroundColor: null,
        style: {
          "textAlign": "center",
          "fontSize": options.valueSize,
          "color": options.valueColor
        }
      });
      toIndicator = new Layer({
        superLayer: slidTo,
        height: 60,
        width: 200,
        x: -200 / 2 + options.knobSize / 2,
        y: -70,
        backgroundColor: null,
        style: {
          "textAlign": "center",
          "fontSize": options.valueSize,
          "color": options.valueColor
        }
      });
    }
    ref = [slidFrom, slidTo];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      knob = ref[i];
      knob.draggable = true;
      knob.draggable.vertical = false;
      knob.draggable.overdrag = false;
      knob.draggable.momentum = false;
      knob.draggable.bounce = false;
      knob.draggable.constraints = {
        x: -options.knobSize / 2,
        width: options.width + options.knobSize
      };
      knob.on("change:x", function() {
        return giveMeRange();
      });
    }
    giveMeRange = function() {
      var fromR, tempHold, toR;
      if (slidFrom.midX >= slidTo.midX) {
        tempHold = slidTo.midX;
        slidTo.midX = slidFrom.midX;
        slidFrom.midX = tempHold;
      }
      sliderHLight.x = slidFrom.x + options.knobSize / 2;
      sliderHLight.width = slidTo.x - slidFrom.x;
      fromR = Utils.modulate(slidFrom.midX, [0, options.width], [options.from, options.to]);
      toR = Utils.modulate(slidTo.midX, [0, options.width], [options.from, options.to]);
      if (options.showValue) {
        fromIndicator.html = "" + options.currency + (Math.floor(fromR));
        toIndicator.html = "" + options.currency + (Math.floor(toR));
      }
      options.bottom = fromR;
      options.top = toR;
      return {
        from: fromR,
        to: toR
      };
    };
    this.goToRange = function(min, max) {
      var animationA, animationB, maximum, minimum;
      minimum = Utils.modulate(min, [options.from, options.to], [0, options.width]);
      maximum = Utils.modulate(max, [options.from, options.to], [0, options.width]);
      animationA = new Animation(slidFrom, {
        midX: minimum,
        options: {
          curve: "ease-in-out",
          time: .2
        }
      });
      animationB = new Animation(slidTo, {
        midX: maximum,
        options: {
          curve: "ease-in-out",
          time: .2
        }
      });
      animationA.start();
      return animationB.start();
    };
    this.goToRange(options.bottom, options.top);
  }

  RangeFilter.prototype.goTo = function(from, to) {
    return this.goToRange(from, to);
  };

  RangeFilter.define('bottom', {
    get: function() {
      return this.options.bottom;
    },
    set: function(value) {
      return this.options.bottom = value;
    }
  });

  RangeFilter.define('top', {
    get: function() {
      return this.options.top;
    },
    set: function(value) {
      return this.options.top = value;
    }
  });

  return RangeFilter;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9yYWRlay9EZXNrdG9wL1JhbmdlRmlsdGVyRGVtby5mcmFtZXIvbW9kdWxlcy9SYW5nZUZpbHRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLypcblxuUkVBRCBHSVZFTiBSQU5HRSBWQUxVRVMgRlJPTSDigLpib3R0b23igLkgQU5EIOKAunRvcOKAuSBLRVlTIChPUFRJT05TKVxuT0YgVEhFIOKAulJhbmdlRmlsdGVy4oC5IE9CSkVDVC5cblxuRk9SIElOVEVSQUNUSVZJVFksIFRIRSDigLpQYW5FbmTigLkgRVZFTlQgSVMgUFJFRkVSRUQgQVMgSVQgV09SS1NcbkZPUiBCT1RIIERFS1NUT1AgQU5EIFRPVUNIIERFVklDRVMgQU5EIEVOR0FHRVMgRVZFTiBJRiBBIFVTRVJcbk9WRVJEUkFHUyBNSU4vTUFYIFZBTFVFLlxuXG5FWEFNUExFOlxucHJpY2V5Q29hdHMgPSBuZXcgUmFuZ2VGaWx0ZXJcblx0ZnJvbTogNDE5XG5cdHRvOiAyNDk5XG5cbnByaWNleUNvYXRzLm9uIEV2ZW50cy5QYW5FbmQsIC0+XG5cdHByaW50IFwiWW91J3JlIHNlZWluZyBjb2F0cyBmcm9tICQje3ByaWNleUNvYXRzLmJvdHRvbX0gdG8gJCN7cHJpY2V5Q29hdHMudG9wfVwiXG5cbk5PVEU6XG5USEUgTU9EVUxFIFJFVFVSTlMgVkFMVUVTIEFTIGZsb2F0cyAody8gZGVjaW1hbCBwb2ludCkuXG5ZT1UgTUFZIFdBTlQgVE8gUk9VTkQgVEhFIFZBTFVFUyBGT1IgVEhFIFVTRS5cbiAqL1xudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5leHBvcnRzLlJhbmdlRmlsdGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFJhbmdlRmlsdGVyLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBSYW5nZUZpbHRlcihvcHRpb25zKSB7XG4gICAgdmFyIGZyb21JbmRpY2F0b3IsIGdpdmVNZVJhbmdlLCBpLCBqLCBrbm9iLCBsZW4sIHJlZiwgc2xpZEZyb20sIHNsaWRUbywgc2xpZGVySExpZ2h0LCB0b0luZGljYXRvcjtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMuZnJvbSA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLmZyb20gPSAxO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy50byA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnRvID0gMTAwO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ib3R0b20gPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5ib3R0b20gPSBvcHRpb25zLmZyb207XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRvcCA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnRvcCA9IG9wdGlvbnMudG87XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmFjdGl2ZVJhbmdlID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuYWN0aXZlUmFuZ2UgPSBcInJnYmEoMCwwLDAsMC42KVwiO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5rbm9iQ29sb3IgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5rbm9iQ29sb3IgPSBcInJnYmEoMjM5LDI0MiwyNDIsMSlcIjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMua25vYlNpemUgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5rbm9iU2l6ZSA9IDgwO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5rbm9iUmFkaXVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMua25vYlJhZGl1cyA9IG9wdGlvbnMua25vYlNpemUgLyAyO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5rbm9iQm9yZGVyID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMua25vYkJvcmRlciA9IDI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmtub2JCb3JkZXJDb2xvciA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLmtub2JCb3JkZXJDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmtub2JTaGFkb3dDb2xvciA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLmtub2JTaGFkb3dDb2xvciA9IFwicmdiYSgyMDEsMjAzLDIwMywwLjMpXCI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNob3dWYWx1ZSA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNob3dWYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnZhbHVlQ29sb3IgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy52YWx1ZUNvbG9yID0gXCJyZ2IoMTMwLDEzMCwxMzApXCI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnZhbHVlU2l6ZSA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnZhbHVlU2l6ZSA9IFwiMzRweFwiO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5jdXJyZW5jeSA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLmN1cnJlbmN5ID0gXCLigqxcIjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMud2lkdGggPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IDYwMDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gMTI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnggPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy54ID0gb3B0aW9ucy5rbm9iU2l6ZSAvIDI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnkgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy55ID0gb3B0aW9ucy5rbm9iU2l6ZSAvIDIgLSBvcHRpb25zLmhlaWdodCAvIDI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJhY2tncm91bmRDb2xvciA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyMzksMjQ0LDI0NCwxKVwiO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ib3JkZXJSYWRpdXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5ib3JkZXJSYWRpdXMgPSBvcHRpb25zLmhlaWdodCAvIDI7XG4gICAgfVxuICAgIFJhbmdlRmlsdGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIGlmICh0aGlzLmJvdHRvbSAhPT0gdGhpcy5mcm9tIHx8IHRoaXMudG9wICE9PSB0aGlzLnRvKSB7XG4gICAgICBvcHRpb25zLmluaXRCb3R0b20gPSBVdGlscy5tb2R1bGF0ZShvcHRpb25zLmJvdHRvbSwgW29wdGlvbnMuZnJvbSwgb3B0aW9ucy50b10sIFswLCBvcHRpb25zLndpZHRoXSk7XG4gICAgICBvcHRpb25zLmluaXRUb3AgPSBVdGlscy5tb2R1bGF0ZShvcHRpb25zLnRvcCwgW29wdGlvbnMuZnJvbSwgb3B0aW9ucy50b10sIFswLCBvcHRpb25zLndpZHRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMuaW5pdEJvdHRvbSA9IDA7XG4gICAgICBvcHRpb25zLmluaXRUb3AgPSBvcHRpb25zLndpZHRoO1xuICAgIH1cbiAgICBzbGlkZXJITGlnaHQgPSBuZXcgTGF5ZXIoe1xuICAgICAgc3VwZXJMYXllcjogdGhpcyxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIHg6IG9wdGlvbnMuaW5pdEJvdHRvbSxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5hY3RpdmVSYW5nZSxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXNcbiAgICB9KTtcbiAgICBzbGlkRnJvbSA9IG5ldyBMYXllcih7XG4gICAgICBzdXBlckxheWVyOiB0aGlzLFxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmtub2JTaXplLFxuICAgICAgd2lkdGg6IG9wdGlvbnMua25vYlNpemUsXG4gICAgICB5OiAtb3B0aW9ucy5rbm9iU2l6ZSAvIDIgKyBvcHRpb25zLmhlaWdodCAvIDIsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMua25vYkNvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiBvcHRpb25zLmtub2JSYWRpdXMsXG4gICAgICBib3JkZXJXaWR0aDogb3B0aW9ucy5rbm9iQm9yZGVyLFxuICAgICAgYm9yZGVyQ29sb3I6IG9wdGlvbnMua25vYkJvcmRlckNvbG9yLFxuICAgICAgc2hhZG93WTogMTAsXG4gICAgICBzaGFkb3dCbHVyOiAyMCxcbiAgICAgIHNoYWRvd0NvbG9yOiBvcHRpb25zLmtub2JTaGFkb3dDb2xvclxuICAgIH0pO1xuICAgIHNsaWRUbyA9IG5ldyBMYXllcih7XG4gICAgICBzdXBlckxheWVyOiB0aGlzLFxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmtub2JTaXplLFxuICAgICAgd2lkdGg6IG9wdGlvbnMua25vYlNpemUsXG4gICAgICB5OiAtb3B0aW9ucy5rbm9iU2l6ZSAvIDIgKyBvcHRpb25zLmhlaWdodCAvIDIsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMua25vYkNvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiBvcHRpb25zLmtub2JSYWRpdXMsXG4gICAgICBib3JkZXJXaWR0aDogb3B0aW9ucy5rbm9iQm9yZGVyLFxuICAgICAgYm9yZGVyQ29sb3I6IG9wdGlvbnMua25vYkJvcmRlckNvbG9yLFxuICAgICAgc2hhZG93WTogMTAsXG4gICAgICBzaGFkb3dCbHVyOiAyMCxcbiAgICAgIHNoYWRvd0NvbG9yOiBvcHRpb25zLmtub2JTaGFkb3dDb2xvclxuICAgIH0pO1xuICAgIGlmIChvcHRpb25zLnNob3dWYWx1ZSkge1xuICAgICAgZnJvbUluZGljYXRvciA9IG5ldyBMYXllcih7XG4gICAgICAgIHN1cGVyTGF5ZXI6IHNsaWRGcm9tLFxuICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICB4OiAtMjAwIC8gMiArIG9wdGlvbnMua25vYlNpemUgLyAyLFxuICAgICAgICB5OiAtNzAsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogbnVsbCxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgIFwiZm9udFNpemVcIjogb3B0aW9ucy52YWx1ZVNpemUsXG4gICAgICAgICAgXCJjb2xvclwiOiBvcHRpb25zLnZhbHVlQ29sb3JcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0b0luZGljYXRvciA9IG5ldyBMYXllcih7XG4gICAgICAgIHN1cGVyTGF5ZXI6IHNsaWRUbyxcbiAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgeDogLTIwMCAvIDIgKyBvcHRpb25zLmtub2JTaXplIC8gMixcbiAgICAgICAgeTogLTcwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICBcImZvbnRTaXplXCI6IG9wdGlvbnMudmFsdWVTaXplLFxuICAgICAgICAgIFwiY29sb3JcIjogb3B0aW9ucy52YWx1ZUNvbG9yXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZWYgPSBbc2xpZEZyb20sIHNsaWRUb107XG4gICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGkgPSArK2opIHtcbiAgICAgIGtub2IgPSByZWZbaV07XG4gICAgICBrbm9iLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICBrbm9iLmRyYWdnYWJsZS52ZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAga25vYi5kcmFnZ2FibGUub3ZlcmRyYWcgPSBmYWxzZTtcbiAgICAgIGtub2IuZHJhZ2dhYmxlLm1vbWVudHVtID0gZmFsc2U7XG4gICAgICBrbm9iLmRyYWdnYWJsZS5ib3VuY2UgPSBmYWxzZTtcbiAgICAgIGtub2IuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID0ge1xuICAgICAgICB4OiAtb3B0aW9ucy5rbm9iU2l6ZSAvIDIsXG4gICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoICsgb3B0aW9ucy5rbm9iU2l6ZVxuICAgICAgfTtcbiAgICAgIGtub2Iub24oXCJjaGFuZ2U6eFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdpdmVNZVJhbmdlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZ2l2ZU1lUmFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmcm9tUiwgdGVtcEhvbGQsIHRvUjtcbiAgICAgIGlmIChzbGlkRnJvbS5taWRYID49IHNsaWRUby5taWRYKSB7XG4gICAgICAgIHRlbXBIb2xkID0gc2xpZFRvLm1pZFg7XG4gICAgICAgIHNsaWRUby5taWRYID0gc2xpZEZyb20ubWlkWDtcbiAgICAgICAgc2xpZEZyb20ubWlkWCA9IHRlbXBIb2xkO1xuICAgICAgfVxuICAgICAgc2xpZGVySExpZ2h0LnggPSBzbGlkRnJvbS54ICsgb3B0aW9ucy5rbm9iU2l6ZSAvIDI7XG4gICAgICBzbGlkZXJITGlnaHQud2lkdGggPSBzbGlkVG8ueCAtIHNsaWRGcm9tLng7XG4gICAgICBmcm9tUiA9IFV0aWxzLm1vZHVsYXRlKHNsaWRGcm9tLm1pZFgsIFswLCBvcHRpb25zLndpZHRoXSwgW29wdGlvbnMuZnJvbSwgb3B0aW9ucy50b10pO1xuICAgICAgdG9SID0gVXRpbHMubW9kdWxhdGUoc2xpZFRvLm1pZFgsIFswLCBvcHRpb25zLndpZHRoXSwgW29wdGlvbnMuZnJvbSwgb3B0aW9ucy50b10pO1xuICAgICAgaWYgKG9wdGlvbnMuc2hvd1ZhbHVlKSB7XG4gICAgICAgIGZyb21JbmRpY2F0b3IuaHRtbCA9IFwiXCIgKyBvcHRpb25zLmN1cnJlbmN5ICsgKE1hdGguZmxvb3IoZnJvbVIpKTtcbiAgICAgICAgdG9JbmRpY2F0b3IuaHRtbCA9IFwiXCIgKyBvcHRpb25zLmN1cnJlbmN5ICsgKE1hdGguZmxvb3IodG9SKSk7XG4gICAgICB9XG4gICAgICBvcHRpb25zLmJvdHRvbSA9IGZyb21SO1xuICAgICAgb3B0aW9ucy50b3AgPSB0b1I7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmcm9tOiBmcm9tUixcbiAgICAgICAgdG86IHRvUlxuICAgICAgfTtcbiAgICB9O1xuICAgIHRoaXMuZ29Ub1JhbmdlID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICAgIHZhciBhbmltYXRpb25BLCBhbmltYXRpb25CLCBtYXhpbXVtLCBtaW5pbXVtO1xuICAgICAgbWluaW11bSA9IFV0aWxzLm1vZHVsYXRlKG1pbiwgW29wdGlvbnMuZnJvbSwgb3B0aW9ucy50b10sIFswLCBvcHRpb25zLndpZHRoXSk7XG4gICAgICBtYXhpbXVtID0gVXRpbHMubW9kdWxhdGUobWF4LCBbb3B0aW9ucy5mcm9tLCBvcHRpb25zLnRvXSwgWzAsIG9wdGlvbnMud2lkdGhdKTtcbiAgICAgIGFuaW1hdGlvbkEgPSBuZXcgQW5pbWF0aW9uKHNsaWRGcm9tLCB7XG4gICAgICAgIG1pZFg6IG1pbmltdW0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBjdXJ2ZTogXCJlYXNlLWluLW91dFwiLFxuICAgICAgICAgIHRpbWU6IC4yXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYW5pbWF0aW9uQiA9IG5ldyBBbmltYXRpb24oc2xpZFRvLCB7XG4gICAgICAgIG1pZFg6IG1heGltdW0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBjdXJ2ZTogXCJlYXNlLWluLW91dFwiLFxuICAgICAgICAgIHRpbWU6IC4yXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYW5pbWF0aW9uQS5zdGFydCgpO1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbkIuc3RhcnQoKTtcbiAgICB9O1xuICAgIHRoaXMuZ29Ub1JhbmdlKG9wdGlvbnMuYm90dG9tLCBvcHRpb25zLnRvcCk7XG4gIH1cblxuICBSYW5nZUZpbHRlci5wcm90b3R5cGUuZ29UbyA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gICAgcmV0dXJuIHRoaXMuZ29Ub1JhbmdlKGZyb20sIHRvKTtcbiAgfTtcblxuICBSYW5nZUZpbHRlci5kZWZpbmUoJ2JvdHRvbScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ib3R0b207XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJvdHRvbSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgUmFuZ2VGaWx0ZXIuZGVmaW5lKCd0b3AnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMudG9wO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy50b3AgPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBSYW5nZUZpbHRlcjtcblxufSkoTGF5ZXIpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lMMVZ6WlhKekwzSmhaR1ZyTDBSbGMydDBiM0F2VW1GdVoyVkdhV3gwWlhKRVpXMXZMbVp5WVcxbGNpOXRiMlIxYkdWekwxSmhibWRsUm1sc2RHVnlMbU52Wm1abFpTSXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXlZV1JsYXk5RVpYTnJkRzl3TDFKaGJtZGxSbWxzZEdWeVJHVnRieTVtY21GdFpYSXZiVzlrZFd4bGN5OVNZVzVuWlVacGJIUmxjaTVqYjJabVpXVWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCT3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRkJRU3hKUVVGQk96czdRVUYxUWswc1QwRkJUeXhEUVVGRE96czdSVUZEUVN4eFFrRkJReXhQUVVGRU8wRkJRMW9zVVVGQlFUczdUVUZFWVN4VlFVRlZPenRKUVVOMlFpeEpRVUZETEVOQlFVRXNUMEZCUkN4SFFVRlhPenROUVVWWUxFOUJRVThzUTBGQlF5eFBRVUZST3pzN1RVRkRhRUlzVDBGQlR5eERRVUZETEV0QlFVMDdPenROUVVOa0xFOUJRVThzUTBGQlF5eFRRVUZWTEU5QlFVOHNRMEZCUXpzN08wMUJRekZDTEU5QlFVOHNRMEZCUXl4TlFVRlBMRTlCUVU4c1EwRkJRenM3TzAxQlIzWkNMRTlCUVU4c1EwRkJReXhqUVVGbE96czdUVUZEZGtJc1QwRkJUeXhEUVVGRExGbEJRV0U3T3p0TlFVTnlRaXhQUVVGUExFTkJRVU1zVjBGQldUczdPMDFCUTNCQ0xFOUJRVThzUTBGQlF5eGhRVUZqTEU5QlFVOHNRMEZCUXl4UlFVRlNMRWRCUVdsQ096czdUVUZEZGtNc1QwRkJUeXhEUVVGRExHRkJRV003T3p0TlFVTjBRaXhQUVVGUExFTkJRVU1zYTBKQlFXMUNPenM3VFVGRE0wSXNUMEZCVHl4RFFVRkRMR3RDUVVGdFFqczdPMDFCUXpOQ0xFOUJRVThzUTBGQlF5eFpRVUZoT3pzN1RVRkRja0lzVDBGQlR5eERRVUZETEdGQlFXTTdPenROUVVOMFFpeFBRVUZQTEVOQlFVTXNXVUZCWVRzN08wMUJRM0pDTEU5QlFVOHNRMEZCUXl4WFFVRlpPenM3VFVGSGNFSXNUMEZCVHl4RFFVRkRMRkZCUVZNN096dE5RVU5xUWl4UFFVRlBMRU5CUVVNc1UwRkJWVHM3TzAxQlEyeENMRTlCUVU4c1EwRkJReXhKUVVGTExFOUJRVThzUTBGQlF5eFJRVUZTTEVkQlFXbENPenM3VFVGRE9VSXNUMEZCVHl4RFFVRkRMRWxCUVVzc1QwRkJUeXhEUVVGRExGRkJRVklzUjBGQmFVSXNRMEZCYWtJc1IwRkJjVUlzVDBGQlR5eERRVUZETEUxQlFWSXNSMEZCWlRzN08wMUJRMnBFTEU5QlFVOHNRMEZCUXl4clFrRkJiVUk3T3p0TlFVTXpRaXhQUVVGUExFTkJRVU1zWlVGQlowSXNUMEZCVHl4RFFVRkRMRTFCUVZJc1IwRkJaVHM3U1VGRmRrTXNOa05CUVUwc1QwRkJUanRKUVV0QkxFbEJRVWNzU1VGQlF5eERRVUZCTEUxQlFVUXNTMEZCVnl4SlFVRkRMRU5CUVVFc1NVRkJXaXhKUVVGdlFpeEpRVUZETEVOQlFVRXNSMEZCUkN4TFFVRlJMRWxCUVVNc1EwRkJRU3hGUVVGb1F6dE5RVU5ETEU5QlFVOHNRMEZCUXl4VlFVRlNMRWRCUVhGQ0xFdEJRVXNzUTBGQlF5eFJRVUZPTEVOQlFXVXNUMEZCVHl4RFFVRkRMRTFCUVhaQ0xFVkJRU3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVZRc1JVRkJaU3hQUVVGUExFTkJRVU1zUlVGQmRrSXNRMEZCTDBJc1JVRkJNa1FzUTBGQlF5eERRVUZFTEVWQlFVa3NUMEZCVHl4RFFVRkRMRXRCUVZvc1EwRkJNMFE3VFVGRGNrSXNUMEZCVHl4RFFVRkRMRTlCUVZJc1IwRkJhMElzUzBGQlN5eERRVUZETEZGQlFVNHNRMEZCWlN4UFFVRlBMRU5CUVVNc1IwRkJka0lzUlVGQk5FSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJWQ3hGUVVGbExFOUJRVThzUTBGQlF5eEZRVUYyUWl4RFFVRTFRaXhGUVVGM1JDeERRVUZETEVOQlFVUXNSVUZCU1N4UFFVRlBMRU5CUVVNc1MwRkJXaXhEUVVGNFJDeEZRVVp1UWp0TFFVRkJMRTFCUVVFN1RVRkpReXhQUVVGUExFTkJRVU1zVlVGQlVpeEhRVUZ4UWp0TlFVTnlRaXhQUVVGUExFTkJRVU1zVDBGQlVpeEhRVUZyUWl4UFFVRlBMRU5CUVVNc1RVRk1NMEk3TzBsQlYwRXNXVUZCUVN4SFFVRnRRaXhKUVVGQkxFdEJRVUVzUTBGRGJFSTdUVUZCUVN4VlFVRkJMRVZCUVZrc1NVRkJXanROUVVOQkxFMUJRVUVzUlVGQlVTeEpRVUZETEVOQlFVRXNUVUZFVkR0TlFVVkJMRXRCUVVFc1JVRkJUeXhKUVVGRExFTkJRVUVzUzBGR1VqdE5RVWRCTEVOQlFVRXNSVUZCUnl4UFFVRlBMRU5CUVVNc1ZVRklXRHROUVVsQkxHVkJRVUVzUlVGQmFVSXNUMEZCVHl4RFFVRkRMRmRCU25wQ08wMUJTMEVzV1VGQlFTeEZRVUZqTEVsQlFVTXNRMEZCUVN4WlFVeG1PMHRCUkd0Q08wbEJWMjVDTEZGQlFVRXNSMEZCWlN4SlFVRkJMRXRCUVVFc1EwRkRaRHROUVVGQkxGVkJRVUVzUlVGQldTeEpRVUZhTzAxQlEwRXNUVUZCUVN4RlFVRlJMRTlCUVU4c1EwRkJReXhSUVVSb1FqdE5RVVZCTEV0QlFVRXNSVUZCVHl4UFFVRlBMRU5CUVVNc1VVRkdaanROUVVkQkxFTkJRVUVzUlVGQlJ5eERRVUZGTEU5QlFVOHNRMEZCUXl4UlFVRldMRWRCUVcxQ0xFTkJRVzVDTEVkQlFYVkNMRTlCUVU4c1EwRkJReXhOUVVGU0xFZEJRV1VzUTBGSWVrTTdUVUZKUVN4bFFVRkJMRVZCUVdsQ0xFOUJRVThzUTBGQlF5eFRRVXA2UWp0TlFVdEJMRmxCUVVFc1JVRkJZeXhQUVVGUExFTkJRVU1zVlVGTWRFSTdUVUZOUVN4WFFVRkJMRVZCUVdFc1QwRkJUeXhEUVVGRExGVkJUbkpDTzAxQlQwRXNWMEZCUVN4RlFVRmhMRTlCUVU4c1EwRkJReXhsUVZCeVFqdE5RVkZCTEU5QlFVRXNSVUZCVXl4RlFWSlVPMDFCVTBFc1ZVRkJRU3hGUVVGWkxFVkJWRm83VFVGVlFTeFhRVUZCTEVWQlFXRXNUMEZCVHl4RFFVRkRMR1ZCVm5KQ08wdEJSR003U1VGaFppeE5RVUZCTEVkQlFXRXNTVUZCUVN4TFFVRkJMRU5CUTFvN1RVRkJRU3hWUVVGQkxFVkJRVmtzU1VGQldqdE5RVU5CTEUxQlFVRXNSVUZCVVN4UFFVRlBMRU5CUVVNc1VVRkVhRUk3VFVGRlFTeExRVUZCTEVWQlFVOHNUMEZCVHl4RFFVRkRMRkZCUm1ZN1RVRkhRU3hEUVVGQkxFVkJRVWNzUTBGQlJTeFBRVUZQTEVOQlFVTXNVVUZCVml4SFFVRnRRaXhEUVVGdVFpeEhRVUYxUWl4UFFVRlBMRU5CUVVNc1RVRkJVaXhIUVVGbExFTkJTSHBETzAxQlNVRXNaVUZCUVN4RlFVRnBRaXhQUVVGUExFTkJRVU1zVTBGS2VrSTdUVUZMUVN4WlFVRkJMRVZCUVdNc1QwRkJUeXhEUVVGRExGVkJUSFJDTzAxQlRVRXNWMEZCUVN4RlFVRmhMRTlCUVU4c1EwRkJReXhWUVU1eVFqdE5RVTlCTEZkQlFVRXNSVUZCWVN4UFFVRlBMRU5CUVVNc1pVRlFja0k3VFVGUlFTeFBRVUZCTEVWQlFWTXNSVUZTVkR0TlFWTkJMRlZCUVVFc1JVRkJXU3hGUVZSYU8wMUJWVUVzVjBGQlFTeEZRVUZoTEU5QlFVOHNRMEZCUXl4bFFWWnlRanRMUVVSWk8wbEJaMEppTEVsQlFVY3NUMEZCVHl4RFFVRkRMRk5CUVZnN1RVRkRReXhoUVVGQkxFZEJRVzlDTEVsQlFVRXNTMEZCUVN4RFFVTnVRanRSUVVGQkxGVkJRVUVzUlVGQldTeFJRVUZhTzFGQlEwRXNUVUZCUVN4RlFVRlJMRVZCUkZJN1VVRkZRU3hMUVVGQkxFVkJRVThzUjBGR1VEdFJRVWRCTEVOQlFVRXNSVUZCUnl4RFFVRkZMRWRCUVVZc1IwRkJUU3hEUVVGT0xFZEJRVlVzVDBGQlR5eERRVUZETEZGQlFWSXNSMEZCYVVJc1EwRklPVUk3VVVGSlFTeERRVUZCTEVWQlFVY3NRMEZCUlN4RlFVcE1PMUZCUzBFc1pVRkJRU3hGUVVGcFFpeEpRVXhxUWp0UlFVMUJMRXRCUVVFc1JVRkRRenRWUVVGQkxGZEJRVUVzUlVGQll5eFJRVUZrTzFWQlEwRXNWVUZCUVN4RlFVRmhMRTlCUVU4c1EwRkJReXhUUVVSeVFqdFZRVVZCTEU5QlFVRXNSVUZCVlN4UFFVRlBMRU5CUVVNc1ZVRkdiRUk3VTBGUVJEdFBRVVJ0UWp0TlFWbHdRaXhYUVVGQkxFZEJRV3RDTEVsQlFVRXNTMEZCUVN4RFFVTnFRanRSUVVGQkxGVkJRVUVzUlVGQldTeE5RVUZhTzFGQlEwRXNUVUZCUVN4RlFVRlJMRVZCUkZJN1VVRkZRU3hMUVVGQkxFVkJRVThzUjBGR1VEdFJRVWRCTEVOQlFVRXNSVUZCUnl4RFFVRkZMRWRCUVVZc1IwRkJUU3hEUVVGT0xFZEJRVlVzVDBGQlR5eERRVUZETEZGQlFWSXNSMEZCYVVJc1EwRklPVUk3VVVGSlFTeERRVUZCTEVWQlFVY3NRMEZCUlN4RlFVcE1PMUZCUzBFc1pVRkJRU3hGUVVGcFFpeEpRVXhxUWp0UlFVMUJMRXRCUVVFc1JVRkRRenRWUVVGQkxGZEJRVUVzUlVGQll5eFJRVUZrTzFWQlEwRXNWVUZCUVN4RlFVRmhMRTlCUVU4c1EwRkJReXhUUVVSeVFqdFZRVVZCTEU5QlFVRXNSVUZCVlN4UFFVRlBMRU5CUVVNc1ZVRkdiRUk3VTBGUVJEdFBRVVJwUWl4RlFXSnVRanM3UVVFMlFrRTdRVUZCUVN4VFFVRkJMRFpEUVVGQk96dE5RVU5ETEVsQlFVa3NRMEZCUXl4VFFVRk1MRWRCUVdsQ08wMUJRMnBDTEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1VVRkJaaXhIUVVFd1FqdE5RVU14UWl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExGRkJRV1lzUjBGQk1FSTdUVUZETVVJc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZtTEVkQlFUQkNPMDFCUXpGQ0xFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNUVUZCWml4SFFVRjNRanROUVVkNFFpeEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRmRCUVdZc1IwRkRRenRSUVVGQkxFTkJRVUVzUlVGQlJ5eERRVUZGTEU5QlFVOHNRMEZCUXl4UlFVRldMRWRCUVcxQ0xFTkJRWFJDTzFGQlEwRXNTMEZCUVN4RlFVRlBMRTlCUVU4c1EwRkJReXhMUVVGU0xFZEJRV2RDTEU5QlFVOHNRMEZCUXl4UlFVUXZRanM3VFVGTFJDeEpRVUZKTEVOQlFVTXNSVUZCVEN4RFFVRlJMRlZCUVZJc1JVRkJiMElzVTBGQlFUdGxRVU51UWl4WFFVRkJMRU5CUVVFN1RVRkViVUlzUTBGQmNFSTdRVUZrUkR0SlFYRkNRU3hYUVVGQkxFZEJRV01zVTBGQlFUdEJRVVZpTEZWQlFVRTdUVUZCUVN4SlFVRkpMRkZCUVZFc1EwRkJReXhKUVVGVUxFbEJRV2xDTEUxQlFVMHNRMEZCUXl4SlFVRTFRanRSUVVORExGRkJRVUVzUjBGQlZ5eE5RVUZOTEVOQlFVTTdVVUZEYkVJc1RVRkJUU3hEUVVGRExFbEJRVkFzUjBGQll5eFJRVUZSTEVOQlFVTTdVVUZEZGtJc1VVRkJVU3hEUVVGRExFbEJRVlFzUjBGQlowSXNVMEZJYWtJN08wMUJUVUVzV1VGQldTeERRVUZETEVOQlFXSXNSMEZCYVVJc1VVRkJVU3hEUVVGRExFTkJRVlFzUjBGQllTeFBRVUZQTEVOQlFVTXNVVUZCVWl4SFFVRnBRanROUVVNdlF5eFpRVUZaTEVOQlFVTXNTMEZCWWl4SFFVRnhRaXhOUVVGTkxFTkJRVU1zUTBGQlVDeEhRVUZYTEZGQlFWRXNRMEZCUXp0TlFVbDZReXhMUVVGQkxFZEJRVkVzUzBGQlN5eERRVUZETEZGQlFVNHNRMEZCWlN4UlFVRlJMRU5CUVVNc1NVRkJlRUlzUlVGQk9FSXNRMEZCUXl4RFFVRkVMRVZCUVVrc1QwRkJUeXhEUVVGRExFdEJRVm9zUTBGQk9VSXNSVUZCYTBRc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlZDeEZRVUZsTEU5QlFVOHNRMEZCUXl4RlFVRjJRaXhEUVVGc1JEdE5RVU5TTEVkQlFVRXNSMEZCVFN4TFFVRkxMRU5CUVVNc1VVRkJUaXhEUVVGbExFMUJRVTBzUTBGQlF5eEpRVUYwUWl4RlFVRTBRaXhEUVVGRExFTkJRVVFzUlVGQlNTeFBRVUZQTEVOQlFVTXNTMEZCV2l4RFFVRTFRaXhGUVVGblJDeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRlVMRVZCUVdVc1QwRkJUeXhEUVVGRExFVkJRWFpDTEVOQlFXaEVPMDFCUjA0c1NVRkJSeXhQUVVGUExFTkJRVU1zVTBGQldEdFJRVU5ETEdGQlFXRXNRMEZCUXl4SlFVRmtMRWRCUVhGQ0xFVkJRVUVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNVVUZCV0N4SFFVRnhRaXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZNTEVOQlFWY3NTMEZCV0N4RFFVRkVPMUZCUXpGRExGZEJRVmNzUTBGQlF5eEpRVUZhTEVkQlFXMUNMRVZCUVVFc1IwRkJSeXhQUVVGUExFTkJRVU1zVVVGQldDeEhRVUZ4UWl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTUxFTkJRVmNzUjBGQldDeERRVUZFTEVWQlJucERPenROUVUxQkxFOUJRVThzUTBGQlF5eE5RVUZTTEVkQlFXbENPMDFCUTJwQ0xFOUJRVThzUTBGQlF5eEhRVUZTTEVkQlFXTTdRVUZIWkN4aFFVRlBPMUZCUVVNc1NVRkJRU3hGUVVGTkxFdEJRVkE3VVVGQll5eEZRVUZCTEVWQlFVa3NSMEZCYkVJN08wbEJNMEpOTzBsQmFVTmtMRWxCUVVNc1EwRkJRU3hUUVVGRUxFZEJRV0VzVTBGQlF5eEhRVUZFTEVWQlFVMHNSMEZCVGp0QlFVTmFMRlZCUVVFN1RVRkJRU3hQUVVGQkxFZEJRVlVzUzBGQlN5eERRVUZETEZGQlFVNHNRMEZCWlN4SFFVRm1MRVZCUVc5Q0xFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFWUXNSVUZCWlN4UFFVRlBMRU5CUVVNc1JVRkJka0lzUTBGQmNFSXNSVUZCWjBRc1EwRkJReXhEUVVGRUxFVkJRVWtzVDBGQlR5eERRVUZETEV0QlFWb3NRMEZCYUVRN1RVRkRWaXhQUVVGQkxFZEJRVlVzUzBGQlN5eERRVUZETEZGQlFVNHNRMEZCWlN4SFFVRm1MRVZCUVc5Q0xFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFWUXNSVUZCWlN4UFFVRlBMRU5CUVVNc1JVRkJka0lzUTBGQmNFSXNSVUZCWjBRc1EwRkJReXhEUVVGRUxFVkJRVWtzVDBGQlR5eERRVUZETEV0QlFWb3NRMEZCYUVRN1RVRkZWaXhWUVVGQkxFZEJRV2xDTEVsQlFVRXNVMEZCUVN4RFFVRlZMRkZCUVZZc1JVRkRhRUk3VVVGQlFTeEpRVUZCTEVWQlFVMHNUMEZCVGp0UlFVTkJMRTlCUVVFc1JVRkRRenRWUVVGQkxFdEJRVUVzUlVGQlR5eGhRVUZRTzFWQlEwRXNTVUZCUVN4RlFVRk5MRVZCUkU0N1UwRkdSRHRQUVVSblFqdE5RVTFxUWl4VlFVRkJMRWRCUVdsQ0xFbEJRVUVzVTBGQlFTeERRVUZWTEUxQlFWWXNSVUZEYUVJN1VVRkJRU3hKUVVGQkxFVkJRVTBzVDBGQlRqdFJRVU5CTEU5QlFVRXNSVUZEUXp0VlFVRkJMRXRCUVVFc1JVRkJUeXhoUVVGUU8xVkJRMEVzU1VGQlFTeEZRVUZOTEVWQlJFNDdVMEZHUkR0UFFVUm5RanROUVUxcVFpeFZRVUZWTEVOQlFVTXNTMEZCV0N4RFFVRkJPMkZCUTBFc1ZVRkJWU3hEUVVGRExFdEJRVmdzUTBGQlFUdEpRV3BDV1R0SlFXMUNZaXhKUVVGRExFTkJRVUVzVTBGQlJDeERRVUZYTEU5QlFVOHNRMEZCUXl4TlFVRnVRaXhGUVVFeVFpeFBRVUZQTEVOQlFVTXNSMEZCYmtNN1JVRXpURms3TzNkQ1FXZE5ZaXhKUVVGQkxFZEJRVTBzVTBGQlF5eEpRVUZFTEVWQlFVOHNSVUZCVUR0WFFVTk1MRWxCUVVNc1EwRkJRU3hUUVVGRUxFTkJRVmNzU1VGQldDeEZRVUZwUWl4RlFVRnFRanRGUVVSTE96dEZRVTlPTEZkQlFVTXNRMEZCUVN4TlFVRkVMRU5CUVZFc1VVRkJVaXhGUVVORE8wbEJRVUVzUjBGQlFTeEZRVUZMTEZOQlFVRTdZVUZEU2l4SlFVRkRMRU5CUVVFc1QwRkJUeXhEUVVGRE8wbEJSRXdzUTBGQlREdEpRVVZCTEVkQlFVRXNSVUZCU3l4VFFVRkRMRXRCUVVRN1lVRkRTaXhKUVVGRExFTkJRVUVzVDBGQlR5eERRVUZETEUxQlFWUXNSMEZCYTBJN1NVRkVaQ3hEUVVaTU8wZEJSRVE3TzBWQlMwRXNWMEZCUXl4RFFVRkJMRTFCUVVRc1EwRkJVU3hMUVVGU0xFVkJRME03U1VGQlFTeEhRVUZCTEVWQlFVc3NVMEZCUVR0aFFVTktMRWxCUVVNc1EwRkJRU3hQUVVGUExFTkJRVU03U1VGRVRDeERRVUZNTzBsQlJVRXNSMEZCUVN4RlFVRkxMRk5CUVVNc1MwRkJSRHRoUVVOS0xFbEJRVU1zUTBGQlFTeFBRVUZQTEVOQlFVTXNSMEZCVkN4SFFVRmxPMGxCUkZnc1EwRkdURHRIUVVSRU96czdPMGRCTjAxcFF5SjlcbiJdfQ==