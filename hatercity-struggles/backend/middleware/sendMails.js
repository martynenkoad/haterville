const nodemailer = require('nodemailer')

/**
 * Send Email with different options
 * @param {Object} options 
 * 
 */ 
const sendEmail = options => {
    // create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        // debug: true,
        logger: true
    }) 

    // define mail options
    let mailOptions = {
        from: process.env.EMAIL || 'martynenkoad4@gmail.com',
        to: options.email,
        subject: options.subject,
        html: options.html
    }

    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(`Error: ${error.message}`)
        console.log( `New message sent: ${info.response}`)
    })
}

module.exports = sendEmail