<template>
    <div :class="['input-field', { 'error': hasError }]">
        <span class="label">{{ label }}</span>
        <input :type="type" :placeholder="placeholder" :value="value" @change="onChange"/>
    </div>
</template>

<script>

    export default {
        name: 'input-field',
        props: {
            label: {
                type: String,
                required: false,
            },
            placeholder: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                default: 'text',
            },
            min: {
                type: Number,
            },
            max: {
                type: Number,
            },
        },
        data() {
            return {
                hasError: false,
            };
        },
        methods: {
            onChange(event) {
                this.validateAndEmitChanges(event.target.value);
            },
            validateAndEmitChanges(val) {
                if(!isNaN(this.min) && parseFloat(val) < this.min) {
                    this.onError(`Minimum allowed value: ${this.min}`);
                } else if(!isNaN(this.max) && parseFloat(val) > this.max){
                    this.onError(`Maximum  allowed value: ${this.max}`);
                } else {
                    this.hasError = false;
                    this.$emit('change', val);
                }
            },
            onError(error) {
                this.hasError = true;
                this.$emit('error', error);
            }
        },
        watch: {
            value(newValue) {
                this.validateAndEmitChanges(newValue);
            },
        },
    }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
    .input-field {
        display: inline-block;
        padding: 10px 20px;
    }
    .input-field .label{
        margin-right: 5px;
        color: #3104af;
        font-weight: bold;
    }
    .input-field input{
    }
    .input-field.error input{
        border-color: red;
    }
</style>
