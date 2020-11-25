"use strict"
const nodemailer = require('nodemailer')

var smtpTransport = require('nodemailer-smtp-transport');



const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '********@gmail.com',
        pass: '********'
    }
}))
const message = {
    from: 'hestonamillera@gmail.com',  // email адрес отправителя сообщения, дополнительно может быть указано
    to: "slavamyraxin@icloud.com", // адрес получателя, через запятую или в виде массива можно указать множество получателей
    subject: "Attachments", // тема сообщения
    text: "This message with attachments.", // текст сообщения
    html: "This <i>message</i> with <strong>attachments</strong>.", //текст сообщения в формате HTML
    // прикрепленные к сообщению файлы.
    // attachments: [
    //     { filename: 'greetings.txt', path: '/assets/files/' }, // filename - имя файла в сообщении
    //     { filename: 'greetings.txt', content: 'Message from file.' }, // content - содержимое файла
    //     // path - путь к файлу, который будет передан потоком, его именем будет значение, указанное в filename
    //     // href - путь к файлу, который будет вложен в сообщение;
    //     { path: 'data:text/plain;base64,QmFzZTY0IG1lc3NhZ2U=' },
    //     {
    //         raw: `
    //       Content-Type: text/plain 
    //       Content-Disposition: attachment;

    //       Message from file.
    //     `}
    // ]
    // contentType - тип содержимого файла;
    // contentDisposition;
    // encoding - кодировка содержимого файла;
    // raw - задание файла в "сыром".
}
const mailer = message => {
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}
console.log(mailer);
