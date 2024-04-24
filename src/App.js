import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Apartments from "./pages/appartments";
import Airbnbs from "./pages/bnbs";
import AdminPage from "./admin/admin";
import AddApartmentModal from "./admin/addappartment";
import Services from "./pages/services";
import InquiryForm from "./pages/inquiry";
import TransportList from "./pages/transport";
import CleanerList from "./pages/cleaners";
import MaintenanceRequestForm from "./pages/maintenance";
import AddBnBModal from "./admin/addbnb";
import AddTransportModal from "./admin/addtransport";
import AddCleanerModal from "./admin/addcleaners";
import MaintenanceTable from "./admin/maintenancerequests";
import InquiriesTable from "./admin/inquiries";
import Footer from "./components/footer";
import "./index.css";
import BnbBookings from "./admin/bnbbookings";
import AppartmentBookings from "./admin/appartmentsbookings";
import AboutUs from "./pages/about";
import { AuthContext } from "./context/authcontext";

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const isSuperuser = isAuthenticated && user && user.is_superuser;

  return (
    <div className="App">
      <Navbar />
      <div className="MainContent">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/appartments" element={<Apartments />} />
          <Route path="/bnbs" element={<Airbnbs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services/inquiry" element={<InquiryForm />} />
          {/* Normal routes accessible to all authenticated users */}
          {isAuthenticated && (
            <>
              <Route path="/services" element={<Services />} />
              <Route path="/services/transport" element={<TransportList />} />
              <Route path="/services/cleaners" element={<CleanerList />} />
              <Route
                path="/services/maintenance"
                element={<MaintenanceRequestForm />}
              />
            </>
          )}
          {/* Routes reserved for superusers */}
          {isSuperuser && (
            <>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin-dashboard" element={<AddApartmentModal />} />
              <Route path="/admin-addbnb" element={<AddBnBModal />} />
              <Route
                path="/admin-addtransport"
                element={<AddTransportModal />}
              />
              <Route path="/admin-addcleaner" element={<AddCleanerModal />} />
              <Route path="/admin-maintenance" element={<MaintenanceTable />} />
              <Route path="/admin-inquiries" element={<InquiriesTable />} />
              <Route path="/bnbbookings" element={<BnbBookings />} />
              <Route
                path="/apartmentbookings"
                element={<AppartmentBookings />}
              />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
