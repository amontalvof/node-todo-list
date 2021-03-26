require('colors');
const Tasks = require('./models/tasks');
const { createData, readData } = require('./helpers/crudDB');
const {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirm,
    showChecklist,
} = require('./helpers/inquirer');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readData();

    if (tasksDB) {
        //load tasks
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        // print the menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1': // create option
                const desc = await readInput('Description:');
                tasks.createTask(desc);
                break;
            case '2': // list all tasks
                tasks.fullList();
                break;
            case '3': // list completed tasks
                tasks.listPendingCompletedTasks(true);
                break;
            case '4': // list pending tasks
                tasks.listPendingCompletedTasks(false);
                break;
            case '5': // check completed task
                const ids = await showChecklist(tasks.listArray);
                console.log(ids);
                break;
            case '6': // delete task
                const id = await listTasksDelete(tasks.listArray);
                if (id !== `${tasks.listArray.length + 1}`) {
                    const ok = await confirm('Are you sure?');
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('Task deleted successfully.');
                    }
                }
                break;
        }
        createData(tasks.listArray);
        await pause();
    } while (opt !== '7');
};

main();
