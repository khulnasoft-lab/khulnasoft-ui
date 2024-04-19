/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
require('dotenv').config();

if (!process.env.FIGMA_ACCESS_TOKEN || !process.env.FIGMA_FILE_KEY) {
  throw new Error('FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY environment variables are required');
}

/**
 * Get local variables from Figma
 * @returns {object} data - local variables from FIGMA_FILE_KEY
 */
const getLocalFigmaVariables = async () => {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}/variables/local`,
      {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}, Body: ${responseBody}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Post payload to Figma
 * @param {object} payload
 * @returns {object} data - response from Figma API
 */
const postFigmaPayload = async (payload) => {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}/variables`,
      {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}, Body: ${responseBody}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error.message);
    throw error;
  }
};

module.exports = {
  getLocalFigmaVariables,
  postFigmaPayload,
};
