export interface Pet {
  id: string;
  nome: string;
  servico: string;
  horario: string;
  imagem: any;
}

export type RootStackParamList = {
  Home: undefined;
  AddPet: undefined;
  PetDetails: { petData: Pet };
};