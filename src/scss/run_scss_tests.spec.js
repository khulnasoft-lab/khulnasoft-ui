const fs = require('fs');
const path = require('path');
const sassTrue = require('sass-true');

const testFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith('.spec.scss'))
  .map((file) => path.resolve(__dirname, file));

testFiles.forEach((file) => {
  sassTrue.runSass(
    { file },
    {
      describe,
      it,
    }
  );
});
