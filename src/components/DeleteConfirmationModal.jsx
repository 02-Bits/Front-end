import React from 'react'; 
 import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
 
 // --- Definições de Cores --- 
 const COLORS = { 
   // O modal principal será transparente. O fundo da tela (overlay) manterá a cor escura 
   textColor: '#333333', 
   cancelButtonBg: '#C0DEDF', // Azul/verde claro 
   deleteButtonBg: '#DD5246', // Vermelho 
   buttonText: '#FFFFFF', 
 }; 
 
 // --- Componente do Modal de Confirmação --- 
 const DeleteConfirmationModal = ({ onCancel, onDelete }) => { 
   return ( 
     // O 'overlay' simula o fundo semi-transparente que escurece o que está atrás 
     <View style={styles.overlay}> 
       <View style={styles.modalContainer}> 
         
         {/* Texto de Informação */} 
         <Text style={styles.infoText}> 
           Tem certeza de que deseja {'\n'}excluir sua conta? 
         </Text> 
 
         {/* Contêiner dos Botões */} 
         <View style={styles.buttonContainer}> 
           <TouchableOpacity 
             style={[styles.button, styles.cancelButton]} 
             onPress={onCancel} 
           > 
             <Text style={styles.buttonText}>Cancelar</Text> 
           </TouchableOpacity> 
 
           <TouchableOpacity 
             style={[styles.button, styles.deleteButton]} 
             onPress={onDelete} 
           > 
             <Text style={styles.buttonText}>Excluir</Text> 
           </TouchableOpacity> 
         </View> 
       </View> 
     </View> 
   ); 
 }; 
 
 // --- Estilos --- 
 const styles = StyleSheet.create({ 
   overlay: { 
     flex: 1, 
     justifyContent: 'center', 
     alignItems: 'center', 
     // Fundo da tela por trás do modal. Se não quiser nenhum escurecimento, use 'transparent' 
     backgroundColor: 'rgba(0,0,0,0.5)', 
   }, 
   modalContainer: { 
     width: '80%', 
     // Fundo totalmente transparente para o "quadrado" principal 
     backgroundColor: 'transparent', 
     // A borda de 15 que você pediu 
     borderRadius: 15, 
     padding: 30, 
     alignItems: 'center', 
     // **Importante:** Se o fundo é transparente, a sombra (shadow/elevation) não funcionará bem 
     // A sombra deve ser aplicada aos elementos internos se desejar profundidade 
   }, 
   infoText: { 
     fontSize: 22, 
     fontWeight: 'bold', 
     color: COLORS.textColor, 
     textAlign: 'center', 
     marginBottom: 30, 
     lineHeight: 30, 
     // Se o fundo do modal é transparente, o texto pode precisar de um fundo 
     backgroundColor: 'white', // Adiciona um fundo branco ao texto para ser legível (opcional) 
     padding: 10, 
     borderRadius: 8, 
   }, 
   buttonContainer: { 
     flexDirection: 'row', 
     justifyContent: 'space-between', 
     width: '100%', 
   }, 
   button: { 
     flex: 1, 
     paddingVertical: 15, 
     borderRadius: 10, 
     alignItems: 'center', 
     marginHorizontal: 5, 
   }, 
   cancelButton: { 
     backgroundColor: COLORS.cancelButtonBg, 
   }, 
   deleteButton: { 
     backgroundColor: COLORS.deleteButtonBg, 
   }, 
   buttonText: { 
     color: COLORS.buttonText, 
     fontSize: 18, 
     fontWeight: 'bold', 
   }, 
 }); 
 
 export default DeleteConfirmationModal;