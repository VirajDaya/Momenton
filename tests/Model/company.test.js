import Company, { convertEmployeesJSON } from '../../src/Model/company';
import Employee from '../../src/Model/employee';

import employeesFixture from '../../data/fixtures/employees.json';

describe('Company Model', () => {
  it('should initialize', () => {
    const company = new Company();
    expect(company).toBeTruthy();
  });

  it('getSortedEmployeesByManagerDesc should have non CEO at top', () => {
    const employeeList = {
      1: new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
      2: new Employee({
        "id": 2,
        "name": "Middle",
        "managerId": 1
      }),
      3: new Employee({
        "id": 3,
        "name": "Bottom",
        "managerId": 2
      }),
      5: new Employee({
        "id": 5,
        "name": "Bottom 2",
        "managerId": 2
      }),
      4: new Employee({
        "id": 4,
        "name": "Top 2",
        "managerId": null
      })
    };

    const expected = [
      new Employee({
        "id": 3,
        "name": "Bottom",
        "managerId": 2
      }),
      new Employee({
        "id": 5,
        "name": "Bottom 2",
        "managerId": 2
      }),
      new Employee({
        "id": 2,
        "name": "Middle",
        "managerId": 1
      }),
      new Employee({
        "id": 4,
        "name": "Top 2",
        "managerId": null
      }),
      new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
    ];

    const company = new Company(employeeList);
    expect(company.getSortedEmployeesByManagerDesc()).toEqual(expected);
  });

  it('getSortedEmployeesByManagerAsc should have CEO at top', () => {
    const employeeList = {
      1: new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
      2: new Employee({
        "id": 2,
        "name": "Middle",
        "managerId": 1
      }),
      3: new Employee({
        "id": 3,
        "name": "Bottom",
        "managerId": 2
      }),
      5: new Employee({
        "id": 5,
        "name": "Bottom 2",
        "managerId": 2
      }),
      4: new Employee({
        "id": 4,
        "name": "Top 2",
        "managerId": null
      })
    };

    const expected = [
      new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
      new Employee({
        "id": 4,
        "name": "Top 2",
        "managerId": null
      }),
      new Employee({
        "id": 2,
        "name": "Middle",
        "managerId": 1
      }),
      new Employee({
        "id": 3,
        "name": "Bottom",
        "managerId": 2
      }),
      new Employee({
        "id": 5,
        "name": "Bottom 2",
        "managerId": 2
      })
    ];

    const company = new Company(employeeList);
    expect(company.getSortedEmployeesByManagerAsc()).toEqual(expected);
  });

  it('buildCompanyHierarchyV1 should order by hierarchy', () => {
    const employeeList = {
      3: new Employee({
        "id": 3,
        "name": "Bottom",
        "managerId": 2
      }),
      2: new Employee({
        "id": 2,
        "name": "Middle",
        "managerId": 1
      }),
      1: new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
    };

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

    const bottom = new Employee({
      "id": 3,
      "name": "Bottom",
      "managerId": 2
    });

    middle.addSubordinate(bottom);
    top.addSubordinate(middle);

    const company = new Company(employeeList);
    const hierarchy = company.buildCompanyHierarchyV1();
    expect(hierarchy).toEqual([top]);
  });

  it('buildCompanyHierarchyV2 should order by hierarchy', () => {
    const employeeList = {
      4: new Employee({
        "id": 4,
        "name": "Bottom 2",
        "managerId": 2
      }),
      3: new Employee({
        "id": 3,
        "name": "Bottom 1",
        "managerId": 2
      }),
      2: new Employee({
        "id": 2,
        "name": "Middle",
        "managerId": 1
      }),
      1: new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
    };

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

    const expected = {
      1: top
    };

    const company = new Company(employeeList);
    expect(company.buildCompanyHierarchyV2()).toEqual(expected);
  });

  it('buildCompanyHierarchyV2 should place invalid manger employee as top', () => {
    const employeeList = {
      3: new Employee({
        "id": 3,
        "name": "Bottom",
        "managerId": 4
      }),
      2: new Employee({
        "id": 2,
        "name": "Middle",
        "managerId": 1
      }),
      1: new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
    };

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

    const bottom = new Employee({
      "id": 3,
      "name": "Bottom",
      "managerId": 4
    });

    top.addSubordinate(middle);

    const expected = {
      1: top,
      3: bottom
    };

    const company = new Company(employeeList);
    expect(company.buildCompanyHierarchyV2()).toEqual(expected);
  });

  it('buildCompanyHierarchyV2 should fail on circular relationship', () => {
    const employeeList = {
      3: new Employee({
        "id": 3,
        "name": "Bottom",
        "managerId": 2
      }),
      2: new Employee({
        "id": 3,
        "name": "Middle",
        "managerId": 3
      }),
      1: new Employee({
        "id": 1,
        "name": "Top",
        "managerId": null
      }),
    };

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

    const bottom = new Employee({
      "id": 3,
      "name": "Bottom",
      "managerId": 4
    });

    middle.addSubordinate(bottom);
    bottom.addSubordinate(middle);

    const expected = {
      1: top,
      3: bottom
    };

    const company = new Company(employeeList);
    
    expect(() => {company.buildCompanyHierarchyV2()}).toThrow('Maximum call stack size exceeded');
  });

  it('convertEmployeesJSON should should output Employee Array', () => {
      const employeeListJSON = [
        {
          "id": 3,
          "name": "Bottom",
          "managerId": 2
        },
        {
          "id": 2,
          "name": "Middle",
          "managerId": 1
        },
        {
          "id": 1,
          "name": "Top",
          "managerId": null
        },
      ];

      const expected = {
        1: new Employee({
          "id": 1,
          "name": "Top",
          "managerId": null
        }),
        2: new Employee({
          "id": 2,
          "name": "Middle",
          "managerId": 1
        }),
        3: new Employee({
          "id": 3,
          "name": "Bottom",
          "managerId": 2
        })
      };

      expect(convertEmployeesJSON(employeeListJSON)).toEqual(expected);
  });
});