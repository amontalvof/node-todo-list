require('colors');
const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const { createData, readData } = require('./helpers/crudDB');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readData();

    if (tasksDB) {
        //set tasks
    }
    await pause();

    do {
        // print the menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // create option
                const desc = await readInput('Description:');
                tasks.createTask(desc);
                break;
            case '2':
                console.log(tasks.listArray);
                break;
        }
        // createData(tasks.listArray);
        await pause();
    } while (opt !== '0');
};

main();
