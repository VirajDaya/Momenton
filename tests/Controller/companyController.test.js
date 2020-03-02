import CompanyController from '../../src/Controller/companyController';

it('Company Controller should initialize', () => {
  const companyController = new CompanyController();
  expect(companyController).toBeTruthy();
});