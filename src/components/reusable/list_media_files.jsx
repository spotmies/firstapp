import React, { Component } from "react";
import { getFileType } from "../../helpers/dateconv";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import CardMedia from "@material-ui/core/CardMedia";
import { MdClear } from "react-icons/md";
export default class ListMediaFiles extends Component {
  shouldComponentUpdate(newProps) {
    if (this.props.mediaFiles === newProps.mediaFiles) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    const { mediaFiles, deleteMedia, styles, typeOfMode } = this.props;
    return (
      <Grid container justify="flex-start">
        {mediaFiles.map((nap, key) => (
          <Badge color="white" badgeContent=" " variant="dot">
            {getFileType(nap) === "img" ? (
              <CardMedia
                key={key}
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
