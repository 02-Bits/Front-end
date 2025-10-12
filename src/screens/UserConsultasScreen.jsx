import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors } from '../Utils/Theme';

const UserConsultasScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Pendentes');

  const consultasData = {
    Pendentes: [
      {
        id: 1,
        petName: "Mascote 1",
        service: "Consulta Geral",
        time: "10:00 AM",
        imageSource: require('../assets/cat1.png'),
        status: "Pendentes",
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
        status: "Pendentes",
        data: "14:00 | 06/02/2025",
        sintomas: "Vacinação anual de rotina para meu cachorro.",
        localizacao: "Av. Paulista, 1000 – Bela Vista, São Paulo – SP, 01310-000",
        implementos: ["Vacina", "Algodão", "Álcool"]
      }
    ],
    Aceitas: [
      {
        id: 3,
        petName: "Mascote 3",
        service: "Exame de Sangue",
        time: "09:00 AM",
        imageSource: require('../assets/dog2.png'),
        status: "Aceitas",
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
        status: "Concluídas",
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
        status: "Concluídas",
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
        onPress={() => {
          const parts = consulta.data.split(' | ');
          const datePart = parts[1]; // "DD/MM/YYYY"
          const [day, month, year] = datePart.split('/');
          const formattedDateForDetails = `${year}-${month}-${day}`;
          navigation.navigate('DetalhesConsulta', { consulta: { ...consulta, data: formattedDateForDetails } });
        }}
      >
        <Image source={consulta.imageSource} style={styles.petImage} />
        <View style={styles.cardInfo}>
          <Text style={styles.petName}>{consulta.petName}</Text>
          <Text style={styles.service}>{consulta.service}</Text>
          <Text style={styles.time}>{consulta.time}</Text>
        </View>
        <View style={styles.actionsContainer}>
          {activeTab === 'Pendentes' && (
            <>
              <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                <Text style={styles.actionButtonText}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
                <Text style={styles.actionButtonText}>Rejeitar</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity style={[styles.actionButton, styles.detailsButton]}>
            <Text style={styles.actionButtonText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );

    const currentConsultas = consultasData[activeTab] || [];

    return (
      <ScrollView style={styles.contentContainer}>
        {currentConsultas.map((consulta) => (
          <Card key={consulta.id} consulta={consulta} />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Pendentes' && styles.activeTab]}
          onPress={() => setActiveTab('Pendentes')}
        >
          <Text style={[styles.tabText, activeTab === 'Pendentes' && styles.activeTabText]}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Aceitas' && styles.activeTab]}
          onPress={() => setActiveTab('Aceitas')}
        >
          <Text style={[styles.tabText, activeTab === 'Aceitas' && styles.activeTabText]}>Aceitas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Concluídas' && styles.activeTab]}
          onPress={() => setActiveTab('Concluídas')}
        >
          <Text style={[styles.tabText, activeTab === 'Concluídas' && styles.activeTabText]}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPurpleBackground,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: Colors.veryLightPurple,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.veryLightPurple,
  },
  activeTab: {
    backgroundColor: Colors.mediumPurple,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.mediumPurple,
  },
  activeTabText: {
    color: Colors.darkHighlightPurple,
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.veryLightPurpleBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightPurple,
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
    color: Colors.darkHighlightPurple,
    fontSize: 16,
  },
  service: {
    fontSize: 12,
    color: Colors.mediumPurple,
  },
  time: {
    fontSize: 12,
    color: Colors.lightPurple,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: Colors.green,
  },
  rejectButton: {
    backgroundColor: Colors.red,
  },
  detailsButton: {
    backgroundColor: Colors.purple,
  },
});

export default UserConsultasScreen;