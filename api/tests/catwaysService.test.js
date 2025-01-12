
const { expect } = require('chai');
const sinon = require('sinon');
const catwaysModel = require('../models/catway');
const CatwaysService = require('../services/catways');

describe('CatwaysService', () => {
    afterEach(() => {
      sinon.restore(); // Nettoyage des mocks après chaque test
    });
  
    describe('listCatways', () => {
      it('devrait retourner une liste de catways', async () => {
        const mockCatways = [{ id: 1, name: 'Catway A' }, { id: 2, name: 'Catway B' }];
        sinon.stub(catwaysModel, 'listCatways').resolves(mockCatways);
  
        const result = await CatwaysService.listCatways();
        expect(result).to.deep.equal(mockCatways);
      });
  
      it('devrait lever une erreur en cas de problème', async () => {
        sinon.stub(catwaysModel, 'listCatways').rejects(new Error('Erreur de récupération'));
        try {
          await CatwaysService.listCatways();
        } catch (error) {
          expect(error.message).to.equal('Impossible de récupérer les catways');
        }
      });
    });
  
    describe('getCatwayById', () => {
      it('devrait retourner un catway par ID', async () => {
        const mockCatway = { id: 1, name: 'Catway A' };
        sinon.stub(catwaysModel, 'getCatwayById').resolves(mockCatway);
  
        const result = await CatwaysService.getCatwayById(1);
        expect(result).to.deep.equal(mockCatway);
      });
  
      it('devrait lever une erreur si le catway n\'existe pas', async () => {
        sinon.stub(catwaysModel, 'getCatwayById').rejects(new Error('Catway introuvable'));
        try {
          await CatwaysService.getCatwayById(999);
        } catch (error) {
          expect(error.message).to.equal('Catway introuvable');
        }
      });
    });
  
    describe('createCatway', () => {
      it('devrait créer un catway et rediriger vers le tableau de bord', async () => {
        const mockRequest = { body: { name: 'New Catway' } };
        const mockResponse = { render: sinon.spy() };
        sinon.stub(catwaysModel, 'addCatway').resolves(1);
        sinon.stub(catwaysModel, 'listCatways').resolves([{ id: 1, name: 'New Catway' }]);
  
        await CatwaysService.createCatway(mockRequest, mockResponse);
        expect(mockResponse.render.calledWith('dashboard', { catways: [{ id: 1, name: 'New Catway' }] })).to.be.true;
      });
  
      it('devrait retourner une erreur en cas de problème', async () => {
        const mockRequest = { body: { name: 'New Catway' } };
        const mockResponse = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        sinon.stub(catwaysModel, 'addCatway').rejects(new Error('Erreur de création'));
  
        await CatwaysService.createCatway(mockRequest, mockResponse);
        expect(mockResponse.status.calledWith(500)).to.be.true;
        expect(mockResponse.send.calledWith({ message: 'Erreur de création' })).to.be.true;
      });
    });
  
    describe('updateCatway', () => {
      it('devrait mettre à jour un catway et rediriger', async () => {
        const mockRequest = { body: { name: 'Updated Catway' }, params: { id: 1 } };
        const mockResponse = { redirect: sinon.spy() };
        sinon.stub(catwaysModel, 'updateCatway').resolves();
  
        await CatwaysService.updateCatway(mockRequest, mockResponse);
        expect(mockResponse.redirect.calledWith('/dashboard')).to.be.true;
      });
  
      it('devrait retourner une erreur en cas de problème', async () => {
        const mockRequest = { body: { name: 'Updated Catway' }, params: { id: 1 } };
        const mockResponse = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        sinon.stub(catwaysModel, 'updateCatway').rejects(new Error('Erreur de mise à jour'));
  
        await CatwaysService.updateCatway(mockRequest, mockResponse);
        expect(mockResponse.status.calledWith(500)).to.be.true;
        expect(mockResponse.send.calledWith({ message: 'Erreur de mise à jour' })).to.be.true;
      });
    });
  
    describe('deleteCatway', () => {
      it('devrait supprimer un catway avec succès', async () => {
        const mockRequest = { params: { id: 1 } };
        const mockResponse = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        sinon.stub(catwaysModel, 'deleteCatway').resolves();
  
        await CatwaysService.deleteCatway(mockRequest, mockResponse);
        expect(mockResponse.status.calledWith(204)).to.be.true;
        expect(mockResponse.send.called).to.be.true;
      });
  
      it('devrait retourner une erreur en cas de problème', async () => {
        const mockRequest = { params: { id: 1 } };
        const mockResponse = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        sinon.stub(catwaysModel, 'deleteCatway').rejects(new Error('Erreur de suppression'));
  
        await CatwaysService.deleteCatway(mockRequest, mockResponse);
        expect(mockResponse.status.calledWith(500)).to.be.true;
        expect(mockResponse.send.calledWith({ message: 'Erreur de suppression' })).to.be.true;
      });
    });
  });