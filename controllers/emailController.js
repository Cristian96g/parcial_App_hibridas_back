// controllers/emailController.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Configura según tu proveedor de correo
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña',
    },
});

export const enviarCorreo = async (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;

    const mailOptions = {
        from: email,
        to: 'correo_destino@example.com',
        subject: 'Nuevo mensaje de formulario de contacto',
        html: `
            <p>Nombre: ${nombre}</p>
            <p>Email: ${email}</p>
            <p>Teléfono: ${telefono}</p>
            <p>Mensaje: ${mensaje}</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        res.status(200).json({ message: 'Formulario enviado correctamente.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el formulario. Inténtelo de nuevo más tarde.' });
    }
};
