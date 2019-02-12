<!--suppress ALL -->
<template>
    <div class="line-chart">
        <canvas id="chart" ref="chart" class="canvas"  width="1600" height="400"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    import ChartLineWithThreshold from '../assets/ChartLineWithThreshold';
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
                required: true,
            },
            threshold: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
            };
        },
        computed: {
            labels() {
                return map(this.data, this.xAxis);
            },
            datasets: function () {
                let allDataSets = this.yAxis.map((yAxisKey, i) => {
                    return {
                        label: yAxisKey,
                        borderColor: lineColors[i],
                        backgroundColor: lineColors[i],
                        fill: false,
                        data: map(this.data, yAxisKey),
                    };
                });
                return allDataSets;
            },
        },
        mounted() {
            Chart.defaults.lineWithThreshold = Chart.defaults.line;
            var custom = Chart.controllers.line.extend(ChartLineWithThreshold);
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
