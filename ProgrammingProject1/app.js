const fs = require('fs');

const grocery = require('./grocery.js');
const _ = require('lodash');
const yargs = require('yargs');

const titleOptions = {
    describe: 'Food item',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Quantity of food item',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new food item', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all items')
    .command('remove', 'Remove an item', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
    var item = grocery.addItem(argv.title, argv.body);
    if (item) {
        console.log('Item created');
        grocery.logItem(item);
    } else {
        console.log('Item already exists');
    }
} else if (command === 'list') {
    var allItems = grocery.getAll();
    console.log(`Printing ${allItems.length} item(s).`);
    allItems.forEach((item) => grocery.logItem(item));
}  else if (command === 'remove') {
    var itemRemoved = grocery.removeItem(argv.title);
    var message = itemRemoved ? 'Item was removed' : 'Item not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}
