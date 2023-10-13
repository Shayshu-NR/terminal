<template>
    <TerminalOutput :cmd="this.cmd">
        <span>Shayshu NR Website, version <span>1.0-release</span></span><br>
        <span>These commands are defined internally. Type 'help' to see this list.</span><br>
        <br>
        <span>All commands:</span><br>
        <span>
            <pre>&nbsp;&nbsp;resume - Get my latest resume</pre>
        </span>
        <span>
            <pre>&nbsp;&nbsp;cvrlttr - Get my latest cover letter</pre>
        </span>
        <span>
            <pre>&nbsp;&nbsp;github - Visit my GitHub</pre>
        </span>
        <span>
            <pre>&nbsp;&nbsp;contact - Contact me</pre>
        </span>
        <span>
            <pre>&nbsp;&nbsp;help - Command help</pre>
        </span>
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';
import { useStore } from '../../stores/store.js';

export default {
    name: "HelpCommandRender",
    props: ['cmd'],
    setup() {
        const store = useStore();
        return { store };
    },
    mounted() {
        this.store.cmdRunning = false;
    },
    methods: {

    },
    components: {
        TerminalOutput
    }
}
</script>