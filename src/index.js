import CompanyController from "./Controller/companyController";
import CompanyHierarchyView from "./View/companyHierarchyView";

const companyController = new CompanyController();

CompanyHierarchyView.displayCompanyHierarchy(companyController.buildHierarchyV2());


