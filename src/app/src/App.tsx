import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import MyDashboard from './pages/Dashboard/My Dashboad';
import Login from './pages/Authentication/LogIn';
import Register from './pages/Authentication/Register';
import FeedBack from './pages/Feedback';
import FAQ from './pages/Faqs';
import FoodPlans from './pages/FoodPlans';
import ExercisePlans from './pages/ExercisePlans';
import FoodPlanCreation from './pages/FoodPlanCreation';
import ExercisepPlanCreation from './pages/ExercisePlanCreation';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route index element={<Login setLoading={setLoading} />} />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard" />
              <MyDashboard />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <PageTitle title="Register" />
              <Register />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/myexerciseplans"
          element={
            <>
              <PageTitle title="Exercise Plans" />
              <ExercisePlans />
            </>
          }
        />
        <Route
          path="/myfoodplans"
          element={
            <>
              <PageTitle title="Food Plans" />
              <FoodPlans />
            </>
          }
        />
        <Route
          path="/perscribedietplan"
          element={
            <>
              <PageTitle title="Perscribe Diet" />
              <FoodPlanCreation />
            </>
          }
        />
        <Route
          path="/perscribeexerciselan"
          element={
            <>
              <PageTitle title="Perscribe Exercise" />
              <ExercisepPlanCreation />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <PageTitle title="Feedback" />
              <FeedBack />
            </>
          }
        />

        <Route
          path="/faq"
          element={
            <>
              <PageTitle title="FAQs" />
              <FAQ />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
