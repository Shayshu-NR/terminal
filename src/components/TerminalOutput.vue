<template>
    <div class="w-100">
        <span>
            <span class="terminal-computer">shayshu@website </span>
            <span class="terminal-runtime">MINGW64 </span>
            <span class="terminal-path"> /d/ </span>
        </span>
        <br>
        <span>$ {{ this.cmd }} </span>
        <br>
        <span>
            <slot></slot>
        </span>
    </div>
</template>


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