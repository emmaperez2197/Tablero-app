const sandbox = require('sinon').createSandbox();
const assert = require('assert');
const Jwt = require('../../helpers/JwtToken');

const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/register');
const UserModel = require('../../src/models/User')
const EmailService = require('../../services/EmailService');
const {messageForCreatedUser,messageForExistantEmail } = require('../../src/messages/user/register');

describe('Create register api test', ()=>{

    afterEach(() => sandbox.restore());
    beforeEach(() => { process.env.KEY_PRELOGIN = true});


    const data = {
        nombre: "emmanuel",
        apellido: "perez",
        email: "eperez@moodtechnology.com.ar",
        contraseña: "12345678"
    }


    context('When errors do not ocurrs', () => {
        it('Should return 200 if create a user successfully', async () => {


        });

        it('Should return 200 if create a user successfully', async () => {


        });


    })

    context('When an errors ocurrs', () => {

    
    })

    context('When database errors occur', () => {

        it('Should return 500 if an error occurs while registering a user in the database', async () => {


		});

    })

})