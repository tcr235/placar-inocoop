import ActionButton from "./ActionButton";
import { useState } from "react";
import { useBleContext } from "../context/BleContext";


const ConnectControl: React.FC = () => {
    const {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
  } = useBleContext();
  
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
}
    return (
        <ActionButton
            label={
            isLoading
                ? 'Conectando...'
                : connectedDevice
                ? 'Desconectar'
                : 'Conectar'
            }
            onPress={handleConnection}
            disabled={isLoading}
            style={{ backgroundColor: connectedDevice ? '#FF0000' : '#444' }}
        />
    );
};

export default ConnectControl;

