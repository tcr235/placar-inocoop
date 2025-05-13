import React from 'react';
import { HeaderBar } from '../components/HeaderBar';
import ActionButton from '../components/ActionButton';
import ClockDisplay from '../components/ClockDisplay';
import ConnectControl from '../components/ConnectControl';
import { BleProvider } from '../context/BleContext';

function HomeScreen(): React.JSX.Element {

  

  return (
    <BleProvider>
        <HeaderBar>
            <ConnectControl />
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
    </BleProvider>
  );
}

export default HomeScreen;
