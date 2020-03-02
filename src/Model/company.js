import Employee from "../Model/employee";

/**
 * Just a util method to convert JSON list to an Employee Object Dictionary
 *
 * @param {Array} employeeListJSON 
 */

export const convertEmployeesJSON = employeeListJSON => {
  let employeeList = {};

  for (const employee of employeeListJSON) {
    employeeList = {
      ...employeeList,
      [employee.id]: new Employee(employee)
    }
  }

  return employeeList;
}

class Company {
  constructor(employees) {
    this.employees = employees;
  }

  getSortedEmployeesByManagerDesc() {
    let sortedEmployees = Object.values(this.employees)
      .sort((emp1, emp2) => {
        if (emp1.managerId === null) {
          return 1;
        }

        if (emp2.managerId === null) {
          return -1;
        }

        if (emp1.managerId === emp2.managerId) {
          return 0;
        }

        return emp2.managerId - emp1.managerId;
      });

    return sortedEmployees;
  }

  getSortedEmployeesByManagerAsc() {
    let sortedEmployees = this.employees;

    sortedEmployees = Object.values(this.employees)
      .sort((emp1, emp2) => {
        if (emp1.managerId === null) {
          return -1;
        }

        if (emp2.managerId === null) {
          return 1;
        }

        if (emp1.managerId === emp2.managerId) {
          return 0;
        }

        return emp1.managerId - emp2.managerId;
      });

    return sortedEmployees;
  }

  buildCompanyHierarchyV1() {
    let employeesByManager = this.getSortedEmployeesByManagerDesc();
    let hierarchy = this.employees;

    for (const employee of employeesByManager) {
      if (employee.managerId && employee.managerId in hierarchy) {
        hierarchy[employee.managerId].addSubordinate(employee);
      }
    }

    for (const id in hierarchy) {
      if (hierarchy[id].managerId && Object.values(hierarchy[id].subordinates).length === 0) {
        delete hierarchy[id];
      }
    }

    const sortedHierarchy = Object.values(hierarchy)
      .sort((emp1, emp2) => {
        if (emp1.managerId === null) {
          return -1;
        }

        if (emp2.managerId === null) {
          return 1;
        }

        if (emp1.managerId === emp2.managerId) {
          return 0;
        }

        return emp1.managerId - emp2.managerId;
      });

    return sortedHierarchy;
  }

  buildCompanyHierarchyV2() {
    let hierarchy = {};

    const addEmployeeToManager = (employee) => {
      // is manager in the list?
      if (employee.managerId in hierarchy) {
        hierarchy[employee.managerId].addSubordinate(employee);
      } else {
        if (employee.managerId in this.employees) {
          //does manager have a manager??
          if (this.employees[employee.managerId].managerId !== null) {
            //add manager recursively
            this.employees[employee.managerId].addSubordinate(employee);
            addEmployeeToManager(this.employees[employee.managerId]);
          } else {
            // add the manager
            hierarchy = {
              ...hierarchy,
              [employee.managerId]: this.employees[employee.managerId]
            }
            hierarchy[employee.managerId].addSubordinate(employee);
          }
        } else {
          hierarchy = {
            ...hierarchy,
            [employee.id]: employee
          }
        }
      }
    }

    for (const employee of Object.values(this.employees)) {
      if (employee.managerId === null) {
        hierarchy = {
          ...hierarchy,
          [employee.id]: employee
        }
      } else {
        addEmployeeToManager(employee);
      }
    }

    return hierarchy;
  }
}

export default Company;