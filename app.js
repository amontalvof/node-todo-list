require('colors');
const { inquirerMenu, pause } = require('./helpers/inquirer');

const main = async () => {
    let option = '';
    do {
        opt = await inquirerMenu();
        console.log('\n');
        await pause();
    } while (opt !== '0');
};

main();
