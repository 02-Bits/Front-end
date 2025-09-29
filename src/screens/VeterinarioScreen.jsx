import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ConsultasScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Agendada');

  // Dados das consultas com informações únicas para cada pet
  const consultasData = {
    Agendada: [
      {
        id: 1,
        petName: "Mascote 1",
        service: "Consulta Geral", 
        time: "10:00 AM",
        imageSource: require('../assets/cat1.png'),
        status: "Agendada",
        data: "15:23 | 05/02/2025",
        sintomas: "Meu gato acordou vomitando, está dormindo mais que o normal e não está comendo nada.",
        localizacao: "R. Bento Branco de Andrade Filho, 379 – Santo Amaro, São Paulo – SP, 04757-000",
        implementos: ["Termômetro", "Estetoscópio", "Soro"]
      },
      {
        id: 2,
        petName: "Mascote 2", 
        service: "Vacinação",
        time: "02:30 PM",
        imageSource: require('../assets/dog1.png'),
        status: "Agendada",
        data: "14:00 | 06/02/2025",
        sintomas: "Vacinação anual de rotina para meu cachorro.",
        localizacao: "Av. Paulista, 1000 – Bela Vista, São Paulo – SP, 01310-000",
        implementos: ["Vacina", "Algodão", "Álcool"]
      }
    ],
    Andamento: [
      {
        id: 3,
        petName: "Mascote 3",
        service: "Exame de Sangue", 
        time: "09:00 AM",
        imageSource: require('../assets/dog2.png'),
        status: "Andamento",
        data: "09:00 | 05/02/2025",
        sintomas: "Meu cachorro está com fraqueza e perda de apetite, precisa de exame de sangue.",
        localizacao: "R. Augusta, 500 – Consolação, São Paulo – SP, 01305-000",
        implementos: ["Agulha", "Tubo de coleta", "Algodão"]
      }
    ],
    Concluídas: [
      {
        id: 4,
        petName: "Mascote 4",
        service: "Tosa", 
        time: "04:00 PM",
        imageSource: require('../assets/cat1.png'),
        status: "Concluída",
        data: "16:00 | 04/02/2025",
        sintomas: "Tosa de rotina para meu gato de pelo longo.",
        localizacao: "R. Oscar Freire, 800 – Jardim Paulista, São Paulo – SP, 01426-000",
        implementos: ["Tesoura", "Máquina de tosa", "Pente"]
      },
      {
        id: 5,
        petName: "Mascote 5",
        service: "Banho", 
        time: "01:00 PM",
        imageSource: require('../assets/dog1.png'),
        status: "Concluída",
        data: "13:00 | 04/02/2025",
        sintomas: "Banho e higienização completa para meu cachorro.",
        localizacao: "R. Haddock Lobo, 500 – Jardim Paulista, São Paulo – SP, 01414-000",
        implementos: ["Shampoo", "Condicionador", "Toalha"]
      }
    ]
  };

  const renderContent = () => {
    const Card = ({ consulta }) => (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('DetalhesConsulta', { consulta })}
      >
        <Image source={consulta.imageSource} style={styles.petImage} />
        <View style={styles.cardInfo}>
          <Text style={styles.petName}>{consulta.petName}</Text>
          <Text style={styles.service}>{consulta.service}</Text>
          <Text style={styles.time}>{consulta.time}</Text>
        </View>
        <View style={[styles.statusBadgeCard, styles[`status${consulta.status}`]]}>
          <Text style={styles.statusTextCard}>{consulta.status}</Text>
        </View>
      </TouchableOpacity>
    );

    const currentConsultas = consultasData[activeTab] || [];
    
    return (
      <ScrollView style={styles.container}>
        {currentConsultas.map((consulta) => (
          <Card key={consulta.id} consulta={consulta} />
        ))}
      </ScrollView>
    );
  };

  const handleAgendarConsulta = () => {
    navigation.navigate('Agendamento');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Agendada' && styles.activeTab]}
          onPress={() => setActiveTab('Agendada')}
        >
          <Text style={[styles.tabText, activeTab === 'Agendada' && styles.activeTabText]}>Agendada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Andamento' && styles.activeTab]}
          onPress={() => setActiveTab('Andamento')}
        >
          <Text style={[styles.tabText, activeTab === 'Andamento' && styles.activeTabText]}>Andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Concluídas' && styles.activeTab]}
          onPress={() => setActiveTab('Concluídas')}
        >
          <Text style={[styles.tabText, activeTab === 'Concluídas' && styles.activeTabText]}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>{renderContent()}</ScrollView>

      <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('Agendamento')}>
        <Text style={styles.scheduleButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#A367F0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8D7EFB',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 80,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C79DFD',
  },
  petImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  petName: {
    fontWeight: 'bold',
    color: '#A367F0',
  },
  service: {
    fontSize: 12,
    color: '#8D7EFB',
  },
  time: {
    fontSize: 12,
    color: '#C49DF6',
  },
  statusBadgeCard: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusTextCard: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusAgendada: {
    backgroundColor: 'rgba(141, 126, 251, 0.8)' // #8D7EFB with opacity
  },
  statusAndamento: {
    backgroundColor: 'rgba(196, 157, 246, 0.8)', // #C49DF6 with opacity
  },
  statusConcluída: {
    backgroundColor: 'rgba(163, 103, 240, 0.8)' // #A367F0 with opacity
  },
  scheduleButton: {
    backgroundColor: '#A367F0', // Gradient would be 'linear-gradient(to right, #A367F0, #8D7EFB)'
    height: 44,
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24, // Added for bottom spacing
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConsultasScreen;