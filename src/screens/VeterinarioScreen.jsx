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

  const renderContent = () => {
    const Card = ({ petName, service, time, imageSource, status }) => (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetalhesConsulta')}>
        <Image source={imageSource} style={styles.petImage} />
        <View style={styles.cardInfo}>
          <Text style={styles.petName}>{petName}</Text>
          <Text style={styles.service}>{service}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={[styles.statusBadgeCard, styles[`status${status}`]]}>
          <Text style={styles.statusTextCard}>{status}</Text>
        </View>
      </TouchableOpacity>
    );

    switch (activeTab) {
      case 'Agendada':
        return (
          <>
            <Card petName="Mascote 1" service="Consulta Geral" time="10:00 AM" imageSource={require('../assets/cat1.png')} status="Agendada" />
            <Card petName="Mascote 2" service="Vacinação" time="02:30 PM" imageSource={require('../assets/dog1.png')} status="Agendada" />
          </>
        );
      case 'Andamento':
        return (
          <>
            <Card petName="Mascote 3" service="Exame de Sangue" time="09:00 AM" imageSource={require('../assets/dog2.png')} status="Andamento" />
          </>
        );
      case 'Concluídas':
        return (
          <>
            <Card petName="Mascote 4" service="Tosa" time="04:00 PM" imageSource={require('../assets/cat1.png')} status="Concluída" />
            <Card petName="Mascote 5" service="Banho" time="01:00 PM" imageSource={require('../assets/dog1.png')} status="Concluída" />
          </>
        );
      default:
        return null;
    }
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

      <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('DetalhesConsulta')}>
        <Text style={styles.scheduleButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE4F4',
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#EBE4F4',
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