// https://www.wenjiangs.com/doc/chainasync
function chainAsync(fns) {
  let index = 0
  const next = () => fns[index++](next)
  next();
}

// ==TEST==

chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
  },
]);
