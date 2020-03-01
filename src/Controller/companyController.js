import employeesJSON from '../../data/employees.json';
import Company, { convertEmployeesJSON } from '../Model/company.js';


class CompanyController {
  constructor() {
    const employeeList = convertEmployeesJSON(employeesJSON);
    this.company = new Company(employeeList);
  }

  getSortedEmployeeList() {
    return this.company.getSortedEmployeesByManagerDesc();
  }

  buildHierarchyV1() {
    return this.company.buildCompanyHierarchyV1();
  }

  buildHierarchyV2() {
    return this.company.buildCompanyHierarchyV2();
  }
}

export default CompanyController