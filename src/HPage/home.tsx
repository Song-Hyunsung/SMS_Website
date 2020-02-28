import React from 'react';
import "./h.css";
import { Link } from 'react-router-dom';
import StockGraph from '../Components/stockGraph';
import SessionSearch from '../Components/sessionSearch';
import ScrollableButtonList from '../Components/scrollableButtonList';
import GeneralButton from '../Components/generalButton';
import Button from '@material-ui/core/Button';
import CreateSessionModal from '../Components/CreateSessionModal/CreateSessionModal'
import MarketWindow from '../RouteComponents/MarketWindow/marketwindow';
import SessionService from '../Services/sessionService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
type MWProps = {
    sessionService: SessionService
};
type MWState = {
    openDialog: boolean;
    clickedSessionID: string;
};
class Home extends React.Component<MWProps, MWState> {
    private sessionService: SessionService
    constructor(props: any) {
        super(props);
        this.state = {
            openDialog: false,
            clickedSessionID: ""
        }
        this.sessionService = props.sessionService;
    }

    createSession = (sessionName: string, startingBalance: number, type: string) : Promise<any> => {
        console.log("Creating Session");
        const data = { name: sessionName, balance: startingBalance, type: type};

        return new Promise((resolve,reject)=>{
            fetch('/createSession', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if(response.status != 200){
                        throw "ERROR: Status is not 200";
                        
                    }
                    return response.text();
                })
                .then((data)=>{
                    console.log(data);
                    if(typeof data == "string"){
                        resolve(data);
                        this.sessionService.setSessionID(data);
                    }
                    else{
                        reject("Error: Response wasn't a string for the session id");
                    }
                    
                })
                .catch((error) => {
                    reject(error);
                    console.error('Error:', error);
                });
        });

    }

    addStocksToSession = (stocks: [string]): Promise<any> => {
        
        console.log("Creating Session");
        const data = { sessionID:this.sessionService.getSessionID(), stocks:stocks};

        return new Promise((resolve,reject)=>{

            if(this.sessionService.getSessionID() == ""){
                console.log("Error: No SessionID");
                reject("Error: No SessionID");
                return;
            }

            fetch('/addStocks', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if(response.status != 200){
                        throw "ERROR: Status is not 200";
                        
                    }
                    resolve(response);
                    console.log("Successfully Added stocks to session");
                })
                .catch((error) => {
                    reject(error);
                    console.error('Error:', error);
                });
        });
    }

    render() {
        const handleClickOpen = (sessionID: string) => {
            this.setState({
                ...this.setState,
                clickedSessionID: sessionID,
                openDialog: true
            });
          };
        
          const handleClose = () => {
            this.setState({
                ...this.setState,
                openDialog: false
            });
          };

          const clickedYes = () => {
            this.sessionService.setSessionID(this.state.clickedSessionID);
            handleClose();
          };


        
        return (
          <div>
            <h1 className="title"> Home page </h1>
            <Link className="login" to="../login">
              {" "}
              Login
            </Link>
            <div className="sessions">
              <h2>Session Search</h2>
              <SessionSearch />
              <Button className="sessionButton">
                <CreateSessionModal
                  onSessionCreate={this.createSession}
                  onStocksSelected={this.addStocksToSession}
                ></CreateSessionModal>
              </Button>
              <h2>Session List</h2>
              <div className="sessionResults">
                <ScrollableButtonList
                  onButtonClick={(sessionID: string) => {
                    if (sessionID != null || sessionID != "") {
                        handleClickOpen(sessionID);
                    }
                  }}
                />
              </div>
            </div>
            <Dialog
              open={this.state.openDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Join session?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Switch session to {this.state.clickedSessionID}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={clickedYes} color="primary">
                  Yes
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}
export default Home;