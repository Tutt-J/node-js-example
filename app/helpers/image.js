const fs = require('fs');

async function remove(image) {
  const filename = image.split("/uploads/")[1];
  fs.unlink(`uploads/${filename}`, () => {
    console.log(`Image ${filename} deleted`);
  });
}

module.exports = {
  remove,
};
