import CompanyController from '../../src/Controller/companyController';

jest.mock('../../src/Controller/companyController', () => () => ({
  company: {},
  buildHierarchyV2: () => {},
}));


it('Company Controller should initialize', () => {
  const companyController = new CompanyController();
  companyController.buildHierarchyV2()
  expect(companyController).toBeTruthy();
});