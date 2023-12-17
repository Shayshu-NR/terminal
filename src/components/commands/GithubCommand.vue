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
            <span>I have another {{ this.store.ghData.user.repositories.totalCount -
                this.store.ghData.user.pinnedItems.nodes.length }} repositories you can check
                out.
            </span>
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
                .catch((x) => {
                    this.store.ghData = {
                        "data": {
                            "user": {
                                "name": "Shayshu Nahata",
                                "pinnedItems": {
                                    "nodes": [
                                        {
                                            "name": "Rust-Code-Visualizer",
                                            "url": "https://github.com/Shayshu-NR/Rust-Code-Visualizer"
                                        },
                                        {
                                            "name": "Beverley-Maps",
                                            "url": "https://github.com/Shayshu-NR/Beverley-Maps"
                                        },
                                        {
                                            "name": "Movie-Rating-AI",
                                            "url": "https://github.com/Shayshu-NR/Movie-Rating-AI"
                                        },
                                        {
                                            "name": "ECE344",
                                            "url": "https://github.com/Shayshu-NR/ECE344"
                                        },
                                        {
                                            "name": "APS360",
                                            "url": "https://github.com/Shayshu-NR/APS360"
                                        },
                                        {
                                            "name": "ECE421",
                                            "url": "https://github.com/Shayshu-NR/ECE421"
                                        }
                                    ]
                                },
                                "repositories": {
                                    "totalCount": 39
                                },
                                "url": "https://github.com/Shayshu-NR"
                            }
                        }
                    };
                    this.store.cmdRunning = false;
                });
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
