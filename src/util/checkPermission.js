import { store } from "../store";

function CheckPermissions(name) {
  const Permission = store.getState();
  const checkPermission = Permission?.userReducer?.userModulePages;

  // console.log("checkPermission", checkPermission);
  // console.log("name", name);

  const filterPermissionByPage = checkPermission.map(
    (filteredObj) => filteredObj.actions
  );

  const getPermissionByName = filterPermissionByPage[0]
    ?.filter(({ action }) => action === name)
    ?.reduce((obj, item) => item.roleIsActive, {});

  // console.log("filterPermissionByPage", filterPermissionByPage);
  console.log("is Valid", name, getPermissionByName);

  return getPermissionByName;
}

export default CheckPermissions;
