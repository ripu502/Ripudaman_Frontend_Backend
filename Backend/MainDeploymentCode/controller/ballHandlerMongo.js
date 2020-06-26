const g = 10;
const Ball = require('../Model/Ball');

module.exports.getData = (req, res, next) => {
    Ball.find()
        .then(ball => {
            res
                .status(200)
                .json(ball[0]);
        })
        .catch(err => {
            console.log('Req failed in getting the data');
            res
                .status(200)
                .json(
                    {
                        response: 'Failed',
                        msg: 'Message Sorry we Failed Try again.'
                    })
        })
}


module.exports.makePredict = (req, res, next) => {
    let { height, e } = req.body;
    if (height <= 0) {
        res
            .status(200)
            .json(
                {
                    response: 'Failed',
                    msg: 'InValid Height try Again.'
                })
        return;
    }
    if (e >= 0.8) {
        res
            .status(200)
            .json(
                {
                    response: 'Failed',
                    msg: `Sorry can't Process this Value.`
                })
        return;
    }


    let heights = [height];
    let times = ['0']
    let t = 0;
    let bounce = 0;
    while (height > 0) {
        let v = Math.sqrt(2 * g * height);
        t = t + parseFloat((v / g).toFixed(1));
        heights.push('0');
        times.push(t);
        height = (e * e * height).toFixed(0);
        if (height == 0) break;
        t = t + parseFloat((e * v / g).toFixed(1));
        bounce++;
        heights.push(height);
        times.push(t);
    }
    Ball.findById('5ef501ee39646cd7a685fcd8')
        .then(ball => {
            ball.height = [...heights];
            ball.time = [...times];
            ball.bounce = bounce;
            ball.e = e;
            ball.h = req.body.height;
            ball.save().then((done) => {
                res.status(200).json(
                    {
                        response: 'done'
                    })
            }).catch(err => {
                res.status(200).josn(
                    {
                        response: 'Failed'
                    })
            })
        })
        .catch(err => {
            res.status(200).josn(
                {
                    response: 'Failed'
                })
        });

}

module.exports.badReq = (req, res, next) => {
    res.status(404).json(
        {
            response: 'Failed',
            msg:'Bad Request'
        });
}
