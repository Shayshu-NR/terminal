<script setup>
    import ProcessLoader from './ProcessLoader.vue'

    const props = defineProps(['path', 'cmd']);
    
    // TODO: Replace the v-for v-html with slots for better
    // integration with processloader component
</script>

<template>
    <div class="w-100">
        <span>
            <span class="terminal-computer">shayshu@website </span>
            <span class="terminal-runtime">MINGW64 </span>
            <span class="terminal-path"> /d{{ props.path.path }} </span>
        </span>
        <br>
        <span>$ {{ props.cmd.command }} </span>
        <br>
        <span v-for="resp in props.cmd.response">
            <span v-html="resp">

            </span>
            <br>
        </span>
    </div>
</template>