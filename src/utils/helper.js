export const randString = (len) => {
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10);
    randStr += ch;
  }
  return randStr;
};
