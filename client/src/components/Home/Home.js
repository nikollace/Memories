import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grow, Grid } from '@material-ui/core'
import useStyles from './styles'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts } from '../../actions/posts'

const Home = () => {
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
    )
}

export default Home
