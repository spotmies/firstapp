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
      <Grid container justify="flex-start">
        {mediaFiles.length > 0 && !disableAddmore ? (
          <div>
            <input
              accept="image/*,video/*"
              className="getMediaButton"
              id="contained-button-file2"
              multiple
              type="file"
              onChange={addMore}
            />
            <label htmlFor="contained-button-file2">
              <MdAddBox size="6.5rem" />
            </label>
          </div>
        ) : null}
        {mediaFiles.map((nap, key) => (
          <Badge color="white" badgeContent=" " variant="dot" key={key}>
            {getFileType(nap) === "img" ? (
              <CardMedia
                className="media-card"
                component="img"
                src={typeOfMode === "offline" ? URL.createObjectURL(nap) : nap}
                title={nap.name}
              />
            ) : getFileType(nap) === "video" ? (
              <video
                width="230"
                height="154"
                controls
                src={typeOfMode === "offline" ? URL.createObjectURL(nap) : nap}
                type="video/mp4"
              />
            ) : (
              <audio
                src={typeOfMode === "offline" ? URL.createObjectURL(nap) : nap}
                controls
              />
            )}

            <MdClear
              color="red"
              onClick={() => {
                deleteMedia(key, typeOfMode);
              }}
            />
          </Badge>
        ))}
      </Grid>
    );
  }
}

export default withStyles(useStyles)(ListMediaFiles);
