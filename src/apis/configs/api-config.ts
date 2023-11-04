const hostDev = "localhost:5500/api";

const hostProduction = "";

const api = {
  development: hostDev,
  production: hostProduction,
};
//@ts-ignore
export default api[process.env.NODE_ENV];
