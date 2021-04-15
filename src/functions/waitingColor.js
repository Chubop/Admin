import { green, orange, red } from "@material-ui/core/colors";

export function waitingColor(value) {
    if (value < 10)
        return green[500]
    if (value < 30)
        return orange[500]
    return red[500]
}