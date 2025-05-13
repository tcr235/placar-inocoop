import LayoutWrapper from "./src/components/LayoutWrapper";
import HomeScreen from "./src/screens/HomeScreen";

function App(): React.JSX.Element {
  return (
    <LayoutWrapper>
      <HomeScreen />
    </LayoutWrapper>
  );
}

export default App;