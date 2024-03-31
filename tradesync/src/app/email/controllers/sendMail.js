const nodemailer = require("nodemailer");



const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    let transport = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: 'josephine.carroll6@ethereal.email',
            pass: 'uUYUux6bDFvreeqn9X'
        },
    });

    let info = await transport.sendMail({
        from: '"Ayush Khalate 👻" <ayushkhalate@gmail.com>', // sender address
        to: " prathikkshetty15@gmail.com", // list of receivers
        subject: "Hello Tradesync Users", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body

    });
    console.log("Message sent: %s", info.messageId);
    res.json(info);



    

};

module.exports = sendMail;