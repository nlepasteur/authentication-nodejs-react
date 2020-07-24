import getToken from "./isAuth";

function hasRoles(roles, stateRoles) {
  if (roles) {
    const token = getToken();

    if (
      roles.length > 0 &&
      (token === null || Array.isArray(stateRoles) === false)
    ) {
      return false;
    }

    return roles.every((role) => {
      return stateRoles.includes(role);
    });
  }
  return true;
}

export default hasRoles;
