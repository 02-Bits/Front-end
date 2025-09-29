import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
const DetalhesConsultaScreen = ({ navigation, route }) => {
  const { consulta } = route.params || {};
  
  // Se não houver dados da consulta, usar dados padrão
  const consultaData = consulta || {
    petName: "Mascote",
    service: "Serviço",
    time: "Horário",
    data: "Data",
    sintomas: "Sintomas não informados",
    localizacao: "Localização não informada",
    implementos: [],
    imageSource: require('../assets/cat1.png')
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Agendada</Text>
          </View>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* Pet Info */}
          <View style={styles.petInfoContainer}>
            <Image
              source={consultaData.imageSource}
              style={styles.petImage}
            />
            <Text style={styles.petName}>{consultaData.petName}</Text>
          </View>

          {/* Consultation Details */}
          <View style={styles.section}>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>{consultaData.time} | {consultaData.data}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>{consultaData.service}</Text>
            </View>
          </View>
 
          {/* Symptom Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição dos Sintomas</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                {consultaData.sintomas}
              </Text>
            </View>
          </View>
 
          {/* Required Implements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Implementos Necessários</Text>
            <View style={styles.tagsContainer}>
              {consultaData.implementos.map((implemento, index) => (
                <View key={index} style={[styles.tag, styles.tagGreen]}>
                  <Text style={styles.tagTextGreen}>{implemento}</Text>
                </View>
              ))}
            </View>
          </View>
 
          {/* Observation */}
          <View style={styles.section}>
            <Text style={styles.observationText}>
              Dependendo do caso, recomendamos que você traga qualquer item adicional que considere levar.
            </Text>
          </View>
 
          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <Text style={styles.locationText}>
              {consultaData.localizacao}
            </Text>
            <View style={styles.mapIconsContainer}>
              {/* Placeholder for map icons */}
              <Image source={require('../assets/carrinho.png')} style={styles.mapIcon} />
              <Image source={require('../assets/google_maps.png')} style={styles.mapIcon} />
            </View>
          </View>
          {/* Botões de ação - diferentes por status */}
          <View style={styles.actionButtonsContainer}>
            {consultaData.status === 'Concluída' && (
              <TouchableOpacity style={styles.reportButton} onPress={() => {}}>
                <Text style={styles.reportButtonText}>Gerar Relatório</Text>
              </TouchableOpacity>
            )}
            
            {consultaData.status === 'Agendada' && (
              // Nenhum botão para consultas agendadas - área em branco
              null
            )}
            
            {consultaData.status === 'Andamento' && (
              <>
                <TouchableOpacity style={styles.emergencyButton} onPress={() => {}}>
                  <Text style={styles.emergencyButtonText}>Clique Aqui</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => {}}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  statusBadge: {
    backgroundColor: '#A367F0',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#8D7EFB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petInfoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6E59D9',
  },
  section: {
    marginBottom: 16,
  },
  detailRow: {
    backgroundColor: '#F0EBFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#8D7EFB',
  },
  detailText: {
    fontSize: 13,
    color: '#6E59D9',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8D7EFB',
    marginBottom: 8,
  },
  descriptionBox: {
    backgroundColor: '#F7F5FF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E7E3FB',
  },
  descriptionText: {
    fontSize: 13,
    color: '#4B5563'
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  reportButton: {
    backgroundColor: '#A367F0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cancelButtonText: {
    color: '#A367F0',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  emergencyButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagGreen: {
    backgroundColor: '#F0ECFF',
  },
  tagTextGreen: {
    color: '#6E59D9',
    fontSize: 12,
  },
  tagRed: {
    backgroundColor: '#E6D7FB',
  },
  tagTextRed: {
    color: '#6E59D9',
    fontSize: 12,
  },
  observationText: {
    fontSize: 12,
    color: '#6E59D9'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8D7EFB',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    width: '70%',
    marginRight: 24,
  },
  mapIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  mapIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  iconImage: {
    width: 24,
    height: 24,
  }
});
 
export default DetalhesConsultaScreen;