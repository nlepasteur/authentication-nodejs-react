import isAuth from "./isAuth";

function hasRoles(roles) {
  if (roles) {
    const userRoles = isAuth();

    if (
      roles.length > 0 &&
      (userRoles === null || Array.isArray(userRoles) === false)
    ) {
      return false;
    }

    return roles.every((role) => {
      return userRoles.includes(role);
    });
  }
}

export default hasRoles;
