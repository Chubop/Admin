import { Button, Grid } from "@material-ui/core";
import { colors } from "../../theme/colors";

export function TableTabs(props) {
    const { tabs, currentTab, setCurrentTab } = props;

    return (
        <Grid container spacing={1} style={{ marginLeft: 5, paddingTop: 8, height: '100%' }}>
            {tabs.map((tab) => {
                return (
                <Grid item style={{ backgroundColor: colors.greys.lightGrey, margin: '4px', borderRadius: 10 }}>
                    <Button onClick={() => setCurrentTab(tab.value)}
                        style={{
                            backgroundColor: currentTab === tab.value ? colors.theme.white : colors.greys.lightGrey,
                            color: currentTab === tab.value ? colors.theme.darkBlue : colors.theme.text,
                            padding: '5 0',
                        }}
                    >
                        {tab.title}
                    </Button>
                </Grid>
                )
            })}
        </Grid>
    )
}