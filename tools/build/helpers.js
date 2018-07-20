module.exports = {
  parseArr: (arr) => (arg, arg1) =>
    arr
      .map((item) => item(arg, arg1))
      .filter((item) => !!item)
}
