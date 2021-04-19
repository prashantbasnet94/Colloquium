import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard(props){

    
    
    
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    alt="Contemplative Reptile"*/}
                {/*    height="140"*/}
                {/*    image="https://lh3.googleusercontent.com/proxy/rUEeOIIDh1n6L8VKy7Fz7LoMwoTQ8hiPJuD2jiMzlZpTwQMexCJ5BSM7ACguko9j_B1QT2KUfDwCrxq6XIzoDRHpba7So0nGpePM3JF_lSGEJBX7dzM34uc5SUUG"*/}
                {/*    title="Contemplative Reptile"*/}
                {/*/>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
           
        </Card>
    );
}