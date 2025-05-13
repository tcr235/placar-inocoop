import React, { useEffect, useState } from 'react';
import useBLE from '../utils/ble';
import { HeaderBar } from '../components/HeaderBar';
import ActionButton from '../components/ActionButton';
import ClockDisplay from '../components/ClockDisplay';

function HomeScreen(): React.JSX.Element {

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


  useEffect(() => {
    if (connectedDevice) {
      startClockSync(connectedDevice);
    } else {
      stopClockSync();
    }
    return () => {
      stopClockSync();
    };
  }, [connectedDevice]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConnection = async () => {
    setIsLoading(true);

    const granted = await requestPermissions();
    if (!granted) {
      setIsLoading(false);
      return;
    }

    else if (connectedDevice) {
      disconnectFromDevice();
      setIsLoading(false);
      return;
    }

    scanForPeripherals();

    setTimeout(async () => {
      const placarDevice = allDevices.find((device) =>
        device.name?.includes('Placar Inocoop')
      );

      if (placarDevice) {
        try {
          await connectToDevice(placarDevice);
        } catch (error) {
            console.error('Error connecting to device:', error);
        }
      }

      setIsLoading(false);
    }, 6000);
  };

  return (
    <HeaderBar>
        <ActionButton 
            label={isLoading ? 'Conectando...' : connectedDevice ? 'Desconectar' : 'Conectar'}
            backgroundColor={connectedDevice ? "#ff0000" : "#444"}
            onPress={handleConnection}
            disabled={isLoading}
        />

        <ActionButton 
            label="Zerar Placar"
            backgroundColor="#444"
            onPress={() => {}}
        />

        <ActionButton 
            label="Modo Torneio"
            backgroundColor="#444"
            onPress={() => {}}
        />
        <ClockDisplay time="00:00" />
    </HeaderBar>
  );
}

export default HomeScreen;
