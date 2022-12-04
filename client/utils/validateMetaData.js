function validateMetaData(input) {
  let isValid = true;
  process.env.REACT_APP_META_DATA_PROPS.split(",").forEach((element) => {
    if (input[element] === undefined) isValid = false;
  });
  return isValid;
}

export default validateMetaData;
