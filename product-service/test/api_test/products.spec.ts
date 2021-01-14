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
          res.body.data.forEach((element: any) => {
            expect(element).to.have.property('isDeleted', false)
          });
          done()
        })
        .catch(done)
    })
    it('return 200 success with brand filter', (done) => {
      request
        .get('/api/v1/products?brand=samsung')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          res.body.data.forEach((element: any) => {
            console.log(element)
            expect(element).to.have.property('brand', 'samsung')
          });
          done()
        })
        .catch(done)
    })
    it('return 200 success with color filter', (done) => {
      request
        .get('/api/v1/products?color=black')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          res.body.data.forEach((element: any) => {
            console.log(element)
            expect(element).to.have.property('color', 'black')
          });
          done()
        })
        .catch(done)
    })
    it('return 200 success with color filter', (done) => {
      request
        .get('/api/v1/products?color=black&brand=samsung')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          res.body.data.forEach((element: any) => {
            console.log(element)
            expect(element).to.have.property('brand', 'samsung')
            expect(element).to.have.property('color', 'black')
          });
          done()
        })
        .catch(done)
    })
    it('return 200 success with min price', (done) => {
      request
        .get('/api/v1/products?minPrice=25000000')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          res.body.data.forEach((element: any) => {
            console.log(element)
            expect(element.price).greaterThan(25000000)
          });
          done()
        })
        .catch(done)
    })
    it('return 200 success with max price', (done) => {
      request
        .get('/api/v1/products?maxPrice=25000000')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          res.body.data.forEach((element: any) => {
            console.log(element)
            expect(element.price).lessThan(25000000)
          });
          done()
        })
        .catch(done)
    })
    it('return 200 success with key search', (done) => {
      request
        .get('/api/v1/products?key=sung')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          res.body.data.forEach((element: any) => {
            console.log(element)
            const content = element.name + ' ' + element.description
            expect(content.toLowerCase().includes('sung')).true
          });
          done()
        })
        .catch(done)
    })
    it('return 200 success with limit 5 items', (done) => {
      request
        .get('/api/v1/products?limit=5')
        .expect(200)
        .then(res => {
          expect(res.body.data).to.be.an('array')
          expect(res.body.data).length(5)
          done()
        })
        .catch(done)
    })
  })
})

