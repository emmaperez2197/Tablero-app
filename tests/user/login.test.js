const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const Token = require('../../helpers/JwtToken');
const Bcrypt = require('../../helpers/bcrypt')
const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/login');
const UserModel = require('../../src/models/User')
const message = require('../../src/messages/user/login');



describe('Create register api test', ()=>{

    afterEach(() => sandbox.restore());
    beforeEach(() => { process.env.KEY_PRELOGIN = true});


    const data = {
        email: "eperez@moodtechnology.com",
        contraseña: "12345678"
    }

    const getData = [
        {
          _id:"63ee9fd0321dd7a38a25dd2b",
          nombre: 'emmanuel',
          apellido: 'perez',
          email: 'eperez@moodtechnology.com',
          'contraseña': '$2b$12$eTX6zsggrVbri.KLNXX1FOd8ltmMPj6A2UhbTjJJWZn2OJjLBB/J2'
        }
      ]
      


    const token =' eyJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJlbW1hbnVlbCIsImFwZWxsaWRvIjoicGVyZXoiLCJlbWFpbCI6ImVwZXJlekBtb29kdGVjaG5vbG9neS5jb20iLCJjb250cmFzZcOxYSI6IjEyMzQ1Njc4In0.hyK57S2NGqdfnJs4XPNtijAo4q_FV7Ta6hKr6_uiExc'
      

    context('When errors do not ocurrs', () => {
        it.only('Should return 200 if login a user successfully', async () => {

            sandbox.stub(UserModel, 'get').resolves(getData);
            sandbox.stub(Bcrypt, 'anHash').resolves(true);
            sandbox.stub(Token, 'sing').resolves(token)

            const req = mockRequest(data);
            const res = mockResponse();

            await handler(req, res)

        });


    })

    context('When an errors ocurrs', () => {

    
    })

    context('When database errors occur', () => {

        it('Should return 500 if an error occurs while registering a user in the database', async () => {

		});

    })

})