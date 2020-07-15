import configureStore from "../store";

const { store } = configureStore();

function CheckPermissions(name, permissionName) {
  //   const Permissions = this.props.checkPermission;

  const getPermission = store.getState();
  const checkPermission =
    getPermission?.userReducer?.checkPermission?.userModulePages;

  // console.log("Permissions", checkPermission);

  const filterRoleByName = checkPermission
    .filter((pageName) => pageName.modulePage === name)
    .map((item) => item.actions);

  const filterByAction = filterRoleByName[0].filter((permission) => {
    if (permission.action === permissionName) {
      // console.log("permission", permission);
      return { ...permission?.roleIsActive };
    } else {
      return false;
    }
  });

  // console.log("filterByAction", filterByAction);
}

export default CheckPermissions;
