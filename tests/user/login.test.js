const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const Token = require('../../helpers/JwtToken');
const Bcrypt = require('../../helpers/bcrypt')
const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/login');
const UserModel = require('../../src/models/User')
const {mensajes} = require('../../src/messages/user/login');
const {messageForNonExistantEmail} = require('../../src/messages/user/register');




describe('Create login api test', ()=>{

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

      const dataToken =   {
        _id:"63ee9fd0321dd7a38a25dd2b",
        nombre: 'emmanuel',
        apellido: 'perez',
        email: 'eperez@moodtechnology.com'     
     }
      


    const token =' eyJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJlbW1hbnVlbCIsImFwZWxsaWRvIjoicGVyZXoiLCJlbWFpbCI6ImVwZXJlekBtb29kdGVjaG5vbG9neS5jb20iLCJjb250cmFzZcOxYSI6IjEyMzQ1Njc4In0.hyK57S2NGqdfnJs4XPNtijAo4q_FV7Ta6hKr6_uiExc'
      

    context('When errors do not ocurrs', () => {
        it('Should return 200 if login a user successfully', async () => {

            sandbox.stub(UserModel, 'get').resolves(getData);
            sandbox.stub(Bcrypt, 'anHash').resolves(true);
            sandbox.stub(Token, 'sing').resolves(token)

            const req = mockRequest(data);
            const res = mockResponse();

            await handler(req, res)

            assert.deepStrictEqual(res.status, 200)
            assert.deepStrictEqual(res.json, {message: mensajes.successfulLogin(getData[0].nombre), code:2, token})

            sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com' });
            sandbox.assert.alwaysCalledWithExactly(Bcrypt.anHash,'12345678','$2b$12$eTX6zsggrVbri.KLNXX1FOd8ltmMPj6A2UhbTjJJWZn2OJjLBB/J2')
            sandbox.assert.alwaysCalledWithExactly(Token.sing, dataToken)
        });


        it('Should return 200 if login a user successfully', async () => {

            sandbox.stub(UserModel, 'get').resolves([]);
            sandbox.stub(Bcrypt, 'anHash');
            sandbox.stub(Token, 'sing')

            const req = mockRequest(data);
            const res = mockResponse();

            await handler(req, res)

            assert.deepStrictEqual(res.status, 200)
            assert.deepStrictEqual(res.json, {message:messageForNonExistantEmail(), code:2 })

            sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com' });
            sandbox.assert.notCalled(Bcrypt.anHash)
            sandbox.assert.notCalled(Token.sing)
        });

    })

    context('When an errors ocurrs', () => {

        it('Should return 400 if the password is wrong ', async () => {

            sandbox.stub(UserModel, 'get').resolves(getData);
            sandbox.stub(Bcrypt, 'anHash').resolves(false);
            sandbox.stub(Token, 'sing')

            const req = mockRequest(data);
            const res = mockResponse();

            await handler(req, res)

            assert.deepStrictEqual(res.status, 400)
            assert.deepStrictEqual(res.json, {message: mensajes.passwordInvalid })

            sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com' });
            sandbox.assert.alwaysCalledWithExactly(Bcrypt.anHash, data.contraseña, getData[0].contraseña)
            sandbox.assert.notCalled(Token.sing)
        });
    
    })

    context('When database errors occur', () => {

        it('Should return 500 if an error occurs while login a user in the database', async () => {

                sandbox.stub(UserModel, 'get').rejects(new Error('Error in get'));
                sandbox.stub(Bcrypt, 'anHash');
                sandbox.stub(Token, 'sing');
    
                const req = mockRequest(data);
                const res = mockResponse();
    
                await handler(req, res)
    
                assert.deepStrictEqual(res.status, 500)
                assert.deepStrictEqual(res.json, {error: "Error: Error in get"})
    
                sandbox.assert.alwaysCalledWithExactly(UserModel.get, { email: 'eperez@moodtechnology.com' });
                sandbox.assert.notCalled(Bcrypt.anHash)
                sandbox.assert.notCalled(Token.sing)
    
    
		});

    })

})