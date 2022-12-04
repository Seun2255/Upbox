import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import icons from "../../assets/icons/icons";
import addressShortner from "../../utils/addressShortener";

function Blocked(props) {
  const { address } = props;
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
          width: "86%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "42px",
            fontWeight: 700,
            lineHeight: "56px",
            letterSpacing: "0em",
            textAlign: "center",
            color: "#FFFFFF",
            width: "67.225%",
          }}
        >
          You have been blacklisted
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
          Unfortunately this means you no longer have access to this app
        </Typography>
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

export default Blocked;
