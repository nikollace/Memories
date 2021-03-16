import React, { useState, useEffect } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getPosts } from './actions/posts'

import memories from './images/memories.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

import useStyles from './styles'

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();

    const dispatch = useDispatch();
    //Preko useEffecta-pozivamo dispatch
    //koji poziva getPosts(actions redux)
    //koji poziva api--koji poziva get http request na backend

    //nakon implementiranja update funkcije dodali smo currentId, da bi nakon edita povukao getPosts ponovo
    //jer mi u clear funkciji setujemo currId na null sto je promena koju useEffect hvata
    useEffect(() => {
        dispatch(getPosts());
        console.log('efect')
    }, [currentId, dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App
