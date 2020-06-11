import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './Styles.css';

function rand() {
	return Math.round(Math.random() * 20) - 10;
  }
  
function getModalStyle() {
	const top = 0;
	const left = 150 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		overflowY: 'scroll',
		height: '-webkit-fill-available'
	};
}

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
	},
	xyz: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function FirstTab() {
    const classes = useStyles();
	const [value, setValue] = useState({ 
		movieData: [], 
		movieTitle: '', 
		movieYear: '', 
		errorMessage: '', 
		open: true,
		openModal: false,
		moreInfo: '',
		activePage: 1
	});

	const handleClose = () => {
		setValue({...value, openModal: false, open: false})
	}
	const [modalStyle] = React.useState(getModalStyle);
	const body = (
		<div style={modalStyle} className={classes.xyz}>
			{value.moreInfo !== undefined &&
			<div>
			<h2 id="simple-modal-title">Movie Info</h2>
			<p><b>Title:</b> {value.moreInfo.Title}</p>
			<p><b>Year:</b> {value.moreInfo.Year}</p>
			<p><b>Released:</b> {value.moreInfo.Released}</p>
			<p><b>Runtime:</b> {value.moreInfo.Runtime}</p>
			<p><b>Genre:</b> {value.moreInfo.Genre}</p>
			<p><b>Director:</b> {value.moreInfo.Director}</p>
			<p><b>Writer:</b> {value.moreInfo.Writer}</p>
			<p><b>Actors:</b> {value.moreInfo.Actors}</p>
			<p><b>Plot:</b> {value.moreInfo.Plot}</p>
			<p><b>Language:</b> {value.moreInfo.Language}</p>
			<p><b>Country:</b> {value.moreInfo.Country}</p>
			<p><b>Awards:</b> {value.moreInfo.Awards}</p>
			{value.moreInfo.Poster !== "N/A" ? 
				<span>
				<p><b>Poster:</b></p><img src={value.moreInfo.Poster} alt="" id="poster" />
				</span> : ""
			}
			<p><b>ImdbRating:</b> {value.moreInfo.imdbRating}</p>
			<p><b>ImdbVotes:</b> {value.moreInfo.imdbVotes}</p>
			<p><b>ImdbID:</b> {value.moreInfo.imdbID}</p>
			<p><b>Type:</b> {value.moreInfo.Type}</p>
			<p><b>DVD:</b> {value.moreInfo.DVD ? value.moreInfo.DVD : "N/A"}</p>
			<p><b>BoxOffice:</b> {value.moreInfo.imdbRating > 7 ? "hit" : "flop"}</p>
			<Button variant="outlined" id="button" onClick={handleClose}>Close</Button>
			</div>
			}
		</div>
	  );

	const changeMovieTitle = (event) => {
		setValue({...value, movieTitle: event.target.value, errorMessage: ''});
	}

	const changeMovieYear = (event) => {
		setValue({...value, movieYear: event.target.value, errorMessage: ''})
	}
	
	const modalOpen = (id) => {
		if(id !== "") {
			fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=575c26ce`)
			.then(res => res.json())
			.then(
				(result) => {
					if(result.Response === "True") {
						setValue({...value, moreInfo: result, openModal: true});
					}
					else {
						setValue({...value, errorMessage: result.Error, openModal: false})
					}
				},
			)
		}
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
						<h2 className="cardHeader">All Movies Info</h2>
						:
						<h2 className="cardHeader">Movie Info</h2>
					}
					
					<div>
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
										</CardContent>
									</CardActionArea>
									<CardActions>
										<Button 
											size="small" color="primary" id="cardButton" 
											onClick={()=>modalOpen(data.imdbID)}
											variant="outlined"
										>
											More Info
										</Button>
									</CardActions>
								</Card>
							</Grid>
							))}
						</Grid>
					</div>
					<Button variant="outlined" id="cardButton" onClick={handleBack}>Back</Button>
				</div>
			}
			{value.openModal === true &&
				<div>
					<Modal
						open={value.openModal}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						style={{width: "300px"}}
					>	
						{body}
					</Modal>
				</div>
			}
        </Paper>
    )
}

export default FirstTab;