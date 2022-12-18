"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImageAndSave = void 0;
const axios_1 = require("axios");
const fs = require("fs");
const url = require("url");
async function downloadImageAndSave(imageURL) {
    const res = await axios_1.default.get(imageURL, { responseType: 'arraybuffer' });
    const parsedUrl = url.parse(imageURL);
    const extension = parsedUrl.pathname.split('.').pop();
    const randomFilename = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    const filename = `${randomFilename}.${extension}`;
    await fs.promises.writeFile(`./data/avatars/${filename}`, res.data);
    return filename;
}
exports.downloadImageAndSave = downloadImageAndSave;
//# sourceMappingURL=utils.js.map