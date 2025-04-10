function taskpageToText(page) {
    result = " -";
    if ( page["Завершена"] == true ) {
        result += " [x] ";
    } else {
        result += " [ ] ";
    }
    result += page.file.link;
    return result;
}

const kanbanName = "MainKanban.md"
const absolutePath = this.app.vault.adapter.basePath.replaceAll("\\", "/") + "/" + kanbanName;
const dv = app.plugins.plugins.dataview.api;

let metadata = "---\n" +
               "kanban-plugin: board\n" +
               "---\n";

let todo = " ## Сделать\n";
let todopages = dv.pages('"Projects"').where(p => p['filetype'] == "task" && 
                                                  p['Завершена'] == false && 
                                                  p['Статус'] == "Сделать");
for ( let i = 0; i < todopages.length; i++ ) {
    todo += taskpageToText(todopages[i]) + "\n";
}

let active = " ## В работе\n";
let activepages = dv.pages('"Projects"').where(p => p['filetype'] == "task" && 
                                                    p['Завершена'] == false && 
                                                    p['Статус'] == "Активна");
for ( let i = 0; i < activepages.length; i++ ) { 
    active += taskpageToText(activepages[i]) + "\n";
}

let done = " ## Завершенные\n";
let donepages = dv.pages('"Projects"').where(p => p['filetype'] == "task" && 
                                                  p['Завершена'] == true && 
                                                  p['Статус'] == "Завершена");
for ( let i = 0; i < donepages.length; i++ ) { 
    done += taskpageToText(donepages[i]) + "\n";
}

let settings = " %% kanban:settings\n" + 
               "```\n" + 
               '{"kanban-plugin":"board","list-collapse":[false]}\n' + 
               "```\n";

let data = metadata + todo + active + done + settings;

const fs = require('fs');
fs.writeFile(absolutePath, data, (err) => {
    if (err) throw err;
})