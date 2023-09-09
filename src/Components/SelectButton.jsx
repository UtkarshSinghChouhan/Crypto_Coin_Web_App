import { makeStyles } from '@material-ui/core';
import React from 'react'


const SelectButton = ({children, selected, onClick}) => {
    const useStyles = makeStyles(() => ({
        selectButton:{
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover":{
                backgroundColor: "gold",
                color: "black",
            },
    
            width: "22%",
        }
    }))

    const classes = useStyles();

  return (
    <span
        className={classes.selectButton}
        onClick={onClick}
    >
        {children}
    </span>
  )
}

export default SelectButton