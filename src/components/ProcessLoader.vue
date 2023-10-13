<template>
    <span>[<span v-for="l in loaderCount">=</span>>] {{this.loaderCount.length * 2}}%</span>
</template>

<script>
import { useStore } from '../stores/store';

export default
    {
        name: 'ProcessLoader',
        props: {
            loadTime: {
                type: Number,
                default: 20
            },
            randStutter:
            {
                type: Boolean,
                default: false
            },
            stutterLimit: {
                type: Number,
                default: 10
            }
        },
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
            for (var i = 0; i < this.loaderLimit; i++) {
                setTimeout(() => {
                    this.loaderCount.push(0);

                    if(this.loaderCount.length == this.loaderLimit)
                    {
                        this.store.cmdRunning = false;
                        this.$emit('doneLoad', true);
                    }
                }, (this.loadTime + (this.randStutter ? this.getRandomInt(this.stutterLimit) : 0)) * (i + 1));
            }
        },
        data() {
            return {
                loaderCount: [],
                loaderLimit: 50,
            }
        },
        methods: {
            getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
        }
    }
</script>