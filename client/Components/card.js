import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Card(props) {
  const { item, setShareModal, setFileToShare } = props;

  return (
    <Box
      sx={{
        width: "175px",
        height: "160px",
        background: "#444444",
        borderRadius: "8px",
        position: "relative",
        "&:hover": {
          backgroundColor: "#737373",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0px",
          position: "absolute",
          width: "84.1%",
          height: "78%",
          left: "14px",
          top: "30px",
        }}
      >
        {" "}
        <a href={item.url} download target="_blank" rel="noopener noreferrer">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "20px",
              color: "#FFFFFF",
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "15px",
              color: "#AAAAAA",
            }}
          >
            {item.description}
          </Typography>
        </a>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "0px",
            position: "absolute",
            width: "100%",
            height: "15px",
            left: 0,
            bottom: 0,
            zIndex: 5,
            cursor: "help",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "15px",
              color: item.access === "public" ? "#000000" : "#B973FF",
            }}
          >
            {item.access}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "15px",
              color: "#CCCCCC",
              cursor: "pointer",
            }}
            onClick={() => {
              setFileToShare(item);
              setShareModal(true);
            }}
          >
            Share
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
