import configureStore from "../store";

const { store } = configureStore();

function CheckPermissions(name, permissionName) {
  const getPermission = store.getState();
  const checkPermission = getPermission?.userReducer?.userModulePages;

  // console.log("Permissions", checkPermission);
  const findModuleByName = checkPermission.filter(
    (module) => module.modulePage === name
  );
  // console.log("findModuleByName", findModuleByName);

  const checkValid = findModuleByName[0]?.actions?.filter((permission) => {
    // console.log("permission", permission);
    if (permission.action === permissionName) {
      return permission.roleIsActive;
    }
  });

  // console.log("checkValid", checkValid);
}

export default CheckPermissions;
