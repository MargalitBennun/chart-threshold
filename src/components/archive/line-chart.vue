<!--suppress ALL -->
<template>
    <div class="line-chart">
        <canvas id="chart" ref="chart" class="canvas"  width="800" height="400" @mouseenter="onMouseEnter"></canvas>
    </div>
</template>

<script>

    const lineColors = [
        '#0512ff',
        '#ff8e06',
        '#FF0D26',
        '#fc0dff',
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
            chartHeight() {
                return this.$refs.chart.height;
            },
            chartWidth() {
                return this.$refs.chart.width;
            },
        },
        mounted() {
            this.ctx = this.ctx || this.$refs.chart.getContext("2d");
            this.calculateSettings(this.data, this.yAxis, 30);
            this.drawHorizontalLines(10);
            this.yAxis.forEach((key, i) => {
                this.drawDataLine(this.data, key, lineColors[i]);
            });
        },
        methods: {
            calculateSettings(data, yAxis, heightUnitsNum) {
                const minMax = this.getMinMaxPoints(data, yAxis)
                this.minPoint = minMax.min;
                this.maxPoint = minMax.max;
                const range = this.maxPoint - this.minPoint;
                this.divider = range / this.chartHeight;
                this.heightUnit = (this.chartHeight / heightUnitsNum) * this.divider;
            },
            getMinMaxPoints(data, yAxises) {
                return data.reduce((minMax, currObj) =>  {
                    return yAxises.reduce((minMax, currYAxis) => {
                        return {
                            min: Math.min(minMax.min || currObj[currYAxis], currObj[currYAxis]),
                            max: Math.max(minMax.max || currObj[currYAxis], currObj[currYAxis]),
                        };
                    }, minMax)
                });
            },
            drawDataLine(data, yAxis, color) {
                const dataPoints = data.length;
                const width = this.chartWidth - this.minX;
                let x = 0;
                let point;
                let y = this.getFixedY(data[0][yAxis]);

                this.ctx.beginPath();
                this.ctx.strokeStyle = color;

                this.ctx.moveTo(this.minX, y);

                for(let i = 1; i < data.length; i++) {
                    x = this.minX + ((width / dataPoints) * i);
                    y = this.getFixedY(data[i][yAxis]);
                    point = this.addDataPoint(x, y);
                    point.data = data[i];
                    this.points.push(point);
                    this.ctx.lineTo(x, y);
                }
                this.ctx.stroke();
            },
            drawHorizontalLines(linesNumber) {
                const height = this.chartHeight;
                const width = this.chartWidth;
                const shortThousands = this.minPoint >= 1000 && this.maxPoint >= 10000;
                let y;

                this.ctx.beginPath();
                for(let i = linesNumber; i > 1; i--) {
                    y = (height / linesNumber) * i;
                    const value = this.minPoint + (this.heightUnit * Math.abs(i - 10));
                    this.ctx.fillText(this.formatNumber(value, shortThousands), 0, y);
                    this.ctx.moveTo(this.minX, y);
                    this.ctx.lineTo(width, y);
                }
                this.ctx.stroke();
            },
            getFixedY(y) {
                let fixedY = (y - this.minPoint) / this.divider;
                fixedY = this.chartHeight - fixedY;
                return parseInt(fixedY, 10);
            },
            formatNumber: function (num) {
                const isShortNumber = num >= 1000;
                let shortNum = isShortNumber ? parseInt(num / 1000, 10) : num % 1 === 0 ? num : num.toFixed(2);
                const formartNumber = shortNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return isShortNumber ? `${formartNumber}k` : formartNumber;
            },
            addDataPoint: function (_x, _y) {
                let x = parseInt(_x, 10);
                let y = parseInt(_y, 10);
                this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
                return {x, y};
            },
            onMouseEnter: function (e) {
                console.log(this.ctx.canvas.clientLeft, this.ctx.canvas.clientTop);
                const x = e.clientX;
                const y = e.clientY;
                this.points.forEach(point => {
                    if (point.x === x && point.y === y) {
                        console.log('data point', point);
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .canvas {
        width: 100%;
        height: 100%;
        color: #5539ff;
    }
</style>
