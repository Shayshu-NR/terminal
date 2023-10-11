<script setup>
import { onMounted, ref } from 'vue'

const loaderCount = ref([]);
const loaderLimit = 50;

onMounted(() => {
    for (var i = 0; i < loaderLimit; i++) {
        setTimeout(() => {
            loaderCount.value.push(0);
        }, 10 * (i + 1));
    }
});
</script>

<template>
    <span>[<span v-for="l in loaderCount">=</span> >] 100%</span>
</template>