const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const Token = require('../../helpers/JwtToken');
const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/changesPass');
const UserModel = require('../../src/models/User')
const { mensajes } = require('../../src/messages/user/login');
const EmailService = require('../../services/EmailService');
const Bcrypt = require('../../helpers/bcrypt');

describe('Create recover password api test', ()=>{

    afterEach(() => sandbox.restore());
    beforeEach(() => { process.env.KEY_PRELOGIN = true});

    const fakeBody = {
        oldPassword: "123456789",
        newPassword:"12345678"
    }


    const getOne = {
        _id: "63f7d55002ce194ee405172a",
        nombre: 'emmanuel',
        apellido: 'perez',
        email: 'eperez@moodtechnology.com.ar',
        'contraseña': '$2b$12$Op9ckiv6THL0pvrXqadPPOJ.eBHyLsQWDQn1CtAdrJO615lvmxHm.'
      }


    const hash = '$2b$12$C7lpFt4Su4ERBSbiMmDAXulnFMEs7S3pqsSYVXEaXEZtlekM0WbrS'

    const userUpdated = {
        lastErrorObject: { n: 1, updatedExisting: true },
        value: {
          _id: "63f7d55002ce194ee405172a",
          nombre: 'emmanuel',
          apellido: 'perez',
          email: 'eperez@moodtechnology.com.ar',
          'contraseña': '$2b$12$Op9ckiv6THL0pvrXqadPPOJ.eBHyLsQWDQn1CtAdrJO615lvmxHm.'
        },
        ok: 1
      }
        
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
        envelopeTime: 671,
        messageTime: 668,
        messageSize: 1125,
        response: '250 2.0.0 OK  1677202519 v26-20020a4a695a000000b005252e5b6604sm683799oof.36 - gsmtp',
        envelope: {
          from: 'no-remplay@correo.com',
          to: [ 'eperez@moodtechnology.com.ar' ]
        },
        messageId: '<af363c41-970d-3327-294b-6ba3b8cd9ddb@correo.com>'
      }
      
 

    context('When errors do not ocurrs', () => {

        it('Should return 200 if you change the password successfully', async () => {
            
            sandbox.stub(UserModel, 'getOne').resolves(getOne);
            sandbox.stub(Bcrypt, 'anHash').resolves(true);
            sandbox.stub(Bcrypt, 'hashUser').resolves(hash);
            sandbox.stub(UserModel, 'findOneAndModify').resolves(userUpdated);
            sandbox.stub(EmailService, 'sendEmail').resolves(sendEmail);



            const req = mockRequest(fakeBody, {}, {}, {email:'eperez@moodtechnology.com.ar' });
            const res = mockResponse();
            
            await handler(req, res);

            assert.deepStrictEqual(res.status, 200);
            assert.deepStrictEqual(res.json, {message: mensajes.changesPass, code: 2});

            sandbox.assert.calledOnceWithExactly(UserModel.getOne, {email: 'eperez@moodtechnology.com.ar'});
            sandbox.assert.calledOnceWithExactly(Bcrypt.anHash, '123456789','$2b$12$Op9ckiv6THL0pvrXqadPPOJ.eBHyLsQWDQn1CtAdrJO615lvmxHm.');
            sandbox.assert.calledOnceWithExactly(Bcrypt.hashUser, '12345678');
            sandbox.assert.calledOnceWithExactly(UserModel.findOneAndModify, getOne._id, {contraseña: hash});

        });

    })

    context('When an errors ocurrs', () => {

          it('Should return 400 if data invalid', async () => {
                
            sandbox.stub(UserModel, 'getOne');
            sandbox.stub(Bcrypt, 'anHash');
            sandbox.stub(Bcrypt, 'hashUser');
            sandbox.stub(UserModel, 'findOneAndModify');
            sandbox.stub(EmailService, 'sendEmail');

            const req = mockRequest({...fakeBody, oldPassword:5}, {}, {}, {email:'eperez@moodtechnology.com.ar' });
            const res = mockResponse();
            
            await handler(req, res);

            assert.deepStrictEqual(res.status, 400);
            assert.deepStrictEqual(res.json, {error: "\"oldPassword\" must be a string"});

            sandbox.assert.notCalled(UserModel.getOne);
            sandbox.assert.notCalled(Bcrypt.anHash);
            sandbox.assert.notCalled(Bcrypt.hashUser);
            sandbox.assert.notCalled(UserModel.findOneAndModify);

        });

          it('Should return 400 if data invalid', async () => {
                  
            sandbox.stub(UserModel, 'getOne');
            sandbox.stub(Bcrypt, 'anHash');
            sandbox.stub(Bcrypt, 'hashUser');
            sandbox.stub(UserModel, 'findOneAndModify');
            sandbox.stub(EmailService, 'sendEmail');

            const req = mockRequest({...fakeBody, newPassword:5}, {}, {}, {email:'eperez@moodtechnology.com.ar' });
            const res = mockResponse();
            
            await handler(req, res);

            assert.deepStrictEqual(res.status, 400);
            assert.deepStrictEqual(res.json, {error: "\"newPassword\" must be a string"});

            sandbox.assert.notCalled(UserModel.getOne);
            sandbox.assert.notCalled(Bcrypt.anHash);
            sandbox.assert.notCalled(Bcrypt.hashUser);
            sandbox.assert.notCalled(UserModel.findOneAndModify);

        });


        it('Should return 400 if password incorrect', async () => {
            
          sandbox.stub(UserModel, 'getOne').resolves(getOne);
          sandbox.stub(Bcrypt, 'anHash').resolves(false);
          sandbox.stub(Bcrypt, 'hashUser');
          sandbox.stub(UserModel, 'findOneAndModify');
          sandbox.stub(EmailService, 'sendEmail');



          const req = mockRequest(fakeBody, {}, {}, {email:'eperez@moodtechnology.com.ar' });
          const res = mockResponse();
          
          await handler(req, res);

          assert.deepStrictEqual(res.status, 400);
          assert.deepStrictEqual(res.json, {message: mensajes.passwordInvalid, code: 1});

          sandbox.assert.calledOnceWithExactly(UserModel.getOne, {email: 'eperez@moodtechnology.com.ar'});
          sandbox.assert.calledOnceWithExactly(Bcrypt.anHash, '123456789','$2b$12$Op9ckiv6THL0pvrXqadPPOJ.eBHyLsQWDQn1CtAdrJO615lvmxHm.');
          sandbox.assert.notCalled(Bcrypt.hashUser);
          sandbox.assert.notCalled(UserModel.findOneAndModify);

      });

    })

    context('When database errors occur', () => {


      it('Should return 500 if an error occurs while querying the database', async () => {
            
        sandbox.stub(UserModel, 'getOne').rejects(new Error('error in getOne'));
        sandbox.stub(Bcrypt, 'anHash');
        sandbox.stub(Bcrypt, 'hashUser');
        sandbox.stub(UserModel, 'findOneAndModify');
        sandbox.stub(EmailService, 'sendEmail');



        const req = mockRequest(fakeBody, {}, {}, {email:'eperez@moodtechnology.com.ar' });
        const res = mockResponse();
        
        await handler(req, res);

        assert.deepStrictEqual(res.status, 500);
        assert.deepStrictEqual(res.json, {error: "Error: error in getOne"});

        sandbox.assert.calledOnceWithExactly(UserModel.getOne, {email: 'eperez@moodtechnology.com.ar'});
        sandbox.assert.notCalled(Bcrypt.anHash);
        sandbox.assert.notCalled(Bcrypt.hashUser);
        sandbox.assert.notCalled(UserModel.findOneAndModify);

    });
 

    })

})