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
 
const DetalhesConsultaScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton}>
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
              source={require('../assets/cat1.png')} // Placeholder image
              style={styles.petImage}
            />
            <Text style={styles.petName}>Benjie</Text>
          </View>
 
          {/* Consultation Details */}
          <View style={styles.section}>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>15:23 | 05/02/2025</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Estômago</Text>
            </View>
          </View>
 
          {/* Symptom Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição dos Sintomas</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                Meu cachorro acordou vomitando, ele está dormindo mais que o normal e não está comendo nada, não sei o que fazer.
              </Text>
            </View>
          </View>
 
          {/* Required Implements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Implementos Necessários</Text>
            <View style={styles.tagsContainer}>
              <View style={[styles.tag, styles.tagGreen]}><Text style={styles.tagTextGreen}>Termômetro</Text></View>
              <View style={[styles.tag, styles.tagGreen]}><Text style={styles.tagTextGreen}>Estetoscópio</Text></View>
              <View style={[styles.tag, styles.tagGreen]}><Text style={styles.tagTextGreen}>Soro</Text></View>
              <View style={[styles.tag, styles.tagRed]}><Text style={styles.tagTextRed}>Vermífugo</Text></View>
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
              R. Bento Branco de Andrade Filho, 379 – Santo Amaro, São Paulo – SP, 04757-000
            </Text>
            <View style={styles.mapIconsContainer}>
              {/* Placeholder for map icons */}
              <Image source={require('../assets/carrinho.png')} style={styles.mapIcon} />
              <Image source={require('../assets/google_maps.png')} style={styles.mapIcon} />
            </View>
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
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 8,
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
    backgroundColor: '#EBE4F4',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  }
});
 
export default DetalhesConsultaScreen;