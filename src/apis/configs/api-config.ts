const hostDev = 'http://localhost:5500/';

const hostProduction = '/api';

const api = {
  development: hostDev,
  production: hostProduction,
};
//@ts-ignore
export default api[process.env.NODE_ENV];
