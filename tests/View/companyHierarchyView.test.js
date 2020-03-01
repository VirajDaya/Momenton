jest.enableAutomock();

import CompanyHierarchyView from '../../src/View/companyHierarchyView';

jest.mock('../../src/View/companyHierarchyView', () => () => ({
  company: {},
  displayCompanyHierarchy: () => {},
}));


it('Company Controller should initialize', () => {
  const companyHierarchyView = new CompanyHierarchyView();
  companyHierarchyView.displayCompanyHierarchy()
  expect(companyHierarchyView).toBeTruthy();
});