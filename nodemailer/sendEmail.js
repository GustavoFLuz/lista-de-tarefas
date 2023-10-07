import nodemailer from 'nodemailer';

const variavelDeAmbiente =  process.env.EMAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lista.de.tarefas.s107@gmail.com',
        pass: 'lista-de-tarefas-s107',
    },
});

const mailOptions = {
    from: 'lista.de.tarefas.s107@gmail.com',
    to: `${variavelDeAmbiente}`,
    subject: 'Modificações feitas no repositório.',
    text: 'O pipeline está sendo executado.',
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Erro ao enviar o email: ' + error);
    } else {
        console.log('Email enviado com sucesso: ' + info.response);
    }
});
