import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import icons from "../../assets/icons/icons";
import addressShortner from "../../utils/addressShortener";
import InputAddress from "../inputAddress";
import { utils } from "ethers";

function Admin(props) {
  const { address, contractMethods } = props;
  const [blacklistAddress, setBlacklistAddress] = useState("");
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
        <img
          src={icons.logo}
          alt="Logo"
          style={{ height: "40px", width: "164.47px" }}
        />
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
        >
          {/* addresShortner returns a shortened version of an address */}
          {address === "Connect Wallet" ? address : addressShortner(address)}
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            width: "446px",
            height: "86px",
            marginTop: "87px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "19px",
              color: "#FFFFFF",
              marginBottom: "5px",
            }}
          >
            Blacklist User
          </Typography>
          <InputAddress setText={setBlacklistAddress} />
        </Box>
        <Box sx={{ width: "446px" }}>
          <Button
            variant="contained"
            sx={{
              width: "254.22px",
              height: "50.38px",
              background: "#B973FF",
              border: "2px solid #B973FF",
              boxSizing: "border-box",
              borderRadius: "32px 0px",
              marginTop: "10px",
              fontWeight: 700,
              fontSize: "18.6016px",
              lineHeight: "23px",
              color: "#222222",
              "&:hover": {
                backgroundColor: "#B973FF",
              },
            }}
            onClick={async () => {
              if (utils.isAddress(blacklistAddress))
                await contractMethods.addblackListedUser(blacklistAddress);
            }}
          >
            Blacklist
          </Button>
        </Box>
      </Box>
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
    </Box>
  );
}

export default Admin;
