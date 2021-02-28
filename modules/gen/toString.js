module.exports = (converted) => {
    let string = "";

    //render string line by line
    for (let row = 0; row < converted.length; row++) {
        for (let times = 1; times < 4; times++) {
            string += converted[row].map(element => element[`drawL${times}`]()).join("") + "\n";
        }
    }

    return string;
};