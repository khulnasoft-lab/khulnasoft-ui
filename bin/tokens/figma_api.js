/* eslint-disable no-console */
/**
 *
 * @returns
 */
const getLocalVariables = async () => {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}/variables/local`,
      {
        headers: {
          Accept: '*/*',
          'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

/**
 *
 * @param {JSON} payload
 * @returns
 */
const postVariables = async (payload) => {
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
      throw new Error(`Failed to post data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error.message);
    throw error;
  }
};

module.exports = {
  getLocalVariables,
  postVariables,
};
