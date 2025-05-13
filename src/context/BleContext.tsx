import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import useBLE, { BluetoothLowEnergyApi } from '../utils/ble';

interface BleContextProps extends BluetoothLowEnergyApi {}

const BleContext = createContext<BleContextProps | undefined>(undefined);

interface BleProviderProps {
  children: ReactNode;
}

export const BleProvider: React.FC<BleProviderProps> = ({ children }) => {
  const ble = useBLE();

  useEffect(() => {
    if (ble.connectedDevice) {
      ble.startClockSync(ble.connectedDevice);
    } else {
      ble.stopClockSync();
    }
    return () => {
      ble.stopClockSync();
    };
  }, [ble.connectedDevice]);

  return (
    <BleContext.Provider value={ble}>
      {children}
    </BleContext.Provider>
  );
};

export function useBleContext(): BleContextProps {
  const context = useContext(BleContext);
  if (!context) {
    throw new Error('useBleContext must be used within a BleProvider');
  }
  return context;
}
