#!/usr/bin/env node

const fs = require('fs');
const { glob } = require('glob');
const prettier = require('prettier');
const sortBy = require('lodash/sortBy');

const getFilesToParse = async () => {
  return glob('./src/**/*.{js,vue}', {
    nodir: true,
    ignore: {
      ignored: (p) => /\.(stories|spec)\.js$/.test(p.name),
    },
  });
};

const getFindings = (files) => {
  return files.reduce((findings, file) => {
    const content = fs.readFileSync(file).toString();
    const matches = [...content.matchAll(/translate\('(.*)', '(.*)'\)/g)];
    if (matches.length) {
      matches.forEach((match) => {
        const [, translationKey, defaultTranslation] = match;
        findings.push([translationKey, defaultTranslation]);
      });
    }
    return findings;
  }, []);
};

const buildObject = (findings) => {
  const translations = Object.fromEntries(sortBy(findings, (finding) => finding[0]));
  return prettier.format(JSON.stringify(translations), { parser: 'json' });
};

const main = async () => {
  const filesToParse = await getFilesToParse();
  const findings = await getFindings(filesToParse);
  const translations = buildObject(findings);
  fs.writeFileSync(`./translations.json`, translations);
};

main();
