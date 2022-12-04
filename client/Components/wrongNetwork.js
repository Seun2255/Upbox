import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function WrongNetwork(props) {
  return (
    <Box
      sx={{
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: "5",
      }}
    >
      <Box
        sx={{
          width: "62.62%",
          height: "367px",
          background: "#333333",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "32px",
            lineHeight: "39px",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          You are not on the rinkeby network
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "22px",
            textAlign: "center",
            color: "#AAAAAA",
            width: "319.45px",
          }}
        >
          Please connect to the rinkeby network
        </Typography>
      </Box>
    </Box>
  );
}

export default WrongNetwork;
