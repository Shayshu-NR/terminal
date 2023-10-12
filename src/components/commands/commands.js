import { fileMap } from "../../files/files.js";
import ResumeCommandRender from './ResumeCommand.vue';
import UnknownCommandRender from './UnknownCommand.vue'
import { createApp } from 'vue';

function helpCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);

    let resp = [];

    resp = [
        "Shayshu NR Website, version 1.0-release",
        "These commands are defined interaly. Type 'help' to see this list.",
        "",
        `All commands:`,
        "resume [o=outputType]",
        "contact [o=outputType]",
        "github",
        "expr [y=year]"
    ]

    return resp
}

function snrCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);

    let resp = [];
    let argParams = Object.fromEntries(args.map(arg => arg.split("=")));

    switch (func) {
        default:
            resp = [
                "Unknown command: ",
                "To see a list of supported commands run:",
                "&nbsp; snr help",
            ]
            break;
    }

    console.log(resp);

    return resp
}

function resumeCommand(func, ...args) {
    setTimeout(1000);
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);
    let cmd = func + args.map(x => x).join(" ");
    console.log(cmd);

    var component = createApp(ResumeCommandRender, {
        'cmd': cmd
    });
    return component;
}

function unknownCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);

    var component = createApp(UnknownCommandRender, {
        'func': func,
        'args': args.map(x => x).join(" ")
    });

    return component
}

export { snrCommand, helpCommand, unknownCommand, resumeCommand }