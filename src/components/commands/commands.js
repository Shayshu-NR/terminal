import { fileMap } from "../../files/files.js";
import ResumeCommandRender from './ResumeCommand.vue';
import UnknownCommandRender from './UnknownCommand.vue'
import HelpCommandRender from './HelpCommand.vue'
import CoverLetterCommandRender from './CoverLetterCommand.vue'
import GithubCommandRender from './GithubCommand.vue';
import ContactCommandRender from './ContactCommand.vue';
import { createApp } from 'vue';

function helpCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);

    let cmd = func + args.map(x => x).join(" ");

    var component = createApp(HelpCommandRender, {
        'cmd': cmd
    });

    return component;
}

function resumeCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);
    let cmd = func + args.map(x => x).join(" ");

    var component = createApp(ResumeCommandRender, {
        'cmd': cmd
    });
    return component;
}

function coverLetterCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);
    let cmd = func + args.map(x => x).join(" ");

    var component = createApp(CoverLetterCommandRender, {
        'cmd': cmd
    });
    return component;
}

function githubCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);
    let cmd = func + args.map(x => x).join(" ");

    var component = createApp(GithubCommandRender, {
        'cmd': cmd
    });
    return component;
}

function contactCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);
    let cmd = func + args.map(x => x).join(" ");

    var component = createApp(ContactCommandRender, {
        'cmd': cmd
    });
    return component;
}

function unknownCommand(func, ...args) {
    // Parse through the arguments and then return the response...
    console.log("Function", func);
    console.log("Args", ...args);
    let cmd = func + args.map(x => x).join(" ");

    var component = createApp(UnknownCommandRender, {
        'cmd': cmd,
    });

    return component
}

export { helpCommand, unknownCommand, resumeCommand, coverLetterCommand, githubCommand, contactCommand }