<template>
    <div class="chart-container">
        <div class="configuration">
            <input-field
                    label="Threshold:"
                    type="number"
                    :value="thresholdStr"
                    :min="minThreshold"
                    :max="maxThreshold"
                    placeholder="Enter threshold value"
                    @change="onThresholdChange"
                    @error="onInputError"></input-field>

            <input-field
                    label="Data points:"
                    type="number"
                    :value="dataPointsStr"
                    :min="minDataPoints"
                    :max="maxDataPoints"
                    placeholder="Enter data points to display"
                    @change="onDataPointsChange"
                    @error="onInputError"></input-field>

            <div v-for="dataSource in dataSources" class="radio-container" :key="dataSource.id">
                <input type="radio" :id="dataSource.id" :value="dataSource.id" v-model="dataSourceIndex" @change="onSourceChange">
                <label :for="dataSource.id">{{ dataSource.description }}</label>
            </div>
        </div>
        <line-chart
                v-if="hasData"
                :data="chartData"
                :yAxis="yAxis"
                :xAxis="xAxis"
                :threshold="threshold"
                :dataPoints="dataPoints"></line-chart>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import { GETTER_TYPES } from "../store/getters";
    import { MUTATION_TYPES } from "../store/mutations";
    import { ACTION_TYPES } from "../store/actions";
    import DATA_SOURCES from '../assets/DATA_SOURCES';
    import lineChart from './line-chart';
    import inputField from './input-field';
    import {getArrMax, getArrMin, joinAllValues} from '../assets/utils';
    import {STATES} from "../store/state";

    const mapGetters = Vuex.mapGetters;
    const mapMutations = Vuex.mapMutations;
    const mapActions = Vuex.mapActions;

    export default {
        name: 'chart-container',
        components: {
            lineChart,
            inputField,
        },
        data() {
            return {
                dataSources: DATA_SOURCES,
                dataSourceIndex: 0
            };
        },
        computed: {
            ...mapGetters({
                chartData: GETTER_TYPES.GET_DATA,
                chartFullData: GETTER_TYPES.GET_FULL_DATA,
                chartDataSource: GETTER_TYPES.GET_DATA_SOURCE,
                threshold: GETTER_TYPES.GET_THRESHOLD,
                dataPoints: GETTER_TYPES.GET_DATA_POINTS,
                dataState: GETTER_TYPES.GET_DATA_STATE,
                error: GETTER_TYPES.GET_ERROR,
            }),
            yAxis() {
                return this.chartDataSource.yAxis;
            },
            xAxis() {
                return this.chartDataSource.xAxis;
            },
            joinedValues() {
                return joinAllValues(this.chartData, this.yAxis);
            },
            hasData() {
                return this.chartData && this.chartData.length > 0;
            },
            thresholdStr() {
                return this.threshold + '';
            },
            minThreshold() {
                return getArrMin(this.joinedValues);
            },
            maxThreshold() {
                return getArrMax(this.joinedValues);
            },
            dataPointsStr() {
                return this.dataPoints + '';
            },
            minDataPoints() {
                return 2;
            },
            maxDataPoints() {
                return this.chartFullData.length;
            },

        },
        methods: {
            ...mapMutations({
                'setThreshold': MUTATION_TYPES.SET_THRESHOLD,
                'setDataPoints': MUTATION_TYPES.SET_DATA_POINTS,
                'setDataSource': MUTATION_TYPES.SET_DATA_SOURCE,
            }),
            ...mapActions({
                'fetchData': ACTION_TYPES.FETCH_DATA,
            }),
            onThresholdChange(value) {
                const threshold = parseFloat(value);
                this.setThreshold(threshold);
            },
            onDataPointsChange(value) {
                const dataPoints = parseInt(value, 10);
                this.setDataPoints(dataPoints);
            },
            onSourceChange(event) {
                this.setDataSource(parseInt(event.target.value, 10));
                this.fetchData();
            },
            onInputError(err) {
                this.addErrorNotification('Input Error', err);
            },
            addErrorNotification(title, text) {
                this.$notify({
                    group: 'systemNotifications',
                    title: title,
                    text: text,
                    position: 'top center',
                    type: 'error',
                });
            }
        },
        watch: {
            dataState: {
                immediate: true,
                handler(newState) {
                    if(newState === STATES.ERROR) {
                        this.addErrorNotification('System Error', this.error);
                    }
                },
            },
        },
    }
</script>

<style scoped>
    .chart-container {
        position: relative;
    }
    .radio-container {
        display: inline-block;
        padding: 10px 20px;
        color: #3104af;
        font-weight: bold;
        cursor: pointer;
    }
    .radio-container label, .radio-container input {
        cursor: pointer;
    }
    .configuration {
        background-color: #efdff3;
        display: inline-block;
        margin-bottom: 40px;
    }
</style>
