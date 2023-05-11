const getBaseURL = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
};

export const isSafeURL = (url) => {
  try {
    const parsedURL = new URL(url, getBaseURL());
    return ['http:', 'https:', 'mailto:', 'ftp:'].includes(parsedURL.protocol);
  } catch (e) {
    return false;
  }
};

export function sanitizeUrl(url) {
  if (!isSafeURL(url)) {
    return '#';
  }
  return url;
}
