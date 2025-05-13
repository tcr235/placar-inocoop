import React from 'react';
import { HeaderBar } from '../components/HeaderBar';
import ActionButton from '../components/ActionButton';
import ClockDisplay from '../components/ClockDisplay';
import ConnectControl from '../components/ConnectControl';
import { BleProvider } from '../context/BleContext';
import { ClockProvider } from '../context/ClockContext';

function HomeScreen(): React.JSX.Element {
  return (
    <BleProvider>
        <ClockProvider>
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
                <ClockDisplay/>
            </HeaderBar>
        </ClockProvider>
    </BleProvider>
  );
}

export default HomeScreen;
