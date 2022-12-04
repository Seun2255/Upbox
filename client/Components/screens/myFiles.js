import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import icons from "../../assets/icons/icons";
import addressShortner from "../../utils/addressShortener";
import GridBox from "../gridBox";
import Share from "../share";
import UploadForm from "../uploadForm";
import UploadSuccesful from "../uploadSuccesful";
import arrayBreaker from "../../utils/arrayBreaker";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Image from "next/image";
import styles from "../../styles/empty.module.css";

function Home(props) {
  const { setView, contractMethods, user, connected } = props;

  const allFiles = [
    ...user.files.allPublic,
    ...user.files.userPrivate,
    ...user.files.userRecieved,
  ];

  const [uploadModal, setUploadModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [page, setPage] = useState(0);
  const [succesModal, setSuccesModal] = useState(false);
  const [fileToShare, setFileToShare] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [displayedFiles, setDisplayedFiles] = useState(allFiles);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (index === 0) {
      setDisplayedFiles(user.files.userPublic);
    } else if (index === 1) {
      setDisplayedFiles(user.files.userPrivate);
    } else if (index === 2) {
      setDisplayedFiles(user.files.userRecieved);
    } else {
      setDisplayedFiles(allFiles);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["Public", "Private", "Recieved", "All Files"];

  const fileStorage = arrayBreaker(displayedFiles, 12);

  useEffect(() => {
    console.log("user Update");

    const allFiles = [
      ...user.files.userPublic,
      ...user.files.userPrivate,
      ...user.files.userRecieved,
    ];

    if (selectedIndex === 0) {
      setDisplayedFiles(user.files.userPublic);
    } else if (selectedIndex === 1) {
      setDisplayedFiles(user.files.userPrivate);
    } else if (selectedIndex === 2) {
      setDisplayedFiles(user.files.userRecieved);
    } else {
      setDisplayedFiles(allFiles);
    }
  }, [user]);

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
            width: !connected ? "475px" : "430px",
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
                onClick={() => setView("home")}
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
          >
            {addressShortner(user.address)}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          height: "66px",
          width: "86.1%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px",
          marginTop: "120px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "58px",
            color: "#FFFFFF",
          }}
        >
          My Files
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "8px",
            width: "489px",
            height: "66px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#B973FF",
              boxSizing: "border-box",
              borderRadius: "32px 0px",
              width: "232px",
              height: "50px",
              margin: "0 10px",
              "&:hover": {
                backgroundColor: "#B973FF",
              },
            }}
            onClick={() => setUploadModal(true)}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                color: "#222222",
                padding: 0,
                margin: 0,
                marginRight: "8px",
              }}
            >
              Upload File
            </Typography>
            <div
              style={{
                width: "20px",
                height: "16px",
                position: "relative",
              }}
            >
              <Image src={icons.upload} alt="Upload icon" fill />
            </div>
          </Button>
          <Button
            component="nav"
            sx={{
              padding: "8px 8px 8px 16px",
              width: "231px",
              height: "50px",
              border: "1px solid #AAAAAA",
              boxSizing: "border-box",
              borderRadius: "8px",
              margin: "0 10px",
              position: "relative",
              fontWeight: 700,
              fontSize: "18px",
              color: "white",
            }}
            onClick={handleClickListItem}
          >
            {options[selectedIndex]}
            <div
              style={{
                width: "40px",
                height: "40px",
                position: "relative",
                transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
              }}
            >
              <Image src={icons.down} alt="down icon" fill />
            </div>
          </Button>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={index}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box
        sx={{
          width: "86.1%",
          marginTop: "20px",
        }}
      >
        {displayedFiles.length === 0 ? (
          <div className={styles.container}>
            <div className={styles.text}>
              <div className={styles.top__text}>There's nothing here yet</div>
              <div className={styles.bottom__text}>try uploading a file</div>
            </div>
            <button
              className={styles.button}
              onClick={() => setUploadModal(true)}
            >
              Upload File
            </button>
          </div>
        ) : (
          <>
            {fileStorage.map((item, index) => {
              return (
                page === index && (
                  <GridBox
                    key={index}
                    files={item}
                    setShareModal={setShareModal}
                    setFileToShare={setFileToShare}
                  />
                )
              );
            })}
          </>
        )}
        {displayedFiles.length >= 12 && (
          <Box
            sx={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {fileStorage.map((item, index) => {
              return (
                <Box
                  sx={{
                    background: page === index ? "#444444" : "#737373",
                    border: "1px solid #AAAAAA",
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    height: "25px",
                    width: "25px",
                    marginRight: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setPage(index)}
                >
                  {index + 1}
                </Box>
              );
            })}
            {displayedFiles.length >= 12 && (
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "#FFFFFF",
                }}
              >{`${page + 1} of ${fileStorage.length}`}</Typography>
            )}
          </Box>
        )}
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
      {uploadModal && (
        <UploadForm
          setUploadModal={setUploadModal}
          contractMethods={contractMethods}
          setSuccesModal={setSuccesModal}
        />
      )}
      {shareModal && (
        <Share
          setShareModal={setShareModal}
          contractMethods={contractMethods}
          file={fileToShare}
        />
      )}
      {succesModal && <UploadSuccesful />}
    </Box>
  );
}

export default Home;
