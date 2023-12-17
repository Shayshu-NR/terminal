<template>
    <TerminalOutput :cmd="this.cmd">
        <span>Downloading cover letter: {{ this.coverLetter.Path }}</span><br>
        <ProcessLoader :load-time="70" :rand-stutter="true" :stutter-limit="25" @done-load="this.downloadCoverLetter" />
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';
import ProcessLoader from '../ProcessLoader.vue';
import { useStore } from '../../stores/store.js';
import { fileMap } from '../../files/files';

export default
    {
        name: 'CoverLetterCommandRender',
        props : ['cmd'],
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
            this.store.cmdRunning = true;
            this.path = fileMap.CoverLetter;
        },
        data() {
            return {
                coverLetter : ""
            }
        },
        methods: {
            downloadCoverLetter() {
                var anchor = document.createElement('a');
                anchor.setAttribute('href', fileMap.CoverLetter.Path);
                anchor.setAttribute('download', fileMap.CoverLetter.Name);
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