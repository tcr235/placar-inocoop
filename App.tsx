import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import useBLE from './src/utils/ble';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (connectedDevice) {
      startClockSync(connectedDevice);
    } else {
      stopClockSync();
    }
    return () => {
      stopClockSync();
    };
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 16,
  };

  const {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    startClockSync,
    stopClockSync,
  } = useBLE();

  const [status, setStatus] = useState<string>('Idle');
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const handleConnection = async () => {
    setStatus('Requesting Permissions...');
    setIsLoading(true);

    const granted = await requestPermissions();
    if (!granted) {
      setStatus('Permition denied');
      setIsLoading(false);
      return;
    }

    else if (connectedDevice) {
      setStatus('Disconnecting...');
      disconnectFromDevice();
      setStatus('Disconnected');
      setIsLoading(false);
      return;
    }

    setStatus('Searching device...');
    scanForPeripherals();

    setTimeout(async () => {
      const placarDevice = allDevices.find((device) =>
        device.name?.includes('Placar Inocoop')
      );

      if (placarDevice) {
        setStatus(`Connecting ${placarDevice.name}...`);
        try {
          await connectToDevice(placarDevice);
          setStatus('Connected with ' + placarDevice.name);
        } catch (error) {
          setStatus('Conection error');
        }
      } else {
        setStatus('Device not found');
      }

      setIsLoading(false);
    }, 6000);
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? '#444' : '#007AFF' },
        ]}
        onPress={handleConnection}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Connecting...' : connectedDevice ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 24 }}>
        {isLoading && <ActivityIndicator size="large" color="#888" />}
        <Text style={[styles.statusText, { color: isDarkMode ? '#fff' : '#000' }]}>
          {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  statusText: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default App;
