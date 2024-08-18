export const catchInvalidProps = (reqObj, scheObj) =>
  Object.keys(reqObj)?.filter((key) => !scheObj[key]);
