const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const Token = require('../../helpers/JwtToken');
const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/recoverPassword');
const UserModel = require('../../src/models/User')
const message = require('../../src/messages/user/recoverPass');
const EmailService = require('../../services/EmailService');
const recoverPass = require('../../services/templates/recover-password')

describe('Create register api test', ()=>{

    afterEach(() => sandbox.restore());
    beforeEach(() => { process.env.KEY_PRELOGIN = true});


    const getData = [
        {
          _id: "63f67758c477e623e0248430",
          nombre: 'emmanuel',
          apellido: 'perez',
          email: 'eperez@moodtechnology.com.ar',
          'contraseña': '$2b$12$Nxh.vUxVR9bLBbDAd.TEh.CNzqRZ/WSOBkFxCTt.8VkOKfXkM9kTC'
        }
      ]
      
    const token = 'eyJhbGciOiJIUzI1NiJ9.ZXBlcmV6QG1vb2R0ZWNobm9sb2d5LmNvbS5hcg.Y9U8KcbZ9sHkTRPPgSCMYv64VT2fct1Z4WS--nqlyiM'



    const sendEmail =  {
        accepted: [ 'eperez@moodtechnology.com.ar' ],
        rejected: [],
        ehlo: [
          'SIZE 35882577',
          '8BITMIME',
          'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
          'ENHANCEDSTATUSCODES',
          'PIPELINING',
          'CHUNKING',
          'SMTPUTF8'
        ],
        envelopeTime: 1783,
        messageTime: 802,
        messageSize: 2340,
        response: '250 2.0.0 OK  1677096817 o2-20020a4a84c2000000b0051d13098c54sm1485547oog.19 - gsmtp',
        envelope: {
          from: 'no-remplay@correo.com',
          to: [ 'eperez@moodtechnology.com.ar' ]
        },
        messageId: '<7082b893-d1a3-1dd6-8f14-913e08143431@correo.com>'
      }
      
      const body = { email: "eperez@moodtechnology.com.ar" }
 


    context('When errors do not ocurrs', () => {
        it('Should return 200 if you successfully send the registration email', async () => {

            sandbox.stub(UserModel, 'get').resolves(getData);
            sandbox.stub(Token, 'sing').resolves(token);
            sandbox.stub(EmailService, 'sendEmail').resolves(sendEmail);


            const req = mockRequest(body);
            const res = mockResponse();

            await handler(req, res)

            assert.deepStrictEqual(res.status, 200);
            assert.deepStrictEqual(res.json, {message: message.messageSendEmail(getData[0].email), code:2})

            sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com.ar' });
            sandbox.assert.alwaysCalledWithExactly(Token.sing, "eperez@moodtechnology.com.ar"  )
            // sandbox.assert.alwaysCalledWithExactly(EmailService.sendEmail,"eperez@moodtechnology.com.ar", message.recoverPass, recoverPass() )

        });


        it('Should return 200 if the user does not exist when querying the database', async () => {

          sandbox.stub(UserModel, 'get').resolves([]);
          sandbox.stub(Token, 'sing');
          sandbox.stub(EmailService, 'sendEmail');


          const req = mockRequest(body);
          const res = mockResponse();

          await handler(req, res)

          assert.deepStrictEqual(res.status, 200);
          assert.deepStrictEqual(res.json, {message: message.userNotExist, code:2})

          sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com.ar' });
          sandbox.assert.notCalled(Token.sing);
          sandbox.assert.notCalled(EmailService.sendEmail);


      });

    })

    context('When an errors ocurrs', () => {

        it('Should return 400 if the data is invalid.', async () => {

          sandbox.stub(UserModel, 'get');
          sandbox.stub(Token, 'sing');
          sandbox.stub(EmailService, 'sendEmail');


          const req = mockRequest({...body, email: 5});
          const res = mockResponse();

          await handler(req, res)

          assert.deepStrictEqual(res.status, 400);
          assert.deepStrictEqual(res.json, {error: "\"email\" must be a string"})

          sandbox.assert.notCalled(UserModel.get);
          sandbox.assert.notCalled(Token.sing);
          sandbox.assert.notCalled(EmailService.sendEmail);


      });
    
    })

    context('When database errors occur', () => {

        it('Should return 500 if an error occurs while registering a user in the database', async () => {

          sandbox.stub(UserModel, 'get').rejects(new Error('error in get'));
          sandbox.stub(Token, 'sing');
          sandbox.stub(EmailService, 'sendEmail');


          const req = mockRequest(body);
          const res = mockResponse();

          await handler(req, res)

          assert.deepStrictEqual(res.status, 500);
          assert.deepStrictEqual(res.json, {error: "Error: error in get"})

          sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com.ar' } );
          sandbox.assert.notCalled(Token.sing);
          sandbox.assert.notCalled(EmailService.sendEmail);

		});

    })

})