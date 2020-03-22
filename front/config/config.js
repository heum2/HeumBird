const backUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.heumbird.com'
    : 'http://localhost:3060';

const frontUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://heumbird.com'
    : 'http://localhost:3000';

export { backUrl, frontUrl };
