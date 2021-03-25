require('colors');
const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
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
        await pause();
    } while (opt !== '0');
};

main();
