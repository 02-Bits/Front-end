import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProfileScreen from "../pages/Perfil";
import Pets from "../pages/Pets/PetsProfile";
import AddPet from "../pages/Pets/AddPets";
import PetsDetails from "../pages/Pets/PetsDetails";
import ConsulAccepted from "../pages/Consultations/ConsulAccepted";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<ProfileScreen />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pets-details" element={<PetsDetails />} />
        <Route path="/consultas" element={<ConsulAccepted />} />
      </Routes>
    </BrowserRouter>
  );
}