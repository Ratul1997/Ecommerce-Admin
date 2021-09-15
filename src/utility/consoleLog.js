/*eslint-disable*/
const consoleLog = data => {
  if (process.env.REACT_APP_BASENAME === "development") {
    console.log(data);
  }
};
export default consoleLog