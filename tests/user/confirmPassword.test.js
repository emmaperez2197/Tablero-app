const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const Token = require('../../helpers/JwtToken');

const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const { handler } = require('../../src/routes/user/src/ConfirmPassword');
const UserModel = require('../../src/models/User')
const Bcrypt = require('../../helpers/bcrypt');
const message = require('../../src/messages/user/recoverPass');
const {messageForNonExistantEmail} = require('../../src/messages/user/register');

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
        it('Should return 200 if the user is successfully confirmed', async () => {

            sandbox.stub(Token, 'decode').resolves(decodeData);
            sandbox.stub(UserModel, 'getOne').resolves(getUser);
            sandbox.stub(Bcrypt, 'hashUser').resolves(hash);
            sandbox.stub(UserModel, 'findOneAndModify').resolves(userUpdated)



            const req = mockRequest(body, token);
            const res = mockResponse();

            await handler(req, res)


            assert.deepStrictEqual(res.status, 200);
            assert.deepStrictEqual(res.json, {message: message.recoverPassConfirmed, code: 2})

            sandbox.assert.calledOnceWithExactly(Token.decode, undefined)
            sandbox.assert.calledOnceWithExactly(UserModel.getOne , { email: 'eperez@moodtechnology.com.ar' });
            sandbox.assert.calledOnceWithExactly(Bcrypt.hashUser, body.nuevaContraseña);
            sandbox.assert.calledOnceWithExactly(UserModel.findOneAndModify, getUser._id, {contraseña: hash} );

        });

    })

    context('When an errors ocurrs', () => {

            it('Should return 400 if data invalid', async () => {
            
              sandbox.stub(Token, 'decode');
              sandbox.stub(UserModel, 'getOne');
              sandbox.stub(Bcrypt, 'hashUser');
              sandbox.stub(UserModel, 'findOneAndModify');
            
            
            
              const req = mockRequest({...body, nuevaContraseña:5}, token);
              const res = mockResponse();
            
              await handler(req, res)
            
            
              assert.deepStrictEqual(res.status, 400);
              assert.deepStrictEqual(res.json, {error: "\"nuevaContraseña\" must be a string"})
            
              sandbox.assert.notCalled(Token.decode)
              sandbox.assert.notCalled(UserModel.getOne);
              sandbox.assert.notCalled(Bcrypt.hashUser);
              sandbox.assert.notCalled(UserModel.findOneAndModify );

           });





          it('Should return 404 user no exits', async () => {

            sandbox.stub(Token, 'decode').resolves(decodeData);
            sandbox.stub(UserModel, 'getOne').resolves(null)
            sandbox.stub(Bcrypt, 'hashUser');
            sandbox.stub(UserModel, 'findOneAndModify');



            const req = mockRequest(body, token);
            const res = mockResponse();

            await handler(req, res);

            assert.deepStrictEqual(res.status, 404);
            assert.deepStrictEqual(res.json, {message: messageForNonExistantEmail()})

            sandbox.assert.calledOnceWithExactly(Token.decode, undefined)
            sandbox.assert.calledOnceWithExactly(UserModel.getOne,{ email: 'eperez@moodtechnology.com.ar' } );
            sandbox.assert.notCalled(Bcrypt.hashUser);
            sandbox.assert.notCalled(UserModel.findOneAndModify );

        });
     
    
    })

    context('When database errors occur', () => {

          it('Should return 500 if an error occurs while querying the database', async () => {

            sandbox.stub(Token, 'decode').resolves(decodeData)
            sandbox.stub(UserModel, 'getOne').rejects(new Error('error in getOne'));
            sandbox.stub(Bcrypt, 'hashUser');
            sandbox.stub(UserModel, 'findOneAndModify');



            const req = mockRequest(body, token);
            const res = mockResponse();

            await handler(req, res)


            assert.deepStrictEqual(res.status, 500);
            assert.deepStrictEqual(res.json, {error: "Error: error in getOne"})

            sandbox.assert.calledOnceWithExactly(Token.decode, undefined)
            sandbox.assert.calledOnceWithExactly(UserModel.getOne , { email: 'eperez@moodtechnology.com.ar' });
            sandbox.assert.notCalled(Bcrypt.hashUser);
            sandbox.assert.notCalled(UserModel.findOneAndModify);

          });

    })

})
