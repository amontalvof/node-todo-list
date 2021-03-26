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

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
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
                        `${(idx + '.').green} ${desc} :: ${completedIn.green}`
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

    toggleCompleted(ids = []) {
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.completedIn) {
                task.completedIn = new Date().toISOString();
            }
        });
        this.listArray.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedIn = null;
            }
        });
    }
}

module.exports = Tasks;
