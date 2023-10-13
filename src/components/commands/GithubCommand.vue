<template>
    <TerminalOutput :cmd="this.cmd">
        <span>GITHUB</span>
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';
import { useStore } from '../../stores/store.js';

export default
    {
        name: 'GithubCommandRender',
        props: ['cmd'],
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
            this.store.cmdRunning = false;
        },
        data() {
            return {
            }
        },
        methods: {

        },
        components: {
            TerminalOutput
        }
    }
</script>