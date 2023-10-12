<template>
    <div ref="outputContainer">
    </div>

    <div class="w-100" v-if="!cmdRunning">
        <span>
            <span class="terminal-computer">shayshu@website </span>
            <span class="terminal-runtime">MINGW64 </span>
            <span class="terminal-path">/d{{ this.path.path }} </span>
        </span>
        <br>
        <span>
            $
            <input type="text" class="terminal-input" v-model="command" v-on:keyup.enter="(e) => ingestCommand(e)"
                v-on:keyup.up="(e) => getPastCommand(e)" v-on:keyup.down="(e) => getNextCommand(e)" ref="terminalInput"
                autofocus />
        </span>
    </div>
    {{ this.store.cmdRunning }}
</template>

<script>
import { snrCommand, helpCommand, unknownCommand, resumeCommand } from './commands/commands.js';
import ResumeCommandRender from './commands/ResumeCommand.vue'
import UnknownCommandRender from './commands/UnknownCommand.vue'
import { useStore } from '../stores/store';

export default
    {
        name: 'Terminal',
        props: ['path'],
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
            console.log(this.$refs);
            this.$refs.outputContainer.appendChild(document.createElement('div'));
        },
        data() {
            return {
                cmdRunning: false,
                pastCommands: [],
                commandIndex: 0,
                command: ""
            }
        },
        methods: {
            ingestCommand(e) {
                this.store.cmdRunning = true;

                let cmdResp = {
                    command: e.target.value,
                    response: []
                };

                let [func, ...args] = e.target.value.split(' ');

                console.log(func)

                switch (func) {
                    case "snr":
                        cmdResp.response = snrCommand(func, ...args);
                        break;
                    case "help":
                        cmdResp.response = helpCommand(func, ...args);
                        break;
                    case "resume":
                        let resumeResp = resumeCommand(func, ...args);
                        this.$refs.outputContainer.appendChild(document.createElement('br'));
                        this.$refs.outputContainer.appendChild(resumeResp.mount(document.createElement('div')).$el);
                        break;
                    case "clear":
                        command.value = "";
                        this.pastCommands = [];
                        this.commandIndex = this.pastCommands.length;
                        return;
                    default:
                        let unknownResp = unknownCommand(func, ...args);
                        this.$refs.outputContainer.appendChild(document.createElement('br'));
                        this.$refs.outputContainer.appendChild(unknownResp.mount(document.createElement('div')).$el);
                        break;
                }

                this.pastCommands.push(
                    cmdResp
                );

                console.log(e);

                this.$refs.terminalInput.value = "";
                this.commandIndex = this.pastCommands.length;
                this.command = "";
                this.store.cmdRunning = false;
            },

            getPastCommand(e) {
                if (this.pastCommands.length > 0 && this.commandIndex > 0) {
                    this.command = this.pastCommands[this.commandIndex - 1].command;
                    this.commandIndex -= 1;
                }
            },

            getNextCommand(e) {

                if (this.pastCommands.length > 0 && this.commandIndex < this.pastCommands.length - 1) {
                    this.command = this.pastCommands[this.commandIndex + 1].command;
                    this.commandIndex += 1;
                }
            }
        },
        components: {
            ResumeCommandRender,
            UnknownCommandRender
        }
    }
</script>