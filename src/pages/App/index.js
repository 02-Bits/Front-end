import React from 'react';
import Header from '../../components/HeaderSemCadastro';
import Footer from '../../components/Footer';
import IphoneApp1 from '../../assets/images/App/Iphone_app_1.png';
import IphoneApp2 from '../../assets/images/App/Iphone_app_2.png';
import PessoasIcon from '../../assets/images/App/Pessoas.png';
import CasaIcon from '../../assets/images/App/Casa.png';
import MaletaSaudeIcon from '../../assets/images/App/Mala_saude.png';
import './css/styles.css';

const App = () => {
  return (
    <div className="app-page">
      <Header />
      
      <div className="section">
        <h1 className="app-title">Aplicativo</h1>
        
        {/* Primeira seção do app */}
        <div className="app-preview">
          <img src={IphoneApp2} alt="App Preview 1" className="app-phone" />
          <div className="text-box">
            <h3>Nosso aplicativo tem como premissa ajudar e auxiliar os clientes de clínicas veterinárias a obter um atendimento mais 
              rápido e ágil, de forma a facilitar a comunicação entre os tutores dos pets e os profissionais da clínica.</h3>
          </div>
        </div>
        
        {/* Segunda seção do app (invertida) */}
        <div className="app-preview second-screen">
          <img src={IphoneApp1} alt="App Preview 2" className="app-phone" />
          <div className="text-box">
            <h3>Oferecemos agendamento de consultas, acompanhamento dos cuidados do seu pet, histórico médico digital e comunicação 
              direta com os profissionais da clínica — tudo para facilitar o cuidado e garantir a saúde do seu melhor amigo.</h3>
          </div>
        </div>

        {/* Seção de estatísticas */}
        <div className="stats">
          {/* Veterinários */}
          <div className="stat animated-fade-in">
            <img src={PessoasIcon} alt="Veterinários icon" className="icon" />
            <h2>+1200<br />Veterinários</h2>
            <p>Profissionais qualificados em todo o Brasil</p>
          </div>
          
          {/* Clínicas */}
          <div className="stat animated-fade-in">
            <img src={CasaIcon} alt="Clínicas icon" className="icon" />
            <h2>+1200<br />Clínicas</h2>
            <p>Locais prontos para receber seu pet</p>
          </div>
          
          {/* Especialistas */}
          <div className="stat animated-fade-in">
            <img src={MaletaSaudeIcon} alt="Especialistas icon" className="icon" />
            <h2>+100<br />Especialistas</h2>
            <p>Em diversas áreas de saúde animal</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;