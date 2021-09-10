const fs = require('fs');
const path = require('path');


exports.getPDF = (req, res, next) => {
    const pdfPath = path.join(__dirname, '/v3-a4-header.pdf');
    fs.readFile(pdfPath, (err, data) => {
        if (err) {
            return next(err);
        }
        console.log('here');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
        res.send(data);
    });
};

// exports.postPDF = (req, res, next) => {
//     console.log('body', req.body);
//     console.log('query', req.query);
//     res.status(200).json({response: 'hello from backend!'});
// };

exports.postPDF = (req, res, next) => {
    const pdfPath = path.join(__dirname, '/v3-a4-header.pdf');
    res.setHeader('Content-Type', 'application/pdf');    const file = fs.createReadStream(pdfPath);
    file.pipe(res);
};