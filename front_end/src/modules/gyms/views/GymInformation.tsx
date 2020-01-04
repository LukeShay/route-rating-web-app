import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { GymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym, Wall } from "../../../types";
import Table from "../../common/table/Table";
import WallList from "./WallList";
import * as WallApi from "../../../api/wallsApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backIcon: {
      paddingRight: theme.spacing(1)
    },
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  })
);

interface IGymInformationRowProps {
  label: string;
  text: string;
}

const GymInformationRow: React.FC<IGymInformationRowProps> = ({
  label,
  text
}) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{text}</TableCell>
  </TableRow>
);

export interface IGymInformationProps {
  gymId: string;
}

const GymInformation: React.FC<IGymInformationProps> = ({ gymId }) => {
  const { state, dispatch } = useContext(GymsContext);
  const [gym, setGym] = useState<Gym>({} as Gym);
  const classes = useStyles();

  useEffect(() => {
    if (state.gyms.length === 0) {
      loadGyms();
    }

    const tempGym = state.gyms.filter((element) => element.id === gymId).pop();

    if (tempGym) {
      WallApi.getWalls(tempGym.id)
        .then((response: Response) => {
          return response.json();
        })
        .then((data: Wall[]) => {
          tempGym.walls = data;
          setGym(tempGym);
        });
    }
  }, []);

  const loadGyms = async () => {
    const response = await GymsActions.loadGyms(dispatch);

    if (!response || !(response instanceof Response) || !response.ok) {
      toast.error("Error getting gyms.");
    }
  };

  if (!gym) {
    return <h3>Cannot find the gym you are looking for.</h3>;
  }

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
          <ArrowBackIcon className={classes.backIcon} />
          Back
        </Button>
      </div>
      <Table
        body={[
          <GymInformationRow key="name" label="Gym Name" text={gym.name} />,
          <GymInformationRow
            key="website"
            label="Gym Website"
            text={gym.website}
          />,
          <GymInformationRow
            key="address"
            label="Gym Address"
            text={gym.address + " " + gym.city + ", " + gym.state}
          />,
          <GymInformationRow key="email" label="Gym Email" text={gym.email} />,
          <GymInformationRow
            key="phoneNumber"
            label="Gym Phone Number"
            text={gym.phoneNumber}
          />
        ]}
      />
      <WallList walls={gym.walls} />
    </React.Fragment>
  );
};

export default React.memo(GymInformation);
