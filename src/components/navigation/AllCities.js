
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCities, removeCity, shortlistCity, addCity } from '../../redux'
import { Table } from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import "../../index.css"
import "../../main.css"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function AllCities({ citiesData, fetchCities, removeCity, shortlistCity, addCity }) {

    const [open, setOpen] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const [filterStr, changeFilterStr] = useState('');
    const classes = useStyles();

    const [state, setState] = useState({
        cityName: '',
        cityState: '',
        cityDistrict: ''
    });

    const closeToastr = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessState(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    const deleteEventHandler = (id) => {
        // console.log(id);
        removeCity(id);
    }

    const handleShortlist = (id) => {
        shortlistCity(id);
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        var cityObj = {
            "City": state.cityName,
            "State": state.cityState,
            "District": state.cityDistrict,
            "isShortlisted": false,
            "Id": citiesData.cities.length
        }
        addCity(cityObj);
        setSuccessState(true);
        setOpen(false);

        state.cityName = '';
        state.cityState = '';
        state.cityDistrict = '';
    }


    return citiesData.loading ? (
        <h2>Loading...</h2>
    ) : citiesData.error ? (
        <h2>{citiesData.error}</h2>
    ) : (
        <div className="container">

            <br></br>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="filter">Filter</span>
                </div>
                <input type="text" className="form-control" placeholder="Enter text to filter..." aria-label="Filter"
                    value={filterStr}
                    onChange={e => changeFilterStr(e.target.value)}
                />
            </div>
            <br />
            <Fab variant="extended" color="secondary" aria-label="add" className={classes.margin} onClick={handleClickOpen} style={{ float: 'right' }}>
                <AddIcon />
                Add City
            </Fab>
            <br /><br />
            <br /><br />

            <Table striped bordered hover size="sm" className="city-table">
                <thead style={{ backgroundColor: "#555957", color: "#FFFFFF" }}>
                    <tr>
                        <th className="row-1 city-name">City</th>
                        <th className="row-2 city-district">District</th>
                        <th className="row-3 city-state">State</th>
                        <th className="row-4 city-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        citiesData.cities.filter(
                            function (city) {
                                return city.City.includes(filterStr) ||
                                    city.District.includes(filterStr) ||
                                    city.State.includes(filterStr)
                            })
                            .map(city => (
                                <tr key={city.Id}>
                                    <td>{city.City}</td>
                                    <td>{city.District}</td>
                                    <td>{city.State}</td>
                                    <td>
                                        <button className="btn btn-sm btn-success" onClick={() => handleShortlist(city.Id)}>
                                            {
                                                city.isShortlisted ? <span>Shortlisted</span> : <span>Shortlist</span>
                                            }
                                        </button>{'          '}
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteEventHandler(city.Id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add City
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{ width: '400px' }}>
                        <TextField autoFocus required label="City Name" name="cityName" value={state.cityName} onChange={handleChange} /><br />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="age-native-required">State</InputLabel>
                            <Select
                                native
                                value={state.cityState}
                                onChange={handleChange}
                                name="cityState"
                            >
                                <option aria-label="None" value="" />
                                <option value={'Maharashtra'}>Maharashtra</option>
                                <option value={'Madhya Pradesh'}>Madhya Pradesh</option>
                                <option value={'Punjab'}>Punjab</option>
                                <option value={'Telangana'}>Telangana</option>
                                <option value={'Andhra Pradesh'}>Andhra Pradesh</option>
                                <option value={'Utter Pradesh'}>Utter Pradesh</option>
                            </Select>
                        </FormControl>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="age-native-required">District</InputLabel>
                            <Select
                                native
                                value={state.cityDistrict}
                                onChange={handleChange}
                                name="cityDistrict"
                            >
                                <option aria-label="None" value="" />
                                <option value={'Wardha'}>Wardha</option>
                                <option value={'Nagpur'}>Nagpur</option>
                                <option value={'Amritsar'}>Amritsar</option>
                                <option value={'Barnala'}>Barnala</option>
                                <option value={'Adilabad'}>Adilabad</option>
                                <option value={'Hyderabad'}>Hyderabad</option>
                                <option value={'Visakhapatnam'}>Visakhapatnam</option>
                                <option value={'Srikakulam'}>Srikakulam</option>
                                <option value={'Hyderabad'}>Hyderabad</option>
                                <option value={'Agra'}>Agra</option>
                                <option value={'Aligarh'}>Aligarh</option>
                                <option value={'Azamgarh'}>Azamgarh</option>
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                open={successState}
                autoHideDuration={2000}
                onClose={closeToastr}
                message="City Added"
            />


        </div>
    )
}

const mapStateToProps = state => {
    return {
        citiesData: state.cities
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCities: () => dispatch(fetchCities()),
        removeCity: (id) => dispatch(removeCity(id)),
        shortlistCity: (id) => dispatch(shortlistCity(id)),
        addCity: (cityObj) => dispatch(addCity(cityObj))
    };
}
export default React.memo(
    connect(mapStateToProps, mapDispatchToProps)(AllCities)
)
