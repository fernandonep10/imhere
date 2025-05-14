import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Participant from "../../components/Participant";
import { styles } from "./styles";

export default function Home() {
  const [participants, setParticipants] = useState([
    "Fernando",
    "Lucas",
    "João",
    "Rodolfo",
    "Marcos",
    "Ricardo",
    "Biro",
    "Biro 1",
    "Biro 2",
    "Biro 3",
    "Biro 4",
    "Biro 5",
    "Biro 6",
  ]);

  function handleParticipantAdd() {
    if (participants.includes("Fernando")) {
      return Alert.alert(
        "Participante Existe",
        "Já existe um participante na lista"
      );
    }
    console.log("Você clicou no botão de adicionar participante");
    return;
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          participants.splice(participants.indexOf(name), 1);
          setParticipants([...participants]);
          Alert.alert("Removido!");
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);

    return;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
          </Text>
        )}
      />
    </View>
  );
}
