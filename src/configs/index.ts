import appsettingsDevelopment from "./appsettings.Development.json";
import appsettingsProduction from "./appsettings.Production.json";
const settings = {
  development: appsettingsDevelopment,
  production: appsettingsProduction,
};

//@ts-ignore
export default settings[process.env.NODE_ENV];
