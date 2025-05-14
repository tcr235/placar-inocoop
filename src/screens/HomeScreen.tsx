import React from 'react';
import { HeaderBar } from '../components/HeaderBar';
import ActionButton from '../components/ActionButton';
import ClockDisplay from '../components/ClockDisplay';
import ConnectControl from '../components/ConnectControl';
import { useBleContext } from '../context/BleContext';
import { ScoreControl } from '../components/ScoreControl';

function HomeScreen(): React.JSX.Element {
    const {
        incrementScoreHome,
        decrementScoreHome,
        incrementScoreVisitor,
        decrementScoreVisitor,
        scoreHome,
        scoreVisitor,
    } = useBleContext();

  return (
    <>
        <HeaderBar>
            <ConnectControl/>
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
        <ScoreControl
            scoreHome={scoreHome}
            incrementScoreHome={incrementScoreHome}
            decrementScoreHome={decrementScoreHome}
            scoreVisitor={scoreVisitor}
            incrementScoreVisitor={incrementScoreVisitor}
            decrementScoreVisitor={decrementScoreVisitor}
        />
    </>
  );
}

export default HomeScreen;
