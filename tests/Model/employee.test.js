import Employee from '../../src/Model/employee';

describe('Employee Model', () => {
  it('should initialize', () => {
    const employee = new Employee({});
    expect(employee).toBeTruthy();
  });

  it('addSubordinate should add value to property', () => {
    const employee = new Employee({
      "id": 1,
      "name": "Top",
      "managerId": null
    });
    const employee2 = new Employee({
      "id": 2,
      "name": "Bottom",
      "managerId": 1
    });

    employee.addSubordinate(employee2)

    expect(employee.subordinates).toEqual({
      2: employee2
    });
  });

  it('addSubordinate should not add same employee twice', () => {
    const employee = new Employee({
      "id": 1,
      "name": "Top",
      "managerId": null
    });
    const employee2 = new Employee({
      "id": 2,
      "name": "Bottom",
      "managerId": 1
    });
    const employee3 = new Employee({
      "id": 2,
      "name": "Bottom",
      "managerId": 1
    });

    employee.addSubordinate(employee2);
    employee.addSubordinate(employee3);

    expect(employee.subordinates).toEqual({
      2: employee2
    });
  });
});