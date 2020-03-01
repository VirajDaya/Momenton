jest.enableAutomock();

import Company from '../../src/Model/company';
import Employee from '../../src/Model/employee';

const employee = jest.mock('../../src/Model/employee');

jest.mock('../../src/Model/company', () => () => ({
  employees: {}
}));


it('Company Model should initialize', () => {
  const company = new Company();
  expect(company).toBeTruthy();
});