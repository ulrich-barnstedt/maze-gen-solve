const colors = require("0x81-utils").terminal.stdcolor;

let obj = {
    char : "██",
    empty : "  ",
    middleChar : "  "
}

obj.colored = {
    atMiddle : colors.BgGreen + obj.middleChar + colors.reset,
    passedMiddle : colors.BgBlue + obj.middleChar + colors.reset ,
    at : colors.BgGreen + obj.empty + colors.reset,
    passed : colors.BgBlue + obj.empty + colors.reset,
    goal : colors.BgRed + obj.middleChar + colors.reset
}

module.exports = obj;