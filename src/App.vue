<template>
    <div id="app">
        <h1>Chart Data</h1>
        <notifications group="systemNotifications" />
        <chart-container ></chart-container>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import { ACTION_TYPES } from "./store/actions";
    import chartContainer from './components/chart-container'

    const mapActions = Vuex.mapActions;

    export default {
        name: 'app',
        components: {
            chartContainer,
        },
        data() {
            return {
                isDataReady: false,
            };
        },
        async beforeMount() {
            await this.fetchData();
            this.isDataReady = true;
        },
        methods: {
            ...mapActions({
                'fetchData': ACTION_TYPES.FETCH_DATA
            }),
        }
    }
</script>

<style>
    #app {
        margin: 0;
        background-color: #f9f8f8;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #3104af;
        font-weight: bold;
        font-size: 1.2em;
    }
</style>
