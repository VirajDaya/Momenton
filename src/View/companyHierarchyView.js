class CompanyHierarchyView {
  static _displayEmployee(depth, employee) {
    if (employee && employee.name) {
      console.log('\t'.repeat(depth), employee.name);
    }

    if (Object.values(employee.subordinates).length > 0) {
      for (const subordinate of Object.values(employee.subordinates)) {
        CompanyHierarchyView._displayEmployee(depth + 1, subordinate);
      }
    }
  }

  static displayCompanyHierarchy(employees) {
    const depth = 0;

    for (const id in employees) {
      CompanyHierarchyView._displayEmployee(depth, employees[id]);
    }
  }
}

export default CompanyHierarchyView;