import React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Link,
  IconButton,
  makeStyles
} from "@material-ui/core";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import MailIcon from "@material-ui/icons/Mail";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Avatar, Divider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "1rem",
    width: "20rem",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    position: "fixed",
    right: "20px",
    bottom: "20px",
  },

  socialMediaButton: {
    opacity: 0.9,
    transition: "0.2s",

    "&:hover": {
      opacity: "1",
      transform: "translate(0,-5px)",
      background: "rgba(255,255,255,0.5)"
    }
  }
}));

function PCard(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.root} variant="outlined">
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <IconButton aria-label="close">
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            marginTop: "-1.5rem",
            marginBottom: "0.5rem"
          }}
        >
          <Avatar
            alt={props.name}
            src={props.picture}
            sx={{
              width: "10rem",
              height: "10rem",
              mt: 1,
              filter: "drop-shadow(1px 1px 4px #444444)"
            }}
          />
        </Box>

        <CardContent>
          <Typography gutterBottom={true}>
          <Box sx={{ fontSize: "large",  color: "#2a4158", textAlign:"center" }}>
            {props.name}
          </Box>

          </Typography>
          <Typography gutterBottom={true}>
            <Box sx={{ color: "#597387", textAlign:"center" }}>
              {props.branch}-{props.year}
            </Box>
          </Typography>

          {props.hometown && (
            <Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "medium",
                  color: "#597387"
                }}
              >
                <LocationOnIcon color="primary" />
                {props.hometown}
              </Box>
            </Typography>
          )}

          {props.coCurriculars[0] && (
            <React.Fragment>
              <br />
              <Divider variant="middle" />
              <br />
              <Box sx={{ color: "#2a4158" ,textAlign:"center"}}>
                {props.coCurriculars.map((item) => (
                  <Typography variant="body2" key={item} gutterBottom>
                    {item}
                  </Typography>
                ))}
              </Box>
            </React.Fragment>
          )}
        </CardContent>
        <Divider variant="middle" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
          }}
        >
          <CardActions>
            {props.email && (
              <Link href={`mailto:${props.email}`}>
                <IconButton className={classes.socialMediaButton}>
                  <MailIcon color="primary" />
                </IconButton>
              </Link>
            )}

            {props.linkedIn && (
              <Link href={props.linkedIn} target="_blank">
                <IconButton
                  aria-label="linkedin"
                  className={classes.socialMediaButton}
                >
                  <LinkedInIcon color="primary" />
                </IconButton>
              </Link>
            )}

            {props.socialMedia && props.socialMedia.insta && (
              <Link href={props.socialMedia.insta} target="_blank">
                <IconButton
                  aria-label="instagram"
                  className={classes.socialMediaButton}
                >
                  <InstagramIcon color="primary" />
                </IconButton>
              </Link>
            )}

            {props.socialMedia && props.socialMedia.github && (
              <Link href={props.socialMedia.github} target="_blank">
                <IconButton
                  aria-label="github"
                  className={classes.socialMediaButton}
                >
                  <GitHubIcon color="primary" />
                </IconButton>
              </Link>
            )}

            {props.socialMedia && props.socialMedia.facebook && (
              <Link href={props.socialMedia.facebook} target="_blank">
                <IconButton
                  aria-label="facebook"
                  className={classes.socialMediaButton}
                >
                  <FacebookIcon color="primary" />
                </IconButton>
              </Link>
            )}

            {props.socialMedia && props.socialMedia.twitter && (
              <Link href={props.socialMedia.twitter} target="_blank">
                <IconButton
                  aria-label="twitter"
                  className={classes.socialMediaButton}
                >
                  <TwitterIcon color="primary" />
                </IconButton>
              </Link>
            )}
          </CardActions>
        </Box>
      </Card>
    </React.Fragment>
  );
}

export default PCard;
