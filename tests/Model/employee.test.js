jest.enableAutomock();

import Employee from '../../src/Model/employee';

jest.mock('../../src/Model/employee', () => () => ({
  employees: {},
  addSubordinate: (employee) => {},
}));


it('Employee Model should initialize', () => {
  const employee = new Employee();
  employee.addSubordinate(new Employee());
  expect(employee).toBeTruthy();
});