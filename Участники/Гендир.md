```dataviewjs

function filter_by_role(p){
	return p["Участники"].map(a => String(a)).includes(String(dv.current().file.link))
}

dv.header(1, "Текущие задачи")
let current_tasks = dv.pages('"Задачи"').where(p => (p["filetype"] == "task" && 
										            filter_by_role(p)) &&
										            p["Статус"] != "Завершена")
dv.table(
	["Название", "Приоритет", "Дедлайн", "Статус"], 
	current_tasks.map(p => {
		const link       = p.file.link;
		const priority   = p.Приоритет;
		const due        = p.Дедлайн;
		const status     = p.Статус;
		return [link, priority, due, status];
		})
);

dv.header(1, "Завершенные задачи")
let done_tasks = dv.pages('"Задачи"').where(p => (p["filetype"] == "task" && 
										         filter_by_role(p)) &&
										         p["Статус"] == "Завершена")
dv.table(
	["Название", "Приоритет", "Дедлайн", "Статус"], 
	done_tasks.map(p => {
		const link       = p.file.link;
		const priority   = p.Приоритет;
		const due        = p.Дедлайн;
		const status     = p.Статус;
		return [link, priority, due, status];
		})
);
```
