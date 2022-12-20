const getDateString = (file) => {
  if (!file && path.extname(file) !== ".csv") return "";
  return file.split(".")[0].split("_")[1];
};

module.exports = {
  getDateString,
};
