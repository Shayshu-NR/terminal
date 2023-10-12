<template>
    <TerminalOutput :cmd="this.cmd">
        <span>Unknown command: {{ this.func }} {{ this.args }}</span><br>
        <span>To see a list of supported commands run:</span><br>
        <span>&nbsp; help</span><br>
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';

export default
    {
        name: 'UnknownCommandRender',
        props: ['func', 'args'],
        setup() {
        },
        mounted() {
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