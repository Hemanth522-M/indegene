import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './Styles.css';


const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
}));

function SecondTab() {
    const classes = useStyles();
	const [value, setValue] = useState({ 
		movieData: [], 
		movieTitle: '', 
		movieYear: '', 
		errorMessage: '', 
		open: true,
	});
	
	const changeMovieTitle = (event) => {
		setValue({...value, movieTitle: event.target.value, errorMessage: ''});
	}

	const changeMovieYear = (event) => {
		setValue({...value, movieYear: event.target.value, errorMessage: ''})
	}

	const handleSubmit = () => {
		const movieName = value.movieTitle;
		const mYear = value.movieYear;
		if(movieName !== "" && mYear !== "") {
			fetch(`http://www.omdbapi.com/?s=${movieName}&y=${mYear}&apikey=575c26ce`)
			.then(res => res.json())
			.then(
				(result) => {
					if(result.Response === "True") {
						setValue({...value, movieData: result.Search, open: false});
					}
					else {
						setValue({...value, errorMessage: result.Error, open: true})
					}
				},
			)
		}
		else {
			setValue({errorMessage: "Please enter movie title and movie year", open: true})
		}
	}

    const handleBack = () => {
        setValue({open: true})
    }


    return(
        <Paper className="paper" variant="outlined" square>
			{value.open === true &&
				<div className="mainDiv">
					<span style={{color: 'red'}}>{value.errorMessage}</span>
					<div>
						<label id="label">Movie Title:</label>
						<TextField
							label="Movie Title"
							type="text"
							variant="outlined"
							margin="dense"
							value={value.movieName}
							className={classes.textField}
							onChange={changeMovieTitle}
						/>
					</div>
					<div>
						<label id="label">Movie Year:</label>
						<TextField
							label="Movie Year"
							type="number"
							variant="outlined"
							margin="dense"
							value={value.movieYear}
							className={classes.textField}
							onChange={changeMovieYear}
						/>
					</div>
					<div>
						<Button variant="contained" color="primary" id="button" onClick={handleSubmit}>
							Submit
						</Button>
					</div>
				</div>
			}
			{value.open === false &&
				<div>
                    {value.movieData.length > 1 ?
					    <h2 className="cardHeader">All Movies Poster</h2>
                        :
                        <h2 className="cardHeader">Movie Poster</h2>
                    }
                    <Grid container spacing={3} className="cards">
                        {value.movieData.map((data,index) => (
                        <Grid item xs={3} key={index}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="body2" component="p">
                                            <b>Title:</b> {data.Title}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="p">
                                            <b>Year:</b> {data.Year}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="p">
                                            <b>Type:</b> {data.Type}
                                        </Typography>
                                        {data.Poster !== "N/A" ?
                                            <div>
                                                <Typography gutterBottom variant="body2" component="p">
                                                    <b>Poster:</b> 
                                                </Typography>
                                                <img src={data.Poster} alt="" id="poster" />
                                            </div>
                                            : ""
                                        }
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                    <Button variant="outlined" id="cardButton" onClick={handleBack}>Back</Button>
				</div>
			}
        </Paper>
    )
}

export default SecondTab;