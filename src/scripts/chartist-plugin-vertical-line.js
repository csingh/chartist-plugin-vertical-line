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

    // delete old labels
    $('.' + labelClassName).remove();

    var $label = $('<span class="' + labelClassName + '" style="position: absolute"></span>')
        .appendTo(chart.container);

    this.show = function (pos) {

      var l = pos.left[0] + (pos.left[1] - pos.left[0])/2;
      var r = pos.right[0] + (pos.right[1] - pos.right[0])/2; 

      $label
        .html(options.label || '')
        .css({ top: '-10px', left: l + (r - l)/2 - $label.width()/2 })
        .show();

      chart.svg.elem('line', {
        x1: l,
        x2: l,
        y1: chartRect.y1,
        y2: chartRect.y2
      }, options.className);

      chart.svg.elem('line', {
        x1: r,
        x2: r,
        y1: chartRect.y1,
        y2: chartRect.y2
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

      chart.on('created', function (data) {
        var verticalLine = new VerticalLine(chart, data.chartRect, options);
        verticalLine.show(position);
      });

    };
  };

}(window, document, Chartist));
