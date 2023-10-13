<template>
    <span>{{ this.spinner }}</span>
</template>

<script>

export default {
    name: "Loading",
    props : {
        spinSpeed : {
            type: Number,
            default: 150
        }
    },
    mounted() {
        setInterval(() => {
            this.spinner = this.spinStates[this.spinIndex];
            this.spinIndex++;

            if (this.spinIndex == this.spinStates.length) {
                this.spinIndex = 0;
            }
        },  this.spinSpeed);
    },
    unmounted() {
        clearInterval();
    },
    data() {
        return {
            spinner: "|",
            spinStates: [
                "|",
                "/",
                "-",
                "\\",
            ],
            spinIndex: 0,
        }
    }
}
</script>