import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet,} from 'react-native';

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    setModalVisible(false);
    setSuccessVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setUsername('');
                  setPassword('');
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!username || !password}
                onPress={handleSignIn}
                style={[
                  styles.signInBtn,
                  {
                    backgroundColor:
                      username && password ? 'blue' : 'gray',
                  },
                ]}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Text style={styles.successText}>
              Signed In Successfully
            </Text>

            <Text style={styles.greeting}>
              Hi {username}
            </Text>

            <Button
              title="Close"
              onPress={() => {
                setSuccessVisible(false);
                setModalVisible(true);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  openButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    width: 200,
  },

  openButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  card: {
    width: 320,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },

  cancelText: {
    color: 'red',
    fontWeight: 'bold',
  },

  signInBtn: {
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },

  signInText: {
    color: 'white',
    fontWeight: 'bold',
  },

  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },

  greeting: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
});