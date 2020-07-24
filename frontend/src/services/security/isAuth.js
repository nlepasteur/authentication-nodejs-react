export default () => {
  if (localStorage.getItem("token")) {
    return ["user"];
  }
  return null;
};
