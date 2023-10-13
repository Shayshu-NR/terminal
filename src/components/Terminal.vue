<template>
    <div ref="outputContainer">
    </div>

    <div class="w-100" v-if="!this.store.cmdRunning">
        <span>
            <span class="terminal-computer">shayshu@website </span>
            <span class="terminal-runtime">MINGW64 </span>
            <span class="terminal-path">/d/ </span>
        </span>
        <br>
        <span>
            $
            <input type="text" class="terminal-input" v-model="command" v-on:keyup.enter="(e) => ingestCommand(e)"
                v-on:keyup.up="(e) => getPastCommand(e)" v-on:keyup.down="(e) => getNextCommand(e)" ref="terminalInput"
                autofocus />
        </span>
    </div>
</template>

<script>
import { helpCommand, unknownCommand, resumeCommand, coverLetterCommand, githubCommand } from './commands/commands.js';
import ResumeCommandRender from './commands/ResumeCommand.vue';
import UnknownCommandRender from './commands/UnknownCommand.vue';
import HelpCommandRender from './commands/HelpCommand.vue';
import CoverLetterCommandRender from './commands/CoverLetterCommand.vue';
import  GithubCommandRender from './commands/GithubCommand.vue';
import { useStore } from '../stores/store';

export default
    {
        name: 'Terminal',
        props: [],
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
                let cmdResp = {
                    command: e.target.value,
                    response: []
                };

                let [func, ...args] = e.target.value.split(' ');

                let cmdRespComponent;

                switch (func) {
                    case "help":
                        cmdRespComponent = helpCommand(func, ...args);
                        break;
                    case "resume":
                        cmdRespComponent = resumeCommand(func, ...args);
                        break;
                    case "cvrlttr":
                        cmdRespComponent = coverLetterCommand(func, ...args);
                        break;
                    case "github":
                        cmdRespComponent = githubCommand(func, ...args);
                        break;
                    case "clear":
                        command.value = "";
                        this.pastCommands = [];
                        this.commandIndex = this.pastCommands.length;
                        return;
                    default:
                        cmdRespComponent = unknownCommand(func, ...args);
                        break;
                }

                // Append the returned component to the dom
                // this.$refs.outputContainer.appendChild(document.createElement('br'));
                this.$refs.outputContainer.appendChild(cmdRespComponent.mount(document.createElement('div')).$el);

                this.pastCommands.push(
                    cmdResp
                );
                this.$refs.terminalInput.value = "";
                this.commandIndex = this.pastCommands.length;
                this.command = "";
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
            UnknownCommandRender,
            HelpCommandRender,
            CoverLetterCommandRender,
            GithubCommandRender
        },
        watch : {
            'store.cmdRunning'(newVal, oldVal)
            {
                //when the cmd is done running focus on the input...
                if(oldVal && !newVal)
                {
                    console.log("FOCUS!", this.$refs);
                    setTimeout(() => this.$refs.terminalInput.focus(), 100);
                }
            }
        }
    }
</script>