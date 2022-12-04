import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import icons from "../../assets/icons/icons";
import addressShortner from "../../utils/addressShortener";
import UploadForm from "../uploadForm";
import UploadSuccesful from "../uploadSuccesful";
import { Context } from "../../context";
import ConnectWalletModal from "../../modals/connectWalletModal";

function Home(props) {
  const { setView, contractMethods, addFile, user, connected, setConnected } =
    props;
  const [uploadModal, setUploadModal] = useState(false);
  const [succesModal, setSuccesModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);

  const { state, dispatch } = useContext(Context);

  //an array of for looping throygh text and colors to be animated
  const effects = [
    { text: "Books", color: "#934DD9" },
    { text: "Articles", color: "#16A5FB" },
    { text: "Media", color: "#03CF36" },
  ];

  //a variable for keeping track of the current text animation
  const [num, setNum] = useState(0);
  const [effect, setEffect] = useState(effects[num]);

  //a function that changes between animations in thr effects array
  function change() {
    if (num !== 2) {
      setEffect(effects[num + 1]);
      setNum(num + 1);
    } else {
      setEffect(effects[0]);
      setNum(0);
    }
  }

  //a useEffect that changes the animation every 2seconds
  useEffect(() => {
    setTimeout(() => {
      change();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  return (
    <Box
      sx={{
        background: "#222222",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px",
          width: "86.14%",
          height: "40px",
          top: "25px",
        }}
      >
        <div
          style={{ height: "40px", width: "164.47px", position: "relative" }}
        >
          <Image src={icons.logo} alt="Logo" fill />
        </div>
        <Box
          sx={{
            width: connected ? "475px" : "430px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          {!connected ? (
            <Box sx={{ padding: 0, margin: 0, display: "flex" }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                  marginRight: "49px",
                }}
              >
                Home
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                }}
              >
                Community
              </Typography>
            </Box>
          ) : (
            <Box sx={{ padding: 0, margin: 0, display: "flex" }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                  marginRight: "49px",
                }}
                onClick={() => setView("myfiles")}
              >
                Files
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
                onClick={() => setView("library")}
              >
                Library
              </Typography>
            </Box>
          )}
          <Button
            sx={{
              border: "2px solid #B973FF",
              boxSizing: "border-box",
              borderRadius: "32px 0px",
              width: "213px",
              height: "40px",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "20px",
              color: "#B973FF",
            }}
            onClick={() => {
              if (!connected) setWalletModal(true);
            }}
          >
            {/* addresShortner returns a shortened version of an address */}
            {!connected
              ? "Connect Wallet"
              : addressShortner(state.user.address)}
          </Button>
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: "42px",
          fontWeight: 700,
          lineHeight: "56px",
          letterSpacing: "0em",
          textAlign: "center",
          color: "#FFFFFF",
          width: "67.225%",
          marginTop: "200px",
        }}
      >
        Sharing <span style={{ color: effect.color }}>{effect.text}</span> with
        friends and colleagues has never been easier{" "}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 400,
          lineHeight: "39px",
          textAlign: "center",
          color: "#AAAAAA",
          marginTop: "30px",
          width: "50.11%",
        }}
      >
        Supercharge your files security with a decentralized file sharing
        system.{" "}
      </Typography>
      <Button
        variant="contained"
        sx={{
          background: "#B973FF",
          boxSizing: "border-box",
          borderRadius: "32px 0px",
          marginTop: "40px",
          width: "328px",
          height: "52px",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "29px",
          color: "#222222",
          "&:hover": {
            backgroundColor: "#B973FF",
          },
        }}
        onClick={() => {
          !connected ? setWalletModal(true) : setUploadModal(true);
        }}
      >
        {!connected ? (
          "Connect Wallet"
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                color: "#222222",
                padding: 0,
                margin: 0,
                marginRight: "10px",
              }}
            >
              Upload File
            </Typography>
            <div
              style={{ width: "18px", height: "20px", position: "relative" }}
            >
              <Image src={icons.upload} alt="Upload icon" fill={true} />
            </div>
          </Box>
        )}
      </Button>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "40.38px",
          background: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "86.14%",
            height: "20px",
          }}
        >
          <Typography
            sx={{
              height: "20px",
              color: "white",
            }}
          >
            Decentralized file storage
          </Typography>
          <div
            style={{
              height: "100%",
              width: "19.51px",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Image src={icons.github} alt="github" fill />
          </div>
        </Box>
      </Box>
      {uploadModal && (
        <UploadForm
          setUploadModal={setUploadModal}
          setSuccesModal={setSuccesModal}
        />
      )}
      {succesModal && <UploadSuccesful />}
      {walletModal && (
        <ConnectWalletModal
          setWalletModal={setWalletModal}
          setConnected={setConnected}
        />
      )}
    </Box>
  );
}

export default Home;
