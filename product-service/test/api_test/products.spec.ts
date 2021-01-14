import supertest from 'supertest'
import appBootstrap from '../../src/app';
import { expect } from 'chai';
import 'mocha'
import { ErrorCode } from '@ducbaovn/nodejs-common';

let request: supertest.SuperTest<supertest.Test>

describe('Product API Route', () => {
  before(async function () {
    this.timeout(30000)
    const app = await appBootstrap()
    request = supertest(app)
  })
  describe('POST /products', () => {
    it('return 200 success', function (done) {
      request
        .post('/api/v1/products')
        .send({
          "name": "samsung galaxy fold",
          "price": 38000000,
          "brand": "samsung",
          "color": "black"
        })
        .set('Content-Type', 'application/json')
        .expect(200)
        .then(res => {
          expect(res.body.name).equal("samsung galaxy fold")
          expect(res.body.price).equal(38000000)
          expect(res.body.brand).equal("samsung")
          expect(res.body.color).equal("black")
          expect(res.body.id).exist
          done()
        })
        .catch(done)
    })
    it('return 400 missing parameters', (done) => {
      request
        .post('/api/v1/products')
        .send({
          "price": 38000000,
          "brand": "samsung",
          "color": "black"
        })
        .set('Content-Type', 'application/json')
        .expect(400)
        .then(res => {
          expect(res.body.code).equal(ErrorCode.MISSING_PARAMETERS.code)
          expect(res.body.message).equal(ErrorCode.MISSING_PARAMETERS.message)
          done()
        })
        .catch(done)
    })
  })
  describe('GET /products', () => {
    it('return 200 success', (done) => {
      request
        .get('/api/v1/products')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          done()
        })
        .catch(done)
    })
  })
})

