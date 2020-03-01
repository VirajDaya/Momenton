class Employee {
  constructor({
    id,
    name,
    managerId
  }) {
    this.id = id;
    this.name = name;
    this.managerId = managerId;
    this.subordinates = {};
  }

  addSubordinate(employee) {
    this.subordinates = {
      ...this.subordinates,
      [employee.id]: employee
    }
  }
}

export default Employee;