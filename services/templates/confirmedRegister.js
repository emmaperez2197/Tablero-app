/* eslint-disable */
const validateEmail = (token) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap">
</head>

<body>
    <table style="font-size: 20px; width: 500px;font-family: Quicksand, Helvetica, Arial, sans-serif;">
        <tr>
            <td>
                <center>
                </center>
            </td>
        </tr>
        <tr>
            <td>
                <center>
                    <p style="margin-top: -10px;">Hola, ya casi terminamos!</p>
                    <p>Para finalizar el registro debe ingresar al siguiente enlace:</p><br />
                </center>
            </td>
        </tr>
        <tr>
            <td>
                <center>
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="border-radius: 20px !important ;" bgcolor="#d41f1f">
                                <a href="http://localhost:7777/confirm-register.html?token=${token}" target="_blank"
                                    style="padding: 10px 20px;font-size: 20px;color: #ffffff;text-decoration: none;display: inline-block;">
                                    Confirmar Registro
                                </a>
                            </td>
                        </tr>
                    </table>
                </center>
            </td>
        </tr>
        <tr>
        </tr>
        <tr>
            <td>
                <center>
                    <br />
                    <p>Si usted no se registró en la aplicación, simplemente desestime el correo.</p><br />
                </center>
            </td>
        </tr>
    </table>

</body>

</html>;`

module.exports = validateEmail;
