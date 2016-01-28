# Vertical Line plugin for Chartist.js

[![Build Status](https://travis-ci.org/zubenkoivan/chartist-plugin-vertical-line.svg?branch=master)](https://travis-ci.org/zubenkoivan/chartist-plugin-vertical-line)

This is a simple plugin for Chartist.js that will allow you to draw lines around 2 vertical lines around a graph segment, and label it.

Note: This is just a modified version of [chartist-plugin-vertical-line](https://github.com/zubenkoivan/chartist-plugin-vertical-line), so thanks to @[zubenkoivan](https://github.com/zubenkoivan) for the original code!

Please visit http://gionkunz.github.io/chartist-js/plugins.html for more information.

## Available options and their defaults

```javascript
var defaultOptions = {
  line_positions: undefined,
  label: undefined,
  className: 'vertical-line'
};
```

## Sample usage in Chartist.js

(Note: Check out demo/index.html for a full example)

```javascript
var chart = new Chartist.Line('.ct-chart', {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
}, {
  plugins:
    Chartist.plugins.verticalLine({
      line_positions: [0,1],
      label: "Label 1",
    })
  ]
});
```
