// let inputArr = process.argv;
// console.log(inputArr);
// // ['pathToNode','pathToFile','input_passed_in_terminal']
// let input = process.argv[2];
// console.log(input);

let fs = require('fs');
let path = require('path');
let folderPath = path.join(__dirname, "Download");
let extensions = {
    Audio: ['.mp3'],
    Video: [".mp4", ".gif"],
    Image: [".jpg", ".png",],
    Software: [".exe", ".apk"],
    Documents: [".pdf", ".csv", ".xlsx", ".doc"],
    Others: [".zip", ".rar"]
}
// console.log(folderPath);
let folderExists = fs.existsSync(folderPath);
if (folderExists) {
    let files = fs.readdirSync(folderPath);
    //console.log(files);
    for (let i = 0; i < files.length; i++) {
        let ext = path.extname(files[i]);
        //  console.log(ext);
        let nameOfFolder = giveFolderName(ext);
        // console.log("Ext--",ext,"Folder--",nameOfFolder);
        let pathOfFolder = path.join(folderPath, nameOfFolder);
        let exist = fs.existsSync(pathOfFolder);
        if (exist) {
            copyFile(folderPath, pathOfFolder, files[i]);
        } else {
            fs.mkdirSync(pathOfFolder);
            copyFile(folderPath, pathOfFolder, files[i]);
        }
    }
} else {
    console.log("Pls Enter a Valid Path");
}
function giveFolderName(ext) {
    for (let key in extensions) {
        let extArr = extensions[key];
        for (let i = 0; i < extArr.length; i++) {
            if (extArr[i] == ext) {
                return key;
            }
        }
    }
    return 'Others';
}
function copyFile(folderPath, pathOfFolder, fileName) {
    let sourcePath = path.join(folderPath, fileName);
    let destinationPath = path.join(pathOfFolder, fileName);
    fs.copyFileSync(sourcePath, destinationPath);
    // fs.unlinkSync(sourcePath);
}