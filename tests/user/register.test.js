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


    const token = "eyJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJlbW1hbnVlbCIsImFwZWxsaWRvIjoicGVyZXoiLCJlbWFpbCI6ImVwZXJlekBtb29kdGVjaG5vbG9neS5jb20uYXIiLCJjb250cmFzZcOxYSI6IjEyMzQ1Njc4In0.Orbh6jg_gCIXp0WNA5YDZZi0cjXETamNX6vE3qvfTyU"


    const sendEmail = {
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
        envelopeTime: 602,
        messageTime: 551,
        messageSize: 2559,
        response: '250 2.0.0 OK  1676562110 q132-20020acac08a000000b0037d813cd612sm638915oif.43 - gsmtp',
        envelope: {
          from: 'no-remplay@correo.com',
          to: [ 'eperez@moodtechnology.com.ar' ]
        },
        messageId: '<c5051333-e47f-a309-c7cf-a726499acdcf@correo.com>'
      }
      

      const user = [
        {
          _id: "63ee746d9c8d9a974c81e1cf",
          nombre: 'emmanuel',
          apellido: 'perez',
          email: 'eperez@moodtechnology.com.ar',
          'contraseña': '$2b$12$vN0v5dHGR.4jN7rDaKjGt.qO8x9TXHzUBM/XDVUGivCA5C5JJAGr.'
        }
      ]


      

    context('When errors do not ocurrs', () => {
        it('Should return 200 if create a user successfully', async () => {

            sandbox.stub(UserModel, 'get').resolves([])
            sandbox.stub(Jwt, 'sing').resolves(token)
            sandbox.stub(EmailService, 'sendEmail').resolves(sendEmail)

            const req = mockRequest(data);
            const res = mockResponse();

            await handler(req, res);
            
            assert.deepStrictEqual(res.status, 200);
            assert.deepStrictEqual(res.json,{message: messageForCreatedUser(), code:2})


            sandbox.assert.calledOnceWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com.ar' });
            sandbox.assert.calledOnceWithExactly(Jwt.sing, data);
            sandbox.assert.calledOnce(EmailService.sendEmail);

        });

        it('Should return 200 if create a user successfully', async () => {

            sandbox.stub(UserModel, 'get').resolves(user)
            sandbox.stub(Jwt, 'sing')
            sandbox.stub(EmailService, 'sendEmail')

            const req = mockRequest(data);
            const res = mockResponse();

            await handler(req, res);
            
            assert.deepStrictEqual(res.status, 200);
            assert.deepStrictEqual(res.json,messageForExistantEmail())


            sandbox.assert.calledOnceWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com.ar' });
            sandbox.assert.notCalled(Jwt.sing);
            sandbox.assert.notCalled(EmailService.sendEmail);

        });


    })

    context('When an errors ocurrs', () => {

        Object.keys(data).forEach(field =>{
            it('Should return 400 if the data is invalid', async ()=>{

                sandbox.stub(UserModel, 'get');
                sandbox.stub(Jwt, 'sing');
                sandbox.stub(EmailService, 'sendEmail');


				        const req = mockRequest( {...data,[ field]: 5} );
				        const res = mockResponse();

			        	await handler(req, res);
                
                assert.deepStrictEqual(res.status, 400)
                assert.deepStrictEqual(res.json, { error: `"${field}" must be a string` })


                sandbox.assert.notCalled(UserModel.get);
                sandbox.assert.notCalled(Jwt.sing);
                sandbox.assert.notCalled(EmailService.sendEmail);

            })
        })
    
    })

    context('When database errors occur', () => {

        it('Should return 500 if an error occurs while registering a user in the database', async () => {


            sandbox.stub(UserModel, 'get').rejects(new Error('Error in get'));
            sandbox.stub(Jwt, 'sing');
            sandbox.stub(EmailService, 'sendEmail');

		        const req = mockRequest(data);
			      const res = mockResponse();
              
			      await handler(req, res);
              
			      assert.deepStrictEqual(res.status, 500);
			      assert.deepStrictEqual(res.json, { code: -1, error: "Error in get"});
              
			      sandbox.assert.calledOnceWithExactly(UserModel.get,{ email:  'eperez@moodtechnology.com.ar' });
			      sandbox.assert.notCalled(Jwt.sing);
			      sandbox.assert.notCalled(EmailService.sendEmail);
		});

    })

})