import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Slide } from "react-slideshow-image";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import "react-slideshow-image/dist/styles.css";
import "./style.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  paperWidthSm: {
    maxWidth: "none",
    width: "70vw",
  },
  buttonIcon: {
    height: 40,
    width: 40,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 99999,
  },
  icon: {
    fontSize: 30,
    color: "#000",
  },
  iconRotate: {
    transform: "rotate(180deg)",
  },
});

function SimpleDialog(props) {
  const { open, onClose, imgArr, defaultIndex } = props;
  const classes = useStyles();
  const arrow = {
    prevArrow: (
      <IconButton aria-label="">
        <ArrowBackIosIcon className={classes.icon} />
      </IconButton>
    ),
    nextArrow: (
      <IconButton aria-label="">
        <ArrowBackIosIcon
          className={classes.icon}
          style={{ transform: "rotate(180deg)" }}
        />
      </IconButton>
    ),
  };
  return (
    <Dialog
      onClose={onClose}
      classes={{ paperWidthSm: classes.paperWidthSm }}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <IconButton
        aria-label=""
        className={classes.buttonIcon}
        onClick={onClose}
      >
        <CloseIcon className={classes.icon} />
      </IconButton>
      <div className="slide-container">
        <Slide
          style={{ height: "80vh" }}
          autoplay={false}
          transitionDuration={200}
          indicators={true}
          defaultIndex={defaultIndex}
          {...arrow}
        >
          {imgArr?.map((item, index) => {
            return (
              <div className="each-slide" key={index}>
                {/* <div style={{ backgroundImage: `url(${item.fileURL})` }}>
                  <span>Slide 1</span>
                </div> */}
                <img className="imgItem" src={item.fileURL} alt="" />
              </div>
            );
          })}
        </Slide>
      </div>
    </Dialog>
  );
}

function SliderShow({ isOpen, handleClose, imgArr, defaultIndex }) {
  return (
    <SimpleDialog
      open={isOpen}
      onClose={handleClose}
      imgArr={imgArr}
      defaultIndex={defaultIndex}
    />
  );
}

export default SliderShow;
