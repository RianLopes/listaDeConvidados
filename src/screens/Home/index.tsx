import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import { styles } from './styles';
import { Partipant } from '@/components/Participant';
export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert("Participante Existe","Já existe um participante na lista com esse nome.");
        }

        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('');

    }

    function handleParticipantRemove(name: string) {

        Alert.alert("Remover",`Remover o participante ${name}?`,[
            {
                text: 'Sim', 
                onPress: () => {setParticipants(prevState => prevState.filter(participant => participant !== name)),
                    Alert.alert('Removido')}
            },
            {
                text: 'Não',
                style:'cancel'
            }]
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>
            <Text style={styles.eventDate}>
                Sexta, 4 de Novembro de 2022
            </Text>

            <View style={styles.form}> 
                <TextInput
                style={styles.input}
                placeholder='Nome do participante'
                placeholderTextColor='#6b6b6b'
                onChangeText={setParticipantName}
                value={participantName}
            />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                        <Partipant
                        key={item} 
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}/>
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />
        </View>
    );
}