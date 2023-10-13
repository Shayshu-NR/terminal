<template>
    <div class="w-100">
        <span>
            <span class="terminal-computer">shayshu@website </span>
            <span class="terminal-runtime">MINGW64 </span>
            <span class="terminal-path"> /d/ </span>
        </span>
        <br>
        <span class="cmd-text">$ {{ this.cmd }} </span>
        <br>
        <span class="cmd-text">
            <slot></slot>
        </span>
    </div>
</template>

<style>
    .cmd-text
    {
        color: var(--terminal-text-color);
    }
</style>


<script>

export default
    {
        name: 'TerminalOutput',
        props: ['cmd'],
        mounted()
        {

        },
        methods : {
            
        }
    }
</script>