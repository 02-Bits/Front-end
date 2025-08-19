import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProfileScreen from "../pages/Perfil";
import Pets from "../pages/Pets/PetsProfile";
import AddPet from "../pages/Pets/AddPets";
import PetsDetails from "../pages/Pets/PetsDetails";
import ConsulPending from "../pages/Consultations/ConsulPending";
import ConsulCompleted from "../pages/Consultations/ConsulCompleted";
import ConsulDetails from "../pages/Consultations/ConsulDetails";
import ConsulCompleteDetails from "../pages/Consultations/ConsulCompletedDetails";
import ScheduleAppointment from "../pages/Consultations/ScheduleAppointment";
import ModalRegisterUser from "../components/ModalRegisterUser";
import ModalRegisterVet from "../components/ModalRegisterVet";
import AbaoutUs from "../pages/AboutUs";
import App from "../pages/App";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<ProfileScreen />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pets-details" element={<PetsDetails />} />
        <Route path="/consultas" element={<ConsulPending />} />
        <Route path="/consultas/concluidas" element={<ConsulCompleted />} />
        <Route path="/detalhes-consulta" element={<ConsulDetails />} />
        <Route path="/detalhes-consulta-concluida" element={<ConsulCompleteDetails />} />
        <Route path="/agendar-consulta" element={<ScheduleAppointment />} />
        <Route path="/register-user" element={<ModalRegisterUser />} />
        <Route path="/register-vet" element={<ModalRegisterVet />} />
        <Route path="/sobre-nos" element={<AbaoutUs />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}