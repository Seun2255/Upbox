import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Home from "../Components/screens/home";
import MyFiles from "../Components/screens/myFiles";
import Library from "../Components/screens/library";
import Admin from "../Components/screens/admin";
import Blocked from "../Components/screens/blocked";
import { Bars } from "react-loader-spinner";
import { Context } from "../context";

function App() {
  const [view, setView] = useState("home");
  const [loader, setLoader] = useState(false);
  const [connected, setConnected] = useState(false);
  const { state, dispatch } = useContext(Context);

  return loader ? (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#222222",
      }}
    >
      <Bars color="#B973FF" height={300} width={300} />
    </Box>
  ) : (
    <Box flexGrow={1} position="relative">
      {view === "home" && (
        <Home
          setView={setView}
          user={state.user}
          connected={connected}
          setConnected={setConnected}
        />
      )}
      {view === "myfiles" && (
        <MyFiles user={state.user} setView={setView} connected={connected} />
      )}
      {view === "library" && (
        <Library user={state.user} setView={setView} connected={connected} />
      )}
      {view === "blacklisted" && <Blocked user={state.user} />}
      {view === "admin" && (
        <Admin contractMethods={contractMethods} user={state.user} />
      )}
    </Box>
  );
}

export default App;
