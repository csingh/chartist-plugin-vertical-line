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

    this.show = function (l, r) {

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

      chart.on('draw', function (data) {
        if (data.type === 'point') {
          if (data.index === options.line_positions[0]) {
            position.left = data.x;
          } else if (data.index === options.line_positions[1]) {
            position.right = data.x;
          }
        }
      });

      chart.on('created', function (data) {
        var verticalLine = new VerticalLine(chart, data.chartRect, options);
        verticalLine.show(position.left, position.right);
      });

    };
  };

}(window, document, Chartist));
