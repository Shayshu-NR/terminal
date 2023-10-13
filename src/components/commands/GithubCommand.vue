<template>
    <TerminalOutput :cmd="this.cmd">
        <Loading v-if="Object.keys(this.store.ghData).length == 0" />
        
        <span v-if="Object.keys(this.store.ghData).length > 0">
            <span>Check out my Github: <a :href="this.store.ghData.user.url">{{ this.store.ghData.user.name
            }}</a></span><br>

            <span>Some of my favorite projects:</span><br>
            <span v-for="repo in this.store.ghData.user.pinnedItems.nodes">
                &nbsp;&nbsp;<a :href="repo.url">{{ repo.name }}</a><br>
            </span>
            <br>
            <span>I have another {{ this.store.ghData.user.repositories.totalCount - 6 }} repositories you can check
                out.</span>
        </span>
    </TerminalOutput>
</template>

<script>
import TerminalOutput from "../TerminalOutput.vue";
import Loading from "../Loading.vue";
import { useStore } from "../../stores/store.js";

export default {
    name: "GithubCommandRender",
    props: ["cmd"],
    setup() {
        const store = useStore();
        return { store };
    },
    mounted() {
        this.store.cmdRunning = true;

        if (Object.keys(this.store.ghData).length == 0) {
            const queryData = {
                query: `
                    {
                        user(login: "Shayshu-NR") {
                            name
                            pinnedItems(first: 6, types: REPOSITORY) {
                            nodes {
                                ... on Repository {
                                name
                                url
                                }
                            }
                            }
                            repositories {
                            totalCount
                            }
                            url
                        }
                    }`
            };
            const options = {
                method: "POST",
                headers: {
                    accept: "application/vnd.github+json",
                    authorization: `token ${import.meta.env.VITE_GHTOKEN}`,
                },
                body: JSON.stringify(queryData),
            };

            fetch("https://api.github.com/graphql", options)
                .then((x) => x.json())
                .then(x => {
                    this.store.ghData = x.data;
                    this.store.cmdRunning = false;
                })
                .catch((X) => console.log(x));
        }
        else {
            this.store.cmdRunning = false;
        }
    },
    data() {
        return {
        };
    },
    methods: {},
    components: {
        TerminalOutput,
        Loading
    },
};
</script>
