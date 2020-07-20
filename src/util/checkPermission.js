import { store } from "../store";

function CheckPermissions(name, permissionName) {
  const Permission = store.getState();
  const checkPermission = Permission?.userReducer?.userModulePages;

  console.log("name", name);
  console.log("permissionName", permissionName);

  // const filterPermissionByPage = checkPermission.map(
  //   (page) => page.modulePage === name
  // );

  // const filterPermissionByPage = checkPermission
  //   ?.filter((obj) => obj.modulePage === name)
  //   .map((filteredObj) => filteredObj.actions);

  // const coverToObject = filterPermissionByPage[0].reduce(
  //   (obj, item) => ({ ...obj, [item.action]: item.roleIsActive }),
  //   {}
  // );

  // const getPermissionByName = filterPermissionByPage[0]
  //   .filter(({ action }) => action === permissionName)
  //   .reduce((obj, item) => item.roleIsActive, {});

  // const checkPermissionByRole = coverToObject.filter(
  //   (role) => role === permissionName
  // );

  // console.log("filterPermissionByPage", filterPermissionByPage);
  // console.log("getPermissionByName", getPermissionByName);

  // return getPermissionByName;
}

export default CheckPermissions;
