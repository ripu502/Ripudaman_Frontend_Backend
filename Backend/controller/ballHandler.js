const g = 10;
const fs = require("fs");
const dataPath = './data/data.json'

const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};

module.exports.getData = (req, res, next) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        res.json(JSON.parse(data));
    });
}


module.exports.makePredict = (req, res, next) => {
    let { height, e } = req.body;
    let arr = [{ 'height': height, 'time': 0 }];
    let t = 0;
    let bounce = 0;
    while (height > 0) {
        if (e >= 0.8) {
            res.status(200).json(
                {
                    response: 'bad value for the e'
                });
            break;
	return;
        }
        let v = Math.sqrt(2 * g * height);
        t = t + parseFloat((v / g).toFixed(1));
        let temp = { 'height': 0, 'time': t };
        arr.push(temp);
        height = (e * e * height).toFixed(0);
        if (height == 0) break;
        t = t + parseFloat((e * v / g).toFixed(1));
        bounce++;
        temp = { 'height': height, 'time': t };
        arr.push(temp);
    }
    let data = {
        response: 'done calculation',
        bounce: bounce,
        data: arr
    }
    writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).json(
            {
                data: 'posted'
            }
        )
    });

}


// add Bad Request
module.exports.badReq = (req, res, next) => {
    res.status(404).json(
        {
            response: 'bad request'
        });
}
