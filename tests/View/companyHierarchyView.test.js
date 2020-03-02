import CompanyHierarchyView from '../../src/View/companyHierarchyView';
import Employee from '../../src/Model/employee';

describe('Company Hierarchy View', () => {
  it('should initialize', () => {
    const companyHierarchyView = new CompanyHierarchyView();
    expect(companyHierarchyView).toBeTruthy();
  });

  it('displayCompanyHierarchy should show hierarchy', () => {

    const top = new Employee({
      "id": 1,
      "name": "Top",
      "managerId": null
    });

    const middle = new Employee({
      "id": 2,
      "name": "Middle",
      "managerId": 1
    });

    const bottom1 = new Employee({
      "id": 3,
      "name": "Bottom 1",
      "managerId": 2
    });

    const bottom2 = new Employee({
      "id": 4,
      "name": "Bottom 2",
      "managerId": 2
    });

    middle.addSubordinate(bottom1);
    middle.addSubordinate(bottom2);
    top.addSubordinate(middle);

    const hierarchy = {
      1: top
    };

    const consoleSpy = jest.spyOn(console, 'log');

    CompanyHierarchyView.displayCompanyHierarchy(hierarchy);

    expect(consoleSpy).toHaveBeenCalledTimes(4);
  });
});