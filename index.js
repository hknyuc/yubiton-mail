
const nodemailer = require('nodemailer');
class Sender {
    constructor(transporterOption) {
        this.transporterOption = transporterOption;
    }

    /**
 * 
 * @param {Object} options 
 * @param {String} options.to gönderilecek kişi
 * @param {String} options.from gönderecek kişi
 * @param {String} options.subject başlık
 * @param {String} options.content içerik
 */
    async send(options) {
        /*
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youremail@gmail.com',
                pass: 'yourpassword'
            }
        });
        */
        let transporter = nodemailer.createTransport(this.transporterOption);

        var mailOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            html: options.content
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                    return;
                } 
                resolve(info.response);
            });
        });
    }
}

module.exports.Sender = Sender;


/**
 * 
 * @param {Object} options 
 * @param {String} options.service
 * @param {Object} options.auth
 * @param {String} options.auth.user;
 * @param {String} options.auth.pass
 */
module.exports.mail = function (options){
    return function (container){

        container.addWith('mail.sender',()=>new Sender(options));
    }
}