import CompanyHierarchyView from '../../src/View/companyHierarchyView';

it('Company Controller should initialize', () => {
  const companyHierarchyView = new CompanyHierarchyView();
  expect(companyHierarchyView).toBeTruthy();
});