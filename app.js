require('colors');
const { inquirerMenu, pause } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async () => {
    let option = '';
    do {
        // opt = await inquirerMenu();
        // console.log('\n');
        const tasks = new Tasks();
        console.log(tasks);
        await pause();
    } while (opt !== '0');
};

main();
