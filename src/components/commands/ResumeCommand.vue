<template>
    <TerminalOutput :cmd="this.cmd">
        <span>Downloading resume: {{ this.resume.Path }}</span><br>
        <ProcessLoader :load-time="70" :rand-stutter="true" :stutter-limit="25" @done-load="this.downloadResume" />
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';
import ProcessLoader from '../ProcessLoader.vue';
import { useStore } from '../../stores/store.js';
import { fileMap } from '../../files/files';

export default
    {
        name: 'ResumeCommandRender',
        props : ['cmd'],
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
            this.store.cmdRunning = true;
            this.resume = fileMap.Resume
        },
        data() {
            return {
             resume : "",   
            }
        },
        methods: {
            downloadResume() {
                var anchor = document.createElement('a');
                anchor.setAttribute('href', fileMap.Resume.Path);
                anchor.setAttribute('download', fileMap.Resume.Name);
                document.body.appendChild(anchor);
                anchor.click();
                anchor.parentNode.removeChild(anchor);
                this.store.cmdRunning = false;
            }
        },
        components: {
            TerminalOutput,
            ProcessLoader
        }
    }
</script>