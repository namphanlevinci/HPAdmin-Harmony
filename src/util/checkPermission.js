import { store } from "../store";

function CheckPermissions(permissionId) {
  const Permission = store.getState();
  const checkPermission = Permission?.userReducer?.UserPermissions;

  // console.log("checkPermission", checkPermission);
  // console.log("permissionId", permissionId);

  const filterPermissionByPage = checkPermission?.map(
    (filteredObj) => filteredObj.actions
  );

  const getPermissionByName = filterPermissionByPage[0]
    ?.filter(({ actionId }) => actionId === permissionId)
    ?.reduce((obj, item) => item.roleIsActive, {});

  // console.log("filterPermissionByPage", filterPermissionByPage);
  // console.log("getPermissionByName", getPermissionByName);
  // console.log("is Valid", permissionId, getPermissionByName);

  return getPermissionByName;
}

export default CheckPermissions;
