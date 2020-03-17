const backUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.heumbird.com'
    : 'http://localhost:3060';

export { backUrl };
