const fs = require('fs');

const { PUBLIC_DIR, ASSETS_DIR, IMAGES_DIR } = require('../constants/file-directories.constant');

let rootDir = `./${PUBLIC_DIR}`;
let assetsDir = `${rootDir}/${ASSETS_DIR}`;
let imagesDir = `${assetsDir}/${IMAGES_DIR}`;

if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
    fs.mkdirSync(assetsDir);
    fs.mkdirSync(imagesDir);
}

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
    fs.mkdirSync(imagesDir);
}

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}