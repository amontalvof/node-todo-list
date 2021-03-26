const Task = require('./task');

class Tasks {
    _list = {};

    constructor() {
        this._list = {};
    }

    get listArray() {
        const list = [];
        Object.keys(this._list).forEach((key) => {
            const task = this._list[key];
            list.push(task);
        });
        return list;
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach((task) => {
            this._list[task.id] = task;
        });
    }

    fullList() {
        console.log();
        this.listArray.forEach((task, index) => {
            const idx = `${index + 1}.`.green;
            const { desc, completedIn } = task;
            const status = completedIn ? 'Completed'.green : 'Pending'.red;
            console.log(`${idx} ${desc} :: ${status}`);
        });
    }

    listPendingCompletedTasks(completed = true) {
        console.log();
        let idx = 0;
        this.listArray.forEach((task) => {
            const { desc, completedIn } = task;
            const status = completedIn ? 'Completed'.green : 'Pending'.red;
            if (completed === true) {
                if (completedIn) {
                    idx += 1;
                    console.log(
                        `${(idx + '.').green} ${desc} :: ${completedIn}`
                    );
                }
            } else {
                if (!completedIn) {
                    idx += 1;
                    console.log(`${(idx + '.').green} ${desc} :: ${status}`);
                }
            }
        });
    }
}

module.exports = Tasks;
