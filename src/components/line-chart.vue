<!--suppress ALL -->
<template>
    <div class="line-chart">
        <canvas id="chart" ref="chart" class="canvas"  width="1600" height="400"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    import { map } from 'lodash';

    const lineColors = [
        '#0512ff',
        '#ff8e06',
        '#04ff4a',
        '#fc0dff',
        '#fcff03',
        '#07b4ff',
    ];

    export default {
        name: 'line-chart',
        components: {
        },
        props: {
            data: {
                type: Array,
                required: true,
            },
            xAxis: {
                type: String,
                required: true,
            },
            yAxis: {
                type: Array,
                required: true,
            },
            dataPoints: {
                type: Number,
                default: 10,
            },
            threshold: {
                type: Number,
            },
        },
        data() {
            return {
                points: [],
                minX: 40,
            };
        },
        computed: {
            labels() {
                return map(this.data, this.xAxis);
            },
            datasets: function () {
                let data;
                let allDataSets = this.yAxis.map((yAxisKey, i) => {
                    data = map(this.data, yAxisKey);
                    return {
                        label: yAxisKey,
                        borderColor: lineColors[i],
                        backgroundColor: lineColors[i],
                        fill: false,
                        data: data,
                    };
                });
                return allDataSets;
            },
        },
        mounted() {
            Chart.defaults.lineWithThreshold = Chart.defaults.line;
            var custom = Chart.controllers.line.extend({
                addElements: function() {
                    Chart.controllers.bubble.prototype.addElements.call(this);
                },
                addElementAndReset: function(index) {
                    Chart.controllers.bubble.prototype.addElementAndReset.call(this, index);
                },
                draw: function(ease) {
                    Chart.controllers.line.prototype.draw.call(this, ease);
                    drawThreshold.call(this);
                    markAllEcxeedThresholdPoints.call(this);
                    // Now we can do some custom drawing for this dataset. Here we'll draw a red box around the first point in each dataset



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
            });
            Chart.controllers.lineWithThreshold = custom;

            this.ctx = this.$refs.chart.getContext('2d');
            this.createChartLine();
        },
        methods: {
            createChartLine() {
                if(this.chartLine) {
                    this.chartLine.destroy();
                }
                this.chartLine = new Chart(this.ctx, {
                    type: 'lineWithThreshold',
                    data: {
                        labels: this.labels,
                        datasets: this.datasets,
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        threshold: this.threshold,
                    },
                });
            },
        },
        watch: {
            threshold() {
                this.createChartLine();
            },
            dataPoints() {
                this.createChartLine();
            },
        }
    }

    function drawThreshold() {
        const thresholdValue = this.chart.options.threshold;
        var ctx = this.chart.ctx;

        const thresholdY = this.chart.scales['y-axis-0'].getPixelForValue(thresholdValue);

        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.setLineDash([5, 15]);
        ctx.moveTo(this.chart.chartArea.left, thresholdY);
        ctx.lineTo(this.chart.chartArea.right, thresholdY);
        ctx.closePath();
        ctx.stroke();
        ctx.save();
    }
    function markAllEcxeedThresholdPoints() {
        const thresholdValue = this.chart.options.threshold;

        var ctx = this.chart.ctx;
        const datasets = this.chart.data.datasets;
        let _metaData;
        let _meta;
        let pt;
        let radius;
        datasets.forEach((dataset) => {
            _meta = dataset._meta[Object.keys(dataset._meta)[0]];
            if(_meta.$filler.visible) {
                _metaData = _meta.data;
                dataset.data.forEach((currData, j) => {
                    if (currData > thresholdValue) {
                        pt = _metaData[j];
                        radius = pt._view.radius;

                        ctx.beginPath();
                        ctx.strokeStyle = 'red';
                        ctx.fillStyle = 'red';
                        ctx.lineWidth = 1;
                        ctx.arc(pt._view.x, pt._view.y, radius, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }
                });
            }
        });
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
