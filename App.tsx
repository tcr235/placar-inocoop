import LayoutWrapper from "./src/components/LayoutWrapper";
import { BleProvider } from "./src/context/BleContext";
import { ClockProvider } from "./src/context/ClockContext";
import HomeScreen from "./src/screens/HomeScreen";

function App(): React.JSX.Element {
  return (
    <LayoutWrapper>
      <BleProvider>
        <ClockProvider>
          <HomeScreen />
        </ClockProvider>
      </BleProvider>
    </LayoutWrapper>
  );
}

export default App;