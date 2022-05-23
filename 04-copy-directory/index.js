const fs = require('fs');
const path = require('path');
const copyFile = require('fs/promises');
const unlink = require('fs')
function copyDir() {
    fs.mkdir(path.join(__dirname, 'files-copy'), error => {
        if (error) console.error('alredy exist');
    }
    )
    fs.readdir(path.join(__dirname, 'files-copy'), (error, data) => {
        if (error) console.error(error.message);
        for (let item of data) {
            const link = path.join(__dirname, 'files-copy', item)
            fs.unlink(link, (error) => {
                if (error) console.error(error.message);
            })
        }
    }
    )
    fs.readdir(path.join(__dirname, 'files'), (error, data) => {
        if (error) console.error('error');
        for (let item of data) {
            const file = path.join(__dirname, "files", item)
            const dest = path.join(__dirname, 'files-copy', item)
            fs.copyFile(file, dest, (error) => {
                if (error) console.error('error');
            });
        }
    })
}
copyDir()