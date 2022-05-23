const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => {
    (error) => {
        if (error) console.error(error.message);
    }
    files.forEach((i) => {
        if (i.isFile()) {
            const name = i.name.split('.')[0];
            const type = i.name.split('.')[1];
            fs.stat(path.join(__dirname, 'secret-folder', i.name), (error, stats) => {

                console.log(`${name} - ${type} - ${stats.size} b`)
            })
        }
    })
})
