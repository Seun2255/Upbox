import Grid from "@mui/material/Grid";
import Card from "./card";

function GridBox(props) {
  const { files, setShareModal, setFileToShare } = props;

  return (
    <Grid container spacing={1} columns={30}>
      {files.map((item, id) => {
        return (
          <Grid item md={5} lg={5} xl={5} key={id}>
            <Card
              item={{ ...item }}
              setShareModal={setShareModal}
              setFileToShare={setFileToShare}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default GridBox;
