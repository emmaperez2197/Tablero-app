const sandbox = require('sinon').createSandbox();
const assert = require('assert');
const jwt = require('jsonwebtoken');

const { mockRequest, mockResponse } = require('../../tests/mocks/index');
const {handler} = require('../../src/routes/user/src/register');
const UserModel = require('../../src/models/User')
const EmailService = require('../../services/EmailService');
const { sendEmail } = require('../../services/EmailService');




describe('Create register api test', ()=>{

    afterEach(() => sandbox.restore());
    beforeEach(() => { process.env.KEY_PRELOGIN = true; });


    context('When errors do not ocurrs', () => {
        it.only('Should return 200 if create a user successfully', async () => {

            sandbox.stub(UserModel, 'get').resolves()
            sandbox.stub(jwt, 'sing').resolves()
            sandbox.stub(EmailService, 'sendEmail').resolves()

            const req = mockRequest();
            const res = mockResponse();

            await handler(req, res);

        });
    })

    context('When an errors ocurrs', () => {})

    context('When database errors occur', () => {})

})