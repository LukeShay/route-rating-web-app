/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Button,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes, Routes } from "../../../routes";
import { Gym, User } from "../../../types";
import Table from "../../common/table/Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    card: {
      display: "flex"
    },
    content: {
      flex: "1 0 auto"
    },
    editButton: {
      position: "absolute",
      right: "10px"
    },
    icons: {
      paddingRight: theme.spacing(1)
    },
    information: {
      paddingLeft: theme.spacing(2)
    },
    photo: {
      width: "90%"
    },
    photoWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "50%"
    }
  })
);

export interface IGymInformationProps {
  gym: Gym;
  canEdit: boolean;
}

const GymInformation: React.FunctionComponent<IGymInformationProps> = ({
  gym,
  canEdit
}): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.buttonWrapper}>
        <Button
          component={Link}
          to={Routes.GYMS}
          variant="text"
          fullWidth={false}
          size="medium"
          type="button"
        >
          <ArrowBackIcon className={classes.icons} />
          Back
        </Button>
        {canEdit && (
          <Button
            component={Link}
            to={AuthRoutes.EDIT_GYM + "/" + gym.id}
            className={classes.editButton}
            variant="text"
            fullWidth={false}
            size="medium"
            type="button"
          >
            <EditIcon className={classes.icons} />
            Edit
          </Button>
        )}
      </div>
      <Card className={classes.card}>
        <CardMedia className={classes.photoWrapper}>
          <img
            src={"https://" + gym.photoUrl}
            alt="This gym does not have a photo."
            className={classes.photo}
          />
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography variant="h2">{gym.name}</Typography>
          <div className={classes.information}>
            <Typography variant="body1">{gym.website}</Typography>
            <Typography variant="body1">
              {gym.address}
              <br />
              {gym.city + ", " + gym.state + " " + gym.zipCode}
            </Typography>
            <Typography variant="body1">{gym.email}</Typography>
            <Typography variant="body1">{gym.phoneNumber}</Typography>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default GymInformation;
