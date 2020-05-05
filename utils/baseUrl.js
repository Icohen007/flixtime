const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://flixtime.now.sh'
  : 'http://localhost:3000/api';

export default baseUrl;
