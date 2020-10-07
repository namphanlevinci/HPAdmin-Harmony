import { store } from "../store";

function CheckPermissions(permissionName) {
  const Permission = store.getState();
  const checkPermission = Permission?.userReducer?.UserPermissions;

  // console.log("checkPermission", checkPermission);
  // console.log("permissionId", permissionName);

  const filterPermissionByPage = checkPermission?.map(
    (filteredObj) => filteredObj.actions
  );

  const getPermissionByName = filterPermissionByPage[0]
    ?.filter(
      ({ action }) => JSON.stringify(action) === JSON.stringify(permissionName)
    )
    ?.reduce((obj, item) => item.roleIsActive, {});

  // console.log("filterPermissionByPage", filterPermissionByPage[0]);
  // console.log("getPermissionByName", getPermissionByName);
  // console.log("is Valid", permissionName, getPermissionByName);

  return getPermissionByName;
}

export default CheckPermissions;
