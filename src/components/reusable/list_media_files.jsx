import React, { Component } from "react";
import { getFileType } from "../../helpers/dateconv";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import CardMedia from "@material-ui/core/CardMedia";
import { MdAddBox, MdClear } from "react-icons/md";

const useStyles = (theme) => ({});
export default class ListMediaFiles extends Component {
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
    const { mediaFiles, deleteMedia, styles, typeOfMode } = this.props;
    return (
      <Grid container justify="flex-start">
        <div>
          <MdAddBox className={styles.media} />
        </div>
        {mediaFiles.map((nap, key) => (
          <Badge color="white" badgeContent=" " variant="dot" key={key}>
            {getFileType(nap) === "img" ? (
              <CardMedia
                className={styles.media}
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
