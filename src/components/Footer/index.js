import React from 'react';
import { Link } from 'react-router-dom';
import './css/styles.css';
import facebookIcon from '../../assets/images/Footer/facebook.png';
import twitterIcon from '../../assets/images/Footer/twitter.png';
import youtubeIcon from '../../assets/images/Footer/youtube.png';
import instagramIcon from '../../assets/images/Footer/instagram.png';
import logo from '../../assets/images/Footer/LogoPet_vita(Atualizado).png';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Pet Vita Logo" />
          <p>© Pet Vita 2025</p>
        </div>
        
        <div className="footer-links">
          <h6>Recursos</h6>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/sobre">Sobre nós</Link></li>
            <li><Link to="/consultas">Consultas</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h6>Contatos</h6>
          <ul>
            <li><a href="mailto:petvitacuidados@gmail.com">petvitacuidados@gmail.com</a></li>
            <li><a href="tel:+5511999999999">(11) 99999-9999</a></li>
            <li><a href="mailto:petvitacuidados@outlook.com">petvitacuidados@outlook.com</a></li>
          </ul>
        </div>
        
        <div className="footer-social">
          <h6>Redes Sociais</h6>
          <div className="social-icons">
            <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
            <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
            <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;