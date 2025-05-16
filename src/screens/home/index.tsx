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
  // string[] serve para informar que o valor é um array de string
  // Mas só precisa ser usado quando o valor incial é indefinido (vazio)
  const [participants, setParticipants] = useState<string[]>([]);

  const [newParticipant, setNewParticipant] = useState("");

  function handleParticipantAdd() {
    // Verifica se o participante já existe na lista
    if (participants.includes(newParticipant)) {
      return Alert.alert(
        "Participante Existe!",
        "Já existe um participante na lista."
      );
    }

    // Verifica se o campo está vazio
    if (newParticipant === "") {
      return Alert.alert(
        "Campo vazio!",
        "Por favor, preencha o campo com o nome do participante."
      );
    }

    setParticipants((prevState) => [...prevState, newParticipant]);
    setNewParticipant("");

    return;
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          );
          //Alert.alert("Removido!");
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
          onChangeText={setNewParticipant}
          value={newParticipant}
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
