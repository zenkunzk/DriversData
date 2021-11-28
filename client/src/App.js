import React, {lazy, Suspense, useState, useEffect} from "react";
import "custom.css"
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { DriversContextProvider } from "./context/DriversContext";
import { toast } from "react-toastify";
//Pages -V
const Dashboard = lazy(() => import  ("./views/Home"));
const ErrorPage = lazy(() => import  ("./404"));
// Auth-----------------------------------------------------------------------------------------------------------V
const Login = lazy(() => import  ("./views/auth/Login"));
const Register = lazy(() => import  ("./views/auth/Register"));
// Auth-----------------------------------------------------------------------------------------------------------^

// Api Calendar---------------------------------------------------------------------------------------------------V
const ApiCalendarMain = lazy(() => import  ("./views/components/Api_Calendar/Api_Calendar-main"));
const ApiCalendarPopup = lazy(() => import  ("./views/components/Api_Calendar/Api_Calendar-pop_up"))
const ApiCalendarEditDay = lazy(() => import  ( "./views/components/Api_Calendar/Api_Calendar-edit-day"));
const ApiCalendarEditData = lazy(() => import  ("./views/components/Api_Calendar/Api_Calendar-edit_data"));
const ApiCalendarDeleteData = lazy(() => import  ("./views/components/Api_Calendar/Api_Calendar-delete_data"));
const ApiCalendarEditDayset = lazy(() => import  ("./views/components/Api_Calendar/Api_Calendar-edit-dateset"));
// Api Calendar---------------------------------------------------------------------------------------------------^

// Available Emails---------------------------------------------------------------------------------------------------V
const AvailableEmailsMain = lazy(() => import  ("./views/components/Available_Emails/Available_Emails-main"));
const AvailableEmailsEditData = lazy(() => import  ("./views/components/Available_Emails/Available_Emails-edit_data"));
const AvailableEmailsDeleteData = lazy(() => import  ("./views/components/Available_Emails/Available_Emails-delete_data"));
// Available Emails---------------------------------------------------------------------------------------------------^

// Accounting---------------------------------------------------------------------------------------------------V
const AccountingMain = lazy(() => import  ("./views/components/Accounting/Accounting-main"));
const PaymentrecordMain = lazy(() => import  ("./views/components/Accounting/PaymentRecords/Paymentrecord-main"));
const AccountingEditCustomer = lazy(() => import  ("./views/components/Accounting/Accounting-edit_customer"));
const AccountingEditPayment = lazy(() => import  ("./views/components/Accounting/Accounting-edit_payment"));
const AccountingDeleteCustomer = lazy(() => import  ("./views/components/Accounting/Accounting-delete_customer"));
// Accounting---------------------------------------------------------------------------------------------------^

// Company Info---------------------------------------------------------------------------------------------------V
const CompanyInfoMain = lazy(() => import  ("./views/components/Company_Info/Company_Info-main"));
const CompanyInfoEdit = lazy(() => import  ("./views/components/Company_Info/Company_Info-edit"));
const CompanyInfoView = lazy(() => import  ("./views/components/Company_Info/Company_Info-view"));
const CompanyInfoDelete = lazy(() => import  ("./views/components/Company_Info/Company_Info-delete"));
const CompanyInfoPrintPage = lazy(() => import  ("./views/components/Company_Info/Company_Info-print_page"));
// Company Info---------------------------------------------------------------------------------------------------^

// Company Client Apis---------------------------------------------------------------------------------------------------V
const ClientApisMain = lazy(() => import  ("./views/components/Client_Apis/Client_Apis-main"));
const ClientApisEditClientApi = lazy(() => import  ("./views/components/Client_Apis/Client_Apis-edit_client_api"));
const ClientApisDeleteClientApi = lazy(() => import  ("./views/components/Client_Apis/Client_Apis-delete_client_api"));
// Company Client Apis---------------------------------------------------------------------------------------------------^
toast.configure();
const App = () => {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/verify", {
        method: "POST",
        headers: { 'Authorization': `token ${localStorage.token}` }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }
  return (
    <DriversContextProvider>
    <React.Fragment>
      <BrowserRouter>
        <Suspense fallback={<div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}>
        <Switch>
          <Route exact path="/" render={props => <Redirect to="/admin/home" />} />
          <Route exact path="/admin/home" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to="/login" />) } />
          <Route exact path="/login" render={props =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth}/>
            ) : (
              <Redirect to="/admin/home"/>
            )
          } />
          <Route exact path="/admin/add_user" render={props => isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : ("") } />

          <Route exact path="/admin/client_apis" render={props => isAuthenticated ? (<ClientApisMain {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/client_apis/data/:id/update" render={props => isAuthenticated ? (<ClientApisEditClientApi {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/client_apis/data/:id/delete" render={props => isAuthenticated ? (<ClientApisDeleteClientApi {...props} setAuth={setAuth} />) : ("") } />

          <Route exact path="/admin/company_info" render={props => isAuthenticated ? (<CompanyInfoMain {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/company_info/data/:id/update" render={props => isAuthenticated ? (<CompanyInfoEdit {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/company_info/data/:id/view" render={props => isAuthenticated ? (<CompanyInfoView {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/company_info/data/:id/delete" render={props => isAuthenticated ? (<CompanyInfoDelete {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/company_info/data/:id/print" render={props => isAuthenticated ? (<CompanyInfoPrintPage {...props} setAuth={setAuth} />) : ("") } />

          <Route exact path="/admin/accounting" render={props => isAuthenticated ? (<AccountingMain {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/accounting/payment_records" render={props => isAuthenticated ? (<PaymentrecordMain {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/accounting/data/:id/update" render={props => isAuthenticated ? (<AccountingEditCustomer {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/accounting/data/:id/delete" render={props => isAuthenticated ? (<AccountingDeleteCustomer {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/accounting/data/:id/update/payment_" render={props => isAuthenticated ? (<AccountingEditPayment {...props} setAuth={setAuth} />) : ("") } />

          <Route exact path="/admin/api_calendar" render={props => isAuthenticated ? (<ApiCalendarMain {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/api_calendar/data/:id/update" render={props => isAuthenticated ? (<ApiCalendarEditData {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/api_calendar/data/:id/update/day_" render={props => isAuthenticated ? (<ApiCalendarEditDay {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/api_calendar/data/:id/update/pop-up/dateset_" render={props => isAuthenticated ? (<ApiCalendarEditDayset {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/api_calendar/data/:id/delete" render={props => isAuthenticated ? (<ApiCalendarDeleteData {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/api_calendar/data/:id/update/pop-up/daynumber_" render={props => isAuthenticated ? (<ApiCalendarPopup {...props} setAuth={setAuth} />) : ("") } />

          <Route exact path="/admin/available_emails" render={props => isAuthenticated ? (<AvailableEmailsMain {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/available_emails/data/:id/update" render={props => isAuthenticated ? (<AvailableEmailsEditData {...props} setAuth={setAuth} />) : ("") } />
          <Route exact path="/admin/available_emails/data/:id/delete" render={props => isAuthenticated ? (<AvailableEmailsDeleteData {...props} setAuth={setAuth} />) : ("") } />

          <Route exact render={props => isAuthenticated ? (<ErrorPage {...props} setAuth={setAuth} />) : ("") } />
        </Switch>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
    </DriversContextProvider>
  );
};

export default App;
