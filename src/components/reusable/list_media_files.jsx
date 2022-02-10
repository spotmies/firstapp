import React, { Component } from "react";
import { getFileType } from "../../helpers/dateconv";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import CardMedia from "@material-ui/core/CardMedia";
import { MdAddBox, MdClear } from "react-icons/md";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  media: {
    height: 70,
    width: 110,
    margin: 10,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
});
class ListMediaFiles extends Component {
  shouldComponentUpdate(newProps) {
    if (this.props.mediaFiles === newProps.mediaFiles) {
      console.log("props equal");
      return false;
    } else {
      console.log("rendering >>");
      return true;
    }
  }
  render() {
    const {
      mediaFiles,
      deleteMedia,
      addMore,
      typeOfMode,
      disableAddmore = false,
    } = this.props;
    return (
      <div className="list-media-files">
        <Grid container justify="flex-start" className="z-index-high">
          {mediaFiles.length > 0 && !disableAddmore ? (
            <div className="z-index-high">
              <input
                accept="image/*,video/*"
                className="getMediaButton"
                id="contained-button-file2"
                multiple
                type="file"
                onChange={addMore}
              />
              <label htmlFor="contained-button-file2" className="z-index-high">
                <MdAddBox className="media-card z-index-high" />
              </label>
            </div>
          ) : null}
          {/* <div className="list-media-files"></div> */}
          {mediaFiles.map((nap, key) => (
            <Badge badgeContent=" " variant="dot" key={key}>
              {getFileType(nap) === "img" ? (
                <CardMedia
                  className="media-card z-index-high"
                  component="img"
                  src={
                    typeOfMode === "offline" ? URL.createObjectURL(nap) : nap
                  }
                  title={nap.name}
                />
              ) : getFileType(nap) === "video" ? (
                <video
                  className="z-index-high"
                  width="230"
                  height="154"
                  controls
                  src={
                    typeOfMode === "offline" ? URL.createObjectURL(nap) : nap
                  }
                  type="video/mp4"
                />
              ) : (
                <audio
                  className="z-index-high"
                  src={
                    typeOfMode === "offline" ? URL.createObjectURL(nap) : nap
                  }
                  controls
                />
              )}

              <MdClear
                className="z-index-high"
                color="red"
                onClick={() => {
                  deleteMedia(key, typeOfMode);
                }}
              />
            </Badge>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(ListMediaFiles);
