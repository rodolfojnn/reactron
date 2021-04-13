import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

let bgColor = "#FFDD44" // '#007bff'
let bgHoverColor = "#B4B4B4" // '#0069d9'
const AppButton = withStyles((theme) => ({
    root: {
      height: 40,
      color: theme.palette.getContrastText(bgColor),
      backgroundColor: bgColor,
      '&:hover': {
        color: theme.palette.getContrastText(bgHoverColor),
        backgroundColor: bgHoverColor
      },
    },
}))(Button);

export default AppButton;