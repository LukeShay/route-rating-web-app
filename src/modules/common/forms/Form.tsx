import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Button from "../buttons/ButtonSecondary";
import { IStandardProps } from "../standardProps";

export interface IFormProps extends IStandardProps {
  buttonText: string;
  formInputs: React.ReactNode;
  handleSubmit(event: any): Promise<void> | void;
  helpElements?: React.ReactNode[];
  icon?: React.ReactNode;
  title: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(1)
    },
    form: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(1),
      width: "100%"
    },
    paper: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(4)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

const Form: React.FC<IFormProps> = ({
  buttonText,
  formInputs,
  handleSubmit,
  helpElements,
  icon,
  testId,
  title
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" data-test-id={testId}>
      <div className={classes.paper}>
        {icon}
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {formInputs}
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            data-test-id="submit-button-test-id"
          >
            {buttonText}
          </Button>
          <Grid container>
            {helpElements &&
              helpElements.map((element) => (
                // eslint-disable-next-line react/jsx-key
                <Grid item>{element}</Grid>
              ))}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Form;
