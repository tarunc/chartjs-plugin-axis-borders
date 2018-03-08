// Import chart.js
import ChartJS from 'chart.js';
import ChartJSHelpers from 'chart.js/src/helpers';
const Chart = (typeof(ChartJS) === 'function' ? ChartJS : window.Chart);

const defaultOptions = {
  lineWidth: 2,
  strokeStyle: '#979797'
};

// Create the plugin
const chartjsBorders = {
  defaultOptions,
  afterDraw(chartInstance) {
    const options = chartInstance.options.axisBorders;
    if (!options || !options.enabled) {
      return;
    }

    const context = chartInstance.ctx;
    context.save();

    context.lineWidth = ChartJSHelpers.getValueOrDefault(options.lineWidth, this.defaultOptions.lineWidth);
    context.strokeStyle = ChartJSHelpers.getValueOrDefault(options.strokeStyle, this.defaultOptions.strokeStyle);
    ChartJSHelpers.each(chart.scales, scale => {
      const me = scale;
      let x1 = me.left;
      let x2 = me.right;
      let y1 = me.top;
      let y2 = me.bottom;
      const isHorizontal = me.isHorizontal();
      const options = me.options;

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
export default chartjsBorders;
