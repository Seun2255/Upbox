function arrayBreaker(files, size) {
  const bigArray = [];
  let batches = Math.ceil(files.length / size);

  for (let i = 0; i < batches; i++) {
    var mini = files.slice(i * size, i * size + size);
    bigArray.push(mini);
  }

  return bigArray;
}

export default arrayBreaker;
