import React from "react";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { render } from "@testing-library/react";
import { makeStyles } from "@material-ui/core/styles";
import "./CreateSessionModal.scss";
import "../../App.scss";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormControl
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Page1 from "./CreateSessionForm1";

import Page2 from "./CreateSessionStockSelecter";

type sessionModalProps = {
  onSessionCreate: any
};
type sessionModalState = {
  open: boolean;
  sessionName: string;
  sessionBalance: number;
  sessionType: any;
  pageNumber: number;
};
export default class sessionModal extends React.Component<
  sessionModalProps,
  sessionModalState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      sessionBalance: 0,
      sessionName: "",
      sessionType: "public",
      pageNumber: 1
    };
  }


  createSession(){}

  render() {
    const styles = {
      modalStyle: {
        backgroundColor: "white"
      }
    };

    const setOpen = (value: boolean) => {
      this.setState({
        open: value
      });
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;

      this.setState({
        ...this.state,
        [name]: value
      });
    };

    const handleSubmit = (event: any) => {
      console.log("Handle Submit");
      console.log(this.state);

      this.props.onSessionCreate(this.state.sessionName,this.state.sessionBalance, this.state.sessionType)
      .then(()=>{
        this.setState({
          ...this.state,
          pageNumber: 2
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
      event.preventDefault();
    };
    let checked = false;
    return (
      <div>
        <Button color="secondary" variant="contained" onClick={handleOpen}>
          Create Session{" "}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.open}>
            <div className="modal__background " onClick={() => {}}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Fade in={this.state.pageNumber == 1}>
                  <div>
                    <Page1
                      handleSubmit={handleSubmit}
                      handleClose={handleClose}
                      handleChange={handleChange}
                      values={this.state}
                    ></Page1>
                  </div>
                </Fade>

                <Fade in={this.state.pageNumber == 2}>
                  <div>
                    <Page2></Page2>
                  </div>
                </Fade>

              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
