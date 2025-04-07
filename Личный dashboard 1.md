### Текущие задачи (DQL):
```dataview
TABLE Проект, Название, Дедлайн, Завершена
FROM "Projects"
WHERE filetype = "task" AND Завершена = false
SORT Дата-окончания desc
```

### Завершенные задачи (DQL):
```dataview
TABLE Проект, Название, Дедлайн, Завершена
FROM "Projects"
WHERE filetype = "task" AND Завершена = true
SORT Дата-окончания desc
```

```dataviewjs

let pages = dv.pages('"Projects"').where(p => p['filetype'] == "task");
dv.header(2, "Текущие задачи (DVJS):");
dv.table(
	["Файл", "Проект", "Название", "Дедлайн", "Завершена", " "], 
	pages.map(p => {
		const link    = p.file.link;
		const project = p.Проект;
		const name    = p.Название;
		const due     = p.Дедлайн;
		const done    = `\`INPUT[toggle:${p.file.name}#Завершена]\``;
		const button  = `\`\`\`meta-bind-button 
label: "Завершить"
icon: ""
style: primary
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: "Complete-${p.file.name}"
hidden: false
actions:
  - type: updateMetadata
    bindTarget: ${p.file.name}#Завершена
    evaluate: false
    value: "true"
\`\`\``;
		return [link, project, name, due, done, button];
		})
);
```

