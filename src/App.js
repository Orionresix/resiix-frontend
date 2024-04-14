import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import Signup from './components/onboarding/Signup';
import Instructions from './components/onboarding/Instructions';
import Layout from './components/layout/layout'; // Import the Layout component
import DashboardHome from './pages/dashboard/DashboardHome'; // Import the DashboardHome component
import RepairRequests from './pages/dashboard/RepairRequests'
import WorkOrders from './pages/dashboard/WorkOrders'
import Properties from './pages/dashboard/Properties';
import Step1 from './components/onboarding/Step1';
import Step2 from './components/onboarding/Step2';
import RequestDetails from './pages/dashboard/RequestDetails';
import Tenant from './pages/tenant/signup/Signup.jsx';
import TenantSignIn from './pages/tenant/signin/Signin.jsx';
import TenantLanding from './pages/tenant/landing_page/Landing.jsx';
import TReportIssue from './pages/tenant/report_issue/ReportIssue.jsx';
import TRating from './pages/tenant/rating/Rating.jsx';
import TFeedback from './pages/tenant/feedback/Feedback.jsx';
import CompleteWork from './pages/technician/completework/CompleteWork.jsx';
import StartWork from './pages/technician/startwork/StartWork';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingPage />} > {/* No layout here */}
          <Route path="/" element={<Signup />} /> {/* No layout here */}
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/step_one" element={<Step1 />} />
          <Route path="/step_two" element={<Step2 />} />


          <Route path="/resiix" element={<TenantLanding />} />
          <Route path="/resiix/login" element={<TenantSignIn />} />/
          <Route path="/resiix/signup" element={<Tenant />} />
          <Route path="/resiix/report-issue" element={<TReportIssue />} />
          <Route path="/resiix/rating" element={<TRating />} />
          <Route path="/resiix/feedback" element={<TFeedback />} />
          <Route path="/resiix/completework" element={<CompleteWork />} />
          <Route path="/resiix/startwork" element={< StartWork />} />

        </Route>
        <Route path="/dashboard/home" element={<Layout><DashboardHome /></Layout>}>
        </Route>
        <Route path="/dashboard/requests" element={<Layout><RepairRequests /></Layout>}>
        </Route>
        <Route path="/dashboard/orders" element={<Layout><WorkOrders /></Layout>}>
        </Route>
        <Route path="/dashboard/properties" element={<Layout><Properties /></Layout>}>
        </Route>
        <Route path="/dashboard/request-details" element={<Layout><RequestDetails /></Layout>}>
        </Route>






      </Routes>
    </Router >
  );
}

export default App;