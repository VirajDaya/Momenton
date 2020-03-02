import CompanyController from '../../src/Controller/companyController';

describe('Company Controller', () => {
  it('should initialize', () => {
    const companyController = new CompanyController();
    expect(companyController).toBeTruthy();
  });
});