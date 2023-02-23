const sandbox = require('sinon').createSandbox();
const assert = require('assert');
const Token = require('../../helpers/JwtToken');

const Bcrypt = require('../../helpers/bcrypt')
const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/confirmRegister.');
const UserModel = require('../../src/models/User')
const {messageForConfirmedRegistration} = require('../../src/messages/user/register');

describe('Create confirm register api test', ()=>{

    afterEach(() => sandbox.restore());
    beforeEach(() => { process.env.KEY_PRELOGIN = true});



    context('When errors do not ocurrs', () => {
        it('Should return 200 if create a user successfully', async () => {

            sandbox.stub(Token, 'decode').resolves(data);
            sandbox.stub(UserModel, 'get').resolves([]);
            sandbox.stub(Bcrypt, 'hashUser').resolves(hash);
            sandbox.stub(UserModel.prototype, 'create').resolves(userCreated);

            const req = mockRequest({}, token);
            const res = mockResponse();

            await handler(req, res);

            assert.deepStrictEqual(res.status, 200)
            assert.deepStrictEqual(res.json, {message:messageForConfirmedRegistration(), userId: userCreated.insertedId, code:2 })

            sandbox.assert.calledOnceWithExactly(Token.decode, undefined);
            sandbox.assert.calledOnceWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com' })
            sandbox.assert.calledOnceWithExactly(Bcrypt.hashUser, data.contraseña)
            sandbox.assert.calledOnceWithExactly(UserModel.prototype.create)

        });

        it('Should return 200 if confirm register a user successfully', async () => {

                sandbox.stub(Token, 'decode').resolves(data);
                sandbox.stub(UserModel, 'get').resolves(getData);
                sandbox.stub(Bcrypt, 'hashUser');
                sandbox.stub(UserModel.prototype, 'create');
    
                const req = mockRequest({}, token);
                const res = mockResponse();
    
                await handler(req, res);
    
                assert.deepStrictEqual(res.status, 200)
                assert.deepStrictEqual(res.json, {message: 'El usuario ya confirmo esta cuenta' })
    
                sandbox.assert.calledOnceWithExactly(Token.decode, undefined);
                sandbox.assert.calledOnceWithExactly(UserModel.get,  { email: 'eperez@moodtechnology.com' } )
                sandbox.assert.notCalled(Bcrypt.hashUser)
                sandbox.assert.notCalled(UserModel.prototype.create)
    


        });


    })

    context('When an errors ocurrs', () => {

    
    })

    context('When database errors occur', () => {

        it('Should return 500 if an error occurs while registering a user in the database', async () => {


            sandbox.stub(Token, 'decode').resolves(data);
            sandbox.stub(UserModel, 'get').rejects(new Error('Error in get'));
            sandbox.stub(Bcrypt, 'hashUser');
            sandbox.stub(UserModel.prototype, 'create');

            const req = mockRequest({}, token);
            const res = mockResponse();

              
			await handler(req, res);
        
			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { code: -1, error: "Error in get"});

            sandbox.assert.calledOnceWithExactly(Token.decode, undefined);
            sandbox.assert.calledOnceWithExactly(UserModel.get,  { email: 'eperez@moodtechnology.com' } )
            sandbox.assert.notCalled(Bcrypt.hashUser)
            sandbox.assert.notCalled(UserModel.prototype.create)

		});

    })

})