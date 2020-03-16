const backUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://api.heumbird.com'
    : 'http://localhost:3060';

export { backUrl };
