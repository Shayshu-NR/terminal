<template>
    <TerminalOutput :cmd="this.cmd">
        <span>Contact:</span><br>
        <span>&nbsp; Email: <a href="mailto:shayshu.nahata@gmail.com">shayshu.nahata@gmail.com</a></span><br>
        <span>&nbsp; LinkedIn: <a href="https://ca.linkedin.com/in/shayshu-nr">https://ca.linkedin.com/in/shayshu-nr</a></span><br>
        <span>&nbsp; Github: <a href="https://github.com/Shayshu-NR">https://github.com/Shayshu-NR</a></span><br>
        <span>&nbsp; Website: <a href="https://shayshu-nr.github.io/">https://shayshu-nr.github.io/</a></span>       <br>
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';
import { useStore } from '../../stores/store.js';

export default {
    name: "ContactCommandRender",
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