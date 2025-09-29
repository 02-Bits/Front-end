import React, { useState } from 'react'; 
 import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'; 
 // É essencial ter esta dependência para o ícone de imagem no avatar 
 import Icon from 'react-native-vector-icons/FontAwesome5'; // Ou similar 
 
 // --- Definições de Cores --- 
 const COLORS = { 
   background: '#FFFFFF', // Fundo BRANCO PURO (como solicitado) 
   text: '#333333', // Cor de texto principal (Usuario, Labels) 
   placeholderText: '#999999', // Cor para o texto de dados (Email, Telefone) 
   inputBackground: '#F4EFF2', // O fundo branco-rosado das caixas de texto na imagem 
   inputBorder: '#FFFFFF', // A borda é transparente ou da cor de fundo (branco) 
   avatarBg: '#F4EFF2', // Branco-rosado claro do círculo superior 
   icon: '#333333', // Cor do ícone de câmera/imagem 
 }; 
 
 // --- Componente para o Campo de Dados --- 
 const DataField = ({ label, value, isSecure = false, isEditable = false, onChangeText, keyboardType }) => ( 
   <View style={styles.fieldContainer}> 
     <Text style={styles.label}>{label}</Text> 
     <View style={[ 
         styles.input, 
         {backgroundColor: isEditable ? COLORS.inputBackground : COLORS.inputBackground} 
     ]}> 
         {/* Usamos TextInput mesmo para campos não editáveis para manter a aparência de "caixa" */} 
         <TextInput 
             style={styles.inputValue} 
             value={value} 
             editable={isEditable} // Define se o campo pode ser editado 
             secureTextEntry={isSecure} // Esconde a senha 
             placeholderTextColor={COLORS.placeholderText} 
             onChangeText={onChangeText} 
             keyboardType={keyboardType} 
         /> 
     </View> 
   </View> 
 ); 
 
 // --- Componente da Tela de Perfil Principal --- 
 const ProfileScreen = () => { 
     // Dados simulados para a tela 
     const [name, setName] = useState('Pedro');
     const [email, setEmail] = useState('exemplo@gmail.com');
     const [phone, setPhone] = useState('00 0000-00000');

     const handleNameChange = (text) => {
        const cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
        setName(cleanedText);
     };

     const handlePhoneChange = (text) => {
        let cleanedText = text.replace(/[^0-9]/g, '');
        if (cleanedText.length > 2) {
            cleanedText = cleanedText.substring(0, 2) + ' ' + cleanedText.substring(2);
        }
        setPhone(cleanedText);
     };

     return ( 
         <View style={styles.container}> 
             {/* Cabeçalho/Avatar */} 
             <View style={styles.header}> 
                 {/* Círculo do Avatar */} 
                 <View style={styles.userAvatar}> 
                     {/* Ícone de imagem dentro do círculo */} 
                     <TouchableOpacity style={styles.editAvatarIcon}> 
                         <Icon name="image" size={24} color={COLORS.icon} /> 
                     </TouchableOpacity> 
                 </View> 
                 <TextInput
                    style={styles.username}
                    value={name}
                    onChangeText={handleNameChange}
                    editable={true}
                 />
             </View> 
 
             {/* Campos de Dados */} 
             <View style={styles.dataContainer}> 
                 {/* Email */} 
                 <DataField 
                     label="Email" 
                     value={email}
                     isEditable={true} // Mantendo como não editável para replicar a imagem
                     onChangeText={setEmail}
                     keyboardType="email-address"
                 /> 
 
                 {/* Senha */} 
                 <DataField 
                     label="Senha" 
                     value="**********" 
                     isSecure={true} 
                     isEditable={true} // Mantendo como não editável para replicar a imagem
                     onChangeText={() => {}} // Senha não é editável diretamente aqui
                 /> 
                 
                 {/* Telefone */} 
                 <DataField 
                     label="Telefone" 
                     value={phone}
                     isEditable={true} // Mantendo como não editável para replicar a imagem
                     onChangeText={handlePhoneChange}
                     keyboardType="phone-pad"
                 /> 
 
                 {/* Pode-se adicionar um botão "Salvar" ou "Editar" aqui se fosse editável */} 
             </View> 
         </View> 
     ); 
 }; 
 
 // --- Estilos --- 
 const styles = StyleSheet.create({ 
     container: { 
         flex: 1, 
         // O padding vertical é reduzido comparado ao seu exemplo para centralizar mais 
         paddingVertical: 50, 
         backgroundColor: COLORS.background, // Fundo BRANCO (Fundo amarelo da imagem original foi trocado) 
         paddingHorizontal: 20, 
     }, 
 
     // Cabeçalho e Avatar 
     header: { 
         alignItems: 'center', 
         marginBottom: 60, // Aumentado para dar mais espaço, como na imagem 
     }, 
     userAvatar: { 
         width: 140, // Maior que no seu exemplo 
         height: 140, // Maior que no seu exemplo 
         backgroundColor: COLORS.avatarBg, 
         borderRadius: 70, // Metade do tamanho para ser um círculo perfeito 
         marginBottom: 20, 
         justifyContent: 'center', 
         alignItems: 'center', 
     }, 
     editAvatarIcon: { 
         position: 'absolute', 
         bottom: 5, 
         right: 5, 
         padding: 10, 
         backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fundo semi-transparente para o ícone 
         borderRadius: 15, 
     }, 
     username: { 
         fontSize: 30, // Maior que no seu exemplo 
         fontWeight: 'bold', 
         color: COLORS.text, 
         letterSpacing: 0.5, // Leve espaçamento para simular o estilo da imagem 
         textAlign: 'center', 
     }, 
 
     // Campos de Dados 
     dataContainer: { 
         paddingHorizontal: 15, 
     }, 
     fieldContainer: { 
         marginBottom: 30, // Espaço entre os campos 
     }, 
     label: { 
         fontSize: 14, 
         fontWeight: 'bold', 
         color: COLORS.text, 
         marginBottom: 8, 
         // Usando alinhamento em coluna como na imagem original 
         alignSelf: 'flex-start', 
     }, 
     input: { 
         // Estilo da caixa de texto 
         height: 50, 
         backgroundColor: COLORS.inputBackground, 
         borderRadius: 25, // Borda arredondada como na imagem 
         paddingHorizontal: 20, 
         justifyContent: 'center', 
     }, 
     inputValue: { 
         fontSize: 16, 
         color: COLORS.text, 
         padding: 0, // Remover padding padrão do TextInput 
     }, 
 }); 
 
 export default ProfileScreen;