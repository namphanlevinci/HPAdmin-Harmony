export const listUserArray = (list = []) => {
    let newArray = [];
  
    list.map((item) => {
      let userItem = {
        title: `${item.firstName} ${item.lastName}`,
        value: item.waUserId,
      };
      return newArray.push(userItem);
    });
    return newArray;
  };
  