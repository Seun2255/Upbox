import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input2 from "./input2";
import { storeFiles } from "../pages/api/dappAPI";
import icons from "../assets/icons/icons";
import { BallTriangle } from "react-loader-spinner";

function UploadForm(props) {
  const { setUploadModal, contractMethods, setSuccesModal, addFile } = props;
  const [privateFile, setPrivateFile] = useState(false);
  const [description, setDiscription] = useState("");
  const [loader, setLoader] = useState(false);
  const [files, setFiles] = useState("Upload file");

  const storeFile = async () => {
    setLoader(true);
    let file = files[0];
    setFiles(files);
    if (file) {
      storeFiles(files, description, privateFile).then(() => {
        setLoader(false);
        setUploadModal(false);
        setSuccesModal(true);
        setTimeout(() => {
          setSuccesModal(false);
        }, 2000);
      });
    }
  };

  return (
    <Box
      sx={{
        background: "rgba(34, 34, 34, 0.317)",
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
      onClick={(e) => {
        e.stopPropagation();
        setUploadModal(false);
      }}
    >
      <Box
        sx={{
          width: "62.62%",
          height: "85.9%",
          background: "#333333",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setUploadModal(true);
        }}
      >
        {loader ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: "#222222",
            }}
          >
            <BallTriangle color="#B973FF" height={300} width={300} />
          </Box>
        ) : (
          <>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: "39px",
                color: "#DDDDDD",
                marginTop: "70px",
              }}
            >
              Upload Files
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "19px",
                color: "#DDDDDD",
                marginTop: "11px",
              }}
            >
              The supported file formats are Pdf, text and Media(Audio and
              Video)
            </Typography>
            <Button
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "401px",
                height: "62px",
                border: "1px solid #AAAAAA",
                boxSizing: "border-box",
                borderRadius: "8px",
                marginTop: "66px",
              }}
            >
              <label
                htmlFor="upload"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#888888",
                  }}
                >
                  {files === "Upload file" ? "Upload file" : files[0].name}
                </Typography>

                <div
                  style={{
                    height: "15px",
                    width: "20px",
                    position: "relative",
                  }}
                >
                  <Image src={icons.uploadGrey} alt="uploadgrey" fill />
                </div>
              </label>
            </Button>
            <input
              type="file"
              id="upload"
              style={{ display: "none" }}
              onChange={(e) => setFiles(e.target.files)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: "0px",
                width: "401px",
                height: "62px",
                marginTop: "13.48px",
              }}
            >
              <Box
                sx={{
                  background: privateFile ? "#B973FF" : "#333333",
                  border: "1px solid #AAAAAA",
                  boxSizing: "border-box",
                  borderRadius: "3px",
                  height: "10px",
                  width: "10px",
                  marginRight: "8px",
                  marginTop: "4.5px",
                }}
                onClick={() => setPrivateFile(!privateFile)}
              ></Box>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "#CCCCCC",
                }}
              >
                Make Private
              </Typography>
            </Box>
            <Input2 setDiscription={setDiscription} />
            <Button
              variant="contained"
              sx={{
                background: "#B973FF",
                boxSizing: "border-box",
                borderRadius: "32px 0px",
                width: "328px",
                height: "52px",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#111111",
                marginTop: "45.98px",
                "&:hover": {
                  backgroundColor: "#B973FF",
                },
              }}
              onClick={(e) => {
                if (files !== "Upload file") {
                  storeFile();
                }
              }}
            >
              Upload File
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default UploadForm;
