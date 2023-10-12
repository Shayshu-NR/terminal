<template>
    <TerminalOutput :cmd="this.cmd">
        <span>Downloading resume: ./files/Shayshu Nahata-Ragubance Resume 2023.pdf</span><br>
        <ProcessLoader :load-time="80" :rand-stutter="true" :stutter-limit="25" @done-load="this.downloadResume" />
    </TerminalOutput>
</template>

<script>
import TerminalOutput from '../TerminalOutput.vue';
import ProcessLoader from '../ProcessLoader.vue';
import { useStore } from '../../stores/store';
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
        },
        data() {
            return {
                
            }
        },
        methods: {
            downloadResume() {
                return;
                var anchor = document.createElement('a');
                anchor.setAttribute('href', fileMap.Resume.Path);
                anchor.setAttribute('download', fileMap.Resume.Name);
                document.body.appendChild(anchor);
                anchor.click();
                anchor.parentNode.removeChild(anchor);
            }
        },
        components: {
            TerminalOutput,
            ProcessLoader
        }
    }
</script>