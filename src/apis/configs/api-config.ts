const hostDev = 'http://localhost:5500/';

const hostProduction = 'http://14.225.204.198:5500/';

const api = {
  development: hostDev,
  production: hostProduction,
};
//@ts-ignore
export default api[process.env.NODE_ENV];
