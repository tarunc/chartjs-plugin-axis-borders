(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'chart.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('chart.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.chart);
    global.chartjsAxisBorders = mod.exports;
  }
})(this, function (exports, _chart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _chart2 = _interopRequireDefault(_chart);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Chart = typeof _chart2.default === 'function' ? _chart2.default : window.Chart; // Import chart.js


  var ChartJSHelpers = Chart.helpers;

  var defaultOptions = {
    lineWidth: 2,
    strokeStyle: '#979797'
  };

  // Create the plugin
  var chartjsBorders = {
    id: 'axisborders',
    defaultOptions: defaultOptions,
    afterDraw: function afterDraw(chartInstance) {
      var options = chartInstance.options.axisBorders;
      if (!options || !options.enabled) {
        return;
      }

      var context = chartInstance.ctx;
      context.save();

      context.lineWidth = ChartJSHelpers.getValueOrDefault(options.lineWidth, this.defaultOptions.lineWidth);
      context.strokeStyle = ChartJSHelpers.getValueOrDefault(options.strokeStyle, this.defaultOptions.strokeStyle);
      ChartJSHelpers.each(chartInstance.scales, function (scale) {
        var me = scale;
        var x1 = me.left;
        var x2 = me.right;
        var y1 = me.top;
        var y2 = me.bottom;
        var isHorizontal = me.isHorizontal();
        var options = me.options;

        var aliasPixel = ChartJSHelpers.aliasPixel(context.lineWidth);
        if (isHorizontal) {
          y1 = y2 = options.position === 'top' ? me.bottom : me.top;
          y1 += aliasPixel;
          y2 += aliasPixel;
        } else {
          x1 = x2 = options.position === 'left' ? me.right : me.left;
          x1 += aliasPixel;
          x2 += aliasPixel;
        }

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      });

      context.restore();
    }
  };

  // Register the plugin
  Chart.pluginService.register(chartjsBorders);

  // Export the plugin
  exports.default = chartjsBorders;
});