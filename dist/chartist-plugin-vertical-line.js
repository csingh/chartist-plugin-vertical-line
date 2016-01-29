(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['Chartist.plugins.verticalLine'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.verticalLine'] = factory();
  }
}(this, function () {

/**
 * Chartist.js plugin to insert vertical line in a line chart.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  var defaultOptions = {
    position: undefined,
    label: undefined,
    className: 'vertical-line'
  };

  var VerticalLine = function (chart, chartRect, options) {

    var labelClassName = options.className + '-label';

    var $label = $('<span class="' + labelClassName + '" style="position: absolute"></span>')
        .appendTo(chart.container);

    this.show = function (pos) {

      var l = pos.left[0] + (pos.left[1] - pos.left[0])/2;
      var r = pos.right[0] + (pos.right[1] - pos.right[0])/2; 

      console.log('pos:', pos);
      console.log('l:', l);
      console.log('r:', r);

      $label
        .html(options.label || '')
        .css({ left: l + (r - l)/2 - $label.width()/2 })
        .show();

      chart.svg.elem('line', {
        x1: l,
        x2: l,
        y1: chartRect.y1,
        y2: chartRect.y2 + $label.height()
      }, options.className);

      chart.svg.elem('line', {
        x1: r,
        x2: r,
        y1: chartRect.y1,
        y2: chartRect.y2 + $label.height()
      }, options.className);

    };
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.verticalLine = function (options) {

    options = Chartist.extend({}, defaultOptions, options);

    return function (chart) {

      if (!(chart instanceof Chartist.Line)) {
        return;
      }

      var position = {};
      position.left = [0,0];
      position.right = [0,0];

      chart.on('draw', function (data) {
        if (data.type === 'point') {
          if (data.index === options.left[0]) {
            position.left[0] = data.x;
          } 
          if (data.index === options.left[1]) {
            position.left[1] = data.x;
          } 
          if (data.index === options.right[0]) {
            position.right[0] = data.x;
          } 
          if (data.index === options.right[1]) {
            position.right[1] = data.x;
          }
        }
      });

      console.log('position:', position);
      console.log('options:', options);

      chart.on('created', function (data) {
        var verticalLine = new VerticalLine(chart, data.chartRect, options);
        verticalLine.show(position);
      });

    };
  };

}(window, document, Chartist));

return Chartist.plugins.verticalLine;

}));
