const fs = require('fs');

var fetchList = () => {
    try {
        var listString = fs.readFileSync('list-data.json');
        return JSON.parse(listString);
    } catch (e) {
        return [];
    }
};

var saveList = (list) => {
    fs.writeFileSync('list-data.json', JSON.stringify(list));
};

var addItem = (title, body) => {
    var list = fetchList();
    var item = {
        title,
        body
    };
    var duplicateItems = list.filter((item) => item.title === title);
    if (duplicateItems.length === 0) {
        list.push(item);
        saveList(list);
        return item;
    }
};

var getAll = () => {
    //console.log('Getting all notes');
    return fetchList();
};


var removeItem = (title) => {
    var list = fetchList();
    var filteredList = list.filter((item) => item.title !== title);
    saveList(filteredList);
    return list.length !== filteredList.length;
};

var logItem = (item) => {
    debugger;
    console.log('--');
    console.log(`Title: ${item.title}`);
    console.log(`Body: ${item.body}`);
};

module.exports = {
    addItem,
    getAll,
    removeItem,
    logItem
};
