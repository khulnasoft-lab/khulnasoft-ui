const path = require('path');
const fs = require('fs');
const glob = require('glob');
const Mustache = require('mustache');

const main = () => {
  const pattern = path.join(__dirname, '../../src/**/*.stories.js');
  const storyFiles = glob.sync(pattern);
  const storyKinds = storyFiles
    .map((storyFile) => {
      const content = fs.readFileSync(storyFile).toString();
      const csfMatch = content.match(/export default {[\n ]+title: '([^']+)'/);
      if (csfMatch && csfMatch.length > 1) {
        return csfMatch[1];
      }
      const documentedStoryMatch = content.match(/documentedStoriesOf\('([^']+)'/);
      if (documentedStoryMatch && documentedStoryMatch.length > 1) {
        return documentedStoryMatch[1];
      }
      return null;
    })
    .filter((kind) => kind !== null);
  const template = fs.readFileSync(path.join(__dirname, 'spec_template.js.hbs')).toString();
  storyKinds.forEach((storyKind) => {
    const output = Mustache.render(template, { storyKind });
    const specName = `${storyKind.replace(/[/-]/g, '_')}.spec.js`;
    fs.writeFileSync(path.join(__dirname, 'specs', specName), output);
  });
};

main();
