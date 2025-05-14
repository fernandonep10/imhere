import { StatusBar } from "react-native";
import Home from "../src/screens/home";

export default function App() {
  return (
    <>
      <StatusBar hidden={false} backgroundColor={"#131016"} />

      <Home />
    </>
  );
}
