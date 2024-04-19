/* eslint-disable no-console */
const { getLocalFigmaVariables, postFigmaPayload } = require('./tokens/figma_api');
const { generatePostVariablesPayload, readTokenFiles } = require('./tokens/figma_payload');

// TODOs:
// - [ ] figure out aliasing

// MAYBEs:
// - [ ] add a --skip flag to skip over listed files
// - [ ] add a --only flag to only update listed files
// - [ ] update the hard coded collection names to be dynamic

async function handlePayload(payload, dryRun, verbose) {
  if (verbose) {
    console.log('--------------------------------');
    console.log('✅ Generated Figma payload.');
  }

  if (Object.values(payload).every((value) => value.length === 0)) {
    console.log('--------------------------------');
    console.log('🎉 Tokens are already up to date with the Figma file');
    return;
  }

  if (!dryRun) {
    const apiResp = await postFigmaPayload(payload);
    console.log('POST variables API response:', apiResp);
  }

  if (verbose && payload.variableCollections && payload.variableCollections.length) {
    console.log('↪ Updated variable collections', payload.variableCollections);
  }

  if (verbose && payload.variableModes && payload.variableModes.length) {
    console.log('↪ Updated variable modes', payload.variableModes);
  }

  if (verbose && payload.variables && payload.variables.length) {
    console.log('↪ Updated variables', payload.variables);
  }

  if (verbose && payload.variableModeValues && payload.variableModeValues.length) {
    console.log('↪ Updated variable mode values:');
    console.dir(payload.variableModeValues, { depth: null });
  }

  if (dryRun) {
    console.log('--------------------------------');
    console.log('🚨 Dry run mode enabled, payload has not been sent to Figma');
  } else {
    console.log('--------------------------------');
    console.log('🎉 Figma file has been updated with the new tokens');
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const verbose = process.argv.includes('--verbose') || process.argv.includes('-v') || dryRun;

  if (!process.env.FIGMA_ACCESS_TOKEN || !process.env.FIGMA_FILE_KEY) {
    throw new Error('🚨 FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY environment variables are required');
  }

  const constantsTokens = readTokenFiles('src/tokens/constants');

  if (verbose) {
    console.log('--------------------------------');
    console.log(`✅ Read ${Object.keys(constantsTokens).length} constants files.`);
  }

  const modeTokens = readTokenFiles('src/tokens/modes');

  if (verbose) {
    console.log('--------------------------------');
    console.log(`✅ Read ${Object.keys(modeTokens).length} tokens files.`);
  }

  const localVariables = await getLocalFigmaVariables();

  if (verbose) {
    console.log('--------------------------------');
    console.log('✅ Fetched local Figma variables:');
    console.dir(localVariables, { depth: null });
  }

  const constantsPayload = generatePostVariablesPayload(
    constantsTokens,
    localVariables,
    'constants'
  );
  handlePayload(constantsPayload, dryRun, verbose);

  const modesPayload = generatePostVariablesPayload(modeTokens, localVariables, 'modes');
  handlePayload(modesPayload, dryRun, verbose);
}

main();
