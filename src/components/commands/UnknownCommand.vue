<template>
    <TerminalOutput :cmd="this.cmd">
        <span>Unknown command: {{ this.cmd }}</span><br>
        <span>To see a list of supported commands run:</span><br>
        <span>&nbsp; help</span><br>
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';
import { useStore } from '../../stores/store.js';

export default
    {
        name: 'UnknownCommandRender',
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