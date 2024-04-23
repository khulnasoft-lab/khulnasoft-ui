/* eslint-disable no-console */
const fs = require('fs');
const { getLocalVariables, postVariables } = require('./tokens/figma_api');
const { generatePostVariablesPayload, readJsonFiles } = require('./tokens/token_utils');

async function main() {
  if (!process.env.FIGMA_ACCESS_TOKEN || !process.env.FIGMA_FILE_KEY) {
    throw new Error('FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY environment variables are required');
  }

  const tokensFiles = fs
    .readdirSync('src/tokens')
    .map((file) => `src/tokens/${file}`)
    .filter((item) => item.includes('.tokens.json'));

  const tokensJsonByFile = readJsonFiles(tokensFiles);
  const localVariables = await getLocalVariables();

  const payload = generatePostVariablesPayload(tokensJsonByFile, localVariables);

  if (Object.values(payload).every((value) => value.length === 0)) {
    console.log('✅ Tokens are already up to date with the Figma file');
    return;
  }

  const apiResp = await postVariables(payload);

  console.log('POST variables API response:', apiResp);

  if (payload.variableCollections && payload.variableCollections.length) {
    console.log('Updated variable collections', payload.variableCollections);
  }

  if (payload.variableModes && payload.variableModes.length) {
    console.log('Updated variable modes', payload.variableModes);
  }

  if (payload.variables && payload.variables.length) {
    console.log('Updated variables', payload.variables);
  }

  if (payload.variableModeValues && payload.variableModeValues.length) {
    console.log('Updated variable mode values', payload.variableModeValues);
  }

  console.log('✅ Figma file has been updated with the new tokens');
}

main();
