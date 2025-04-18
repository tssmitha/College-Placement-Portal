import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Login from "./pages/StudentPages/login";
import Signup from "./pages/StudentPages/sign-up"; // Ensure file name matches exactly
import ForgotPassword from "./pages/StudentPages/ForgotPassword";
import ChangePassword from "./pages/StudentPages/ChangePassword";
import ResetPassword from "./pages/StudentPages/ResetPassword";
import PersonalEmailPage from "./pages/StudentPages/PersonalEmailPage";
import DashboardLayout from "./pages/StudentPages/layout";
import StudentProfile from "./pages/StudentPages/StudentProfile";
import ApplicationPage from "./pages/StudentPages/Application";
import ApplicationDetails from "./pages/StudentPages/ApplicationDetails";
import ApplicationsDashboard from "./pages/StudentPages/ApplicationsDashboard";
import JobDetailsPage from "./pages/StudentPages/JobDetails";
import ApplyJobPage from "./pages/StudentPages/ApplyPage";
import ATSScore from "./pages/StudentPages/ATS";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import ApplicationsPage from "./pages/AdminPages/ReleasedApplications";
import ViewApplicantsTable from "./pages/AdminPages/ViewApplicantsTable";
import PostForm from "./pages/AdminPages/PostForm";
import JobDetails from "./pages/AdminPages/JobDetails";
import AlumniConnect from "./pages/StudentPages/AluminiConnect";
import Resources from "./pages/StudentPages/Resources";
import UploadResource from "./pages/AdminPages/UploadResource";
import ResourcesTable from "./pages/StudentPages/ResourceTable";
import AIInterview from "./pages/StudentPages/AIInterview";
import Interview from "./pages/StudentPages/Interview";
import Companies from "./pages/StudentPages/Company";
import CompanyRecommendation from "./pages/StudentPages/CompanyReccomendation";
import PlacedStudentsPage from "./pages/StudentPages/PlacedStudents";
import Feedback from "./pages/StudentPages/Feedback";
import CategoryResourcesPage from "./pages/StudentPages/ResourceCategory";
import PlacementRulesPage from "./pages/StudentPages/PlacementRules";
import LeetCodeProgress from "./pages/StudentPages/DSA";
import OngoingPlacements from "./pages/StudentPages/OngoingPlacements";
import TestApplicationHeader from "./pages/StudentPages/TestApplicationHeader";
import TestProgress from "./pages/StudentPages/TestProgress";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import ReleaseShortlist from "./pages/AdminPages/ReleaseShortlist";
import Statistics from "./pages/AdminPages/Statistics";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/personal-email" element={<PersonalEmailPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/view-applications" element={<ApplicationPage />} />
        <Route path="/applications/details/:id" element={<ApplicationDetails />} />
        <Route path="/applications" element={<ApplicationsDashboard />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/applications/:jobId" element={<JobDetailsPage />} />
        <Route path="/apply/:jobId" element={<ApplyJobPage />} />
        <Route path="/ats-score" element={<ATSScore />} />
        <Route path="/alumini-connect" element={<AlumniConnect />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:categoryTitle" element={<CategoryResourcesPage />} />
        <Route path="/ai-interview" element={<AIInterview />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyId/placed-students" element={<PlacedStudentsPage />} />
        <Route path="/company-recommendations" element={<CompanyRecommendation />} />
        <Route path="/placement-rules" element={<PlacementRulesPage />} />
        <Route path="/dsa-tracker" element={<LeetCodeProgress />} />
        <Route path="/ongoing-placements" element={<OngoingPlacements />} />
        <Route path="/test" element={<TestApplicationHeader />} />
        <Route path="/test-progress" element={<TestProgress />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-released-applications" element={<ApplicationsPage />} />
        <Route path="/admin/jobs/:jobId" element={<JobDetails />} />
        <Route path="/admin/release-forms" element={<PostForm />} />
        <Route path="/admin/upload-resources" element={<UploadResource />} />
        <Route path="/admin/release-shortlist" element={<ReleaseShortlist />} />
        <Route path="/statistics" element={<Statistics />} />
  


      </Routes>
    </Router>
  </Provider>
    
  );
}

export default App;
