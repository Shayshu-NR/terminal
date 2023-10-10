<script setup>
import { ref } from 'vue';
import { snrCommand, helpCommand, unknownCommand } from './commands/commands';

const props = defineProps(['path']);
const command = ref("");
const pastCommands = ref([]);
const commandIndex = ref(0);
const terminalInput = ref(null);
const name = "Terminal";

function ingestCommand(e) {
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
        case "clear":
            command.value = "";
            pastCommands.value = [];
            commandIndex.value = pastCommands.value.length;
            return;
        default:
            cmdResp.response = unknownCommand(func, ...args);
            break;
    }

    pastCommands.value.push(
        cmdResp
    );

    console.log(e);

    terminalInput.value = "";
    commandIndex.value = pastCommands.value.length;
    command.value = "";
}

function getPastCommand(e) {
    if (pastCommands.value.length > 0 && commandIndex.value > 0) {
        command.value = pastCommands.value[commandIndex.value - 1].command;
        commandIndex.value -= 1;
    }
}

function getNextCommand(e) {
    if (pastCommands.value.length > 0 && commandIndex.value < pastCommands.value.length - 1) {
        command.value = pastCommands.value[commandIndex.value + 1].command;
        commandIndex.value += 1;
    }
}
</script>

<style>
.w-100 {
    width: 100% !important;
    height: 100% !important;
    font-family: 'DejaVu Sans Mono', sans-serif, monospace !important;
    margin-bottom: 1rem;
}

.terminal {
    text-align: start;
}

.terminal-input {
    background-color: transparent;
    border: none;
    outline: none;
    caret-color: white;
    color: white;
    font-size: medium;
    font-family: 'DejaVu Sans Mono', sans-serif, monospace !important;
}

.terminal-computer {
    color: chartreuse;
}

.terminal-runtime {
    color: purple
}

.terminal-path {
    color: yellow
}
</style>

<template>
    <div class="w-100" v-for="cmd in pastCommands">
        <span>
            <span class="terminal-computer">shayshu@website </span>
            <span class="terminal-runtime">MINGW64 </span>
            <span class="terminal-path"> /d{{ props.path.path }} </span>
        </span>
        <br>
        <span>$ {{ cmd.command }} </span>
        <br>
        <span v-for="resp in cmd.response">
            <span v-html="resp">

            </span>
            <br>
        </span>
    </div>

    <div class="w-100">
        <span>
            <span class="terminal-computer">shayshu@website </span>
            <span class="terminal-runtime">MINGW64 </span>
            <span class="terminal-path">/d{{ props.path.path }} </span>
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