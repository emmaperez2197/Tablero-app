const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const Token = require('../../helpers/JwtToken');

const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/recoverPassword');
const UserModel = require('../../src/models/User')
const message = require('../../src/messages/user/recoverPass');
const EmailService = require('../../services/EmailService');
const Bcrypt = require('../../helpers/bcrypt');
const { token } = require('morgan');

describe('Create confirm password api test', ()=>{

    afterEach(() => sandbox.restore());
    beforeEach(() => { process.env.KEY_PRELOGIN = true});


      
    const decodeData =  "eperez@moodtechnology.com.ar"
      
    const getUser = {
        _id: "63f67758c477e623e0248430",
        nombre: 'emmanuel',
        apellido: 'perez',
        email: 'eperez@moodtechnology.com.ar',
        'contraseña': '$2b$12$rQ5WuqBBapOkvhaC0IHieO9CXVfSs0yd4/IURy5eZZ40g6QUGFmDW'
      }
       
    const hash = '$2b$12$ym5qhZZ4PQewUxAlqP8XdemtftvFwr9GpE9Bw84e1y2yjYtDCzxHS'
 

    const body = { nuevaContraseña: "123456789"}



    const userUpdated = {
      lastErrorObject: { n: 1, updatedExisting: true },
      value: {
        _id: "63f67758c477e623e0248430",
        nombre: 'emmanuel',
        apellido: 'perez',
        email: 'eperez@moodtechnology.com.ar',
        'contraseña': '$2b$12$rQ5WuqBBapOkvhaC0IHieO9CXVfSs0yd4/IURy5eZZ40g6QUGFmDW'
      },
      ok: 1
    }
    
    const token = 'eyJhbGciOiJIUzI1NiJ9.ZXBlcmV6QG1vb2R0ZWNobm9sb2d5LmNvbS5hcg.Y9U8KcbZ9sHkTRPPgSCMYv64VT2fct1Z4WS--nqlyiM'


    context('When errors do not ocurrs', () => {
        it.only('Should return 200 if the user is successfully confirmed', async () => {

            sandbox.stub(Token, 'decode').resolves(decodeData);
            sandbox.stub(UserModel, 'get').resolves(getUser);
            sandbox.stub(Bcrypt, 'hashUser').resolves(hash);
            sandbox.stub(UserModel, 'findOneAndModify').resolves(userUpdated)



            const req = mockRequest(body, token);
            const res = mockResponse();

            await handler(req, res)

            assert.deepStrictEqual(res.status, {});
            // assert.deepStrictEqual(res.json, {message: message.messageSendEmail(getData[0].email), code:2})

            // sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com.ar' });
            // sandbox.assert.alwaysCalledWithExactly(Token.sing, "eperez@moodtechnology.com.ar"  )

        });



    })

    context('When an errors ocurrs', () => {

     
    
    })

    context('When database errors occur', () => {


    })

})