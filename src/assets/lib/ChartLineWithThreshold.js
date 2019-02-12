import Chart from '../../../node_modules/chart.js/src/chart';

const THRESHOLD_COLOR = 'red';

const ChartLineWithThreshold = {
    addElements: function() {
        Chart.controllers.bubble.prototype.addElements.call(this);
    },
    addElementAndReset: function(index) {
        Chart.controllers.bubble.prototype.addElementAndReset.call(this, index);
    },
    draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);
        drawThreshold.call(this);
        markAllExceedThresholdPoints.call(this);
    },
    removeHoverStyle: function(element) {
        Chart.controllers.line.prototype.removeHoverStyle.call(this, element);
    },
    setHoverStyle: function(element) {
        Chart.controllers.line.prototype.setHoverStyle.call(this, element);
    },
    update: function(reset) {
        Chart.controllers.line.prototype.update.call(this, reset);
    },
};

export default ChartLineWithThreshold;

function drawThreshold() {
    const thresholdValue = this.chart.options.threshold;
    const thresholdY = this.chart.scales['y-axis-0'].getPixelForValue(thresholdValue);

    addRedDashedLine(this.chart.ctx,
        thresholdY,
        this.chart.chartArea.left,
        this.chart.chartArea.right
    );
}

function markAllExceedThresholdPoints() {
    const thresholdValue = this.chart.options.threshold;

    var ctx = this.chart.ctx;
    const dataSets = this.chart.data.datasets;
    let _metaData;
    let _meta;
    let pt;

    dataSets.forEach((dataset) => {
        _meta = dataset._meta[Object.keys(dataset._meta)[0]];
        if(_meta.$filler.visible) {
            _metaData = _meta.data;
            dataset.data.forEach((currData, j) => {
                if (currData > thresholdValue) {
                    pt = _metaData[j];
                    addRedCircle(ctx, pt._view.x, pt._view.y, pt._view.radius);
                }
            });
        }
    });
}

function addRedDashedLine(ctx, y, startX, endX) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 15]);
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.closePath();
    ctx.stroke();
}
function addRedCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.strokeStyle = THRESHOLD_COLOR;
    ctx.fillStyle = THRESHOLD_COLOR;
    ctx.lineWidth = 1;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

