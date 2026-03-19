const fs = require('fs');
const path = require('path');

const dir = './src';
const oldBlue = '#021631';
const newBlue = '#003399';
const oldYellow = '#fcbc17';
const newRed = '#E31E24'; 

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(dir, function(filePath, stat) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(new RegExp(oldBlue, 'gi'), newBlue);
        newContent = newContent.replace(new RegExp(oldYellow, 'gi'), newRed);
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
