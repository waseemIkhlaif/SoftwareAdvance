const express = require ('express');
const { sendMaill, compareCodes } = require('./emailcontroller.js');

const app = express();
app.use(express.json());

let codeSentToEmail = ''; 


app.post('/send-email',  async function (req, res) {
    const { email } = req.body;

    try{
        
    await sendMaill(email); 
    console.log(email);
    return res.status(200).json({ message: 'sent successfully' });
    }catch(err){
        return res.status(500).json({ message:err})
    }
});


app.post('/compare-codes', (req, res) => {
    const { providedCode } = req.body;
    const isMatch = compareCodes( providedCode);

    if (isMatch) {
        res.status(200).json({massege :"Codes match."});
    } else {
        res.status(400).json({massege :"Codes not match."});
    }
});

module.exports = app;