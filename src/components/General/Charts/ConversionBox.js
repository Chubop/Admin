import { makeStyles, Typography } from "@material-ui/core";
import { colors } from '../../../theme/colors';
import UpCircleArrow from "../../../assets/icons/UpCircleArrow.svg";
import { theme } from "../../../theme/muiTheme";


const useStyles = makeStyles((theme) => ({
  topTitle: {
    textTransform: "uppercase",
    color: colors.greys.mediumGrey,
    padding: theme.spacing(1)
  },
  topSubtitle: {
    padding: theme.spacing(1),
    paddingTop: 0
  },
  bottomTitle: {
    paddingBottom: theme.spacing(0.5),
    paddingTop: 0,
    textTransform: "uppercase",
    textAlign: 'center',
    color: colors.greys.mediumGrey,
  },
  bottomSubtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.greys.mediumGrey
  }
}));

export default function ConversionBox (props) {

  const classes = useStyles();

  if(props.top){
    return (
      <div style={{padding: 8}}>
        <Typography className={classes.topTitle}>
          {props.title}
        </Typography>
        <Typography className={classes.topSubtitle}>
          {props.subtitle}
        </Typography>
      </div>
    );
  }

  else if(props.bottom){
    return(
      <div style={{padding: 8, height: 85}}>
        <div style={{display: props.loading ? 'none' : 'inline'}}>
          <div style={{textAlign: 'center', marginTop: '-1.5vw', zIndex: 2, position: 'relative'}}>
            <img style={{width: '2vw'}} src={UpCircleArrow}/>
          </div>
          <Typography className={classes.bottomTitle}>
            Conversion
          </Typography>
          <Typography className={classes.bottomSubtitle}>
            {props.subtitle}
          </Typography>
        </div>
      </div>
    )
  }

}