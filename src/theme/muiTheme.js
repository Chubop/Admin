import { createTheme, responsiveFontSizes } from "@material-ui/core";
import { colors } from "./colors";

export const theme = responsiveFontSizes(createTheme({
    shape: {
        borderRadius: 5,
    },
    pallette: {
        type: 'dark',
        primary: {
            main: 'blue'
        },
        secondary: {
            main: 'red'
        }
    },
    typography: {
        h1: {
            // Large numbers
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '1',
        },
        h2: {
            // h1 Page title
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '1.2'
        },
        h3: {
            // h2 Card titles
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1.25'
        },
        h4: {
            // h3 Card subtitles
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1.333'
        },
        h5: {
            // h4
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '1.20',
            textTransform: 'uppercase',
            letterSpacing: '0.33px'
        },
        h6: {
        },
        // subtitle1: {
        //     fontFamily: 'Roboto',
        //     fontSize: '14px',
        //     lineHeight: '1.5', // 24
        //     fontWeight: 700
        // },
        // subtitle2: {
        //     fontFamily: 'Roboto',
        //     fontSize: '14px',
        //     lineHeight: '1.429', // 20
        //     fontWeight: 700
        // },

        body1: {
            // Body, main body text
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '1.35',
            fontWeight: 400
        },
        body2: {
            // Body bold, button text, labels, table titles, emphasis
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '1.33',
            fontWeight: 600,
        },
        caption: {
            // Body small, meta data
            fontFamily: 'Roboto',
            fontSize: '12px',
            lineHeight: '1.333',
            fontWeight: 400
        },
        subtitle1: {
            // Same as h5 with smaller line height and paragraph spacing
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '1.20',
            fontWeight: 500
        },
        subtitle2: {
            // Same as body with smaller line height and paragraph spacing
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '1.20',
            fontWeight: 400
        },
    },
    overrides: {
        MuiDivider: {
            root: {
                backgroundColor: colors.components.divider,
                height: '1px',
                marginTop: '32px',
                marginBottom: '32px',
            },
            light: {
                backgroundColor: colors.components.divider,
                height: '1px',
                marginTop: '8px',
                marginBottom: '8px',
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: '2rem',
                color: colors.theme.text,
            }
        },
        MuiListItem: {
            dense: {
                margin: 0,
            }
        },
        MuiListItemText: {
            root: {
                color: colors.theme.text,
            },
            primary: {
                color: colors.theme.text,
            },
            secondary: {
                color: colors.theme.text,
            }
        },
        MuiButton: {
            root: {
                padding: '12px 8px',
                whiteSpace: 'nowrap',

                textTransform: 'none',
                borderRadius: '4px',
                letterSpacing: 'normal',
                boxShadow: 'none'
            },
            label: {
                fontFamily: 'Roboto',
                // fontWeight: 700,
                // fontSize: '16px',
                // lineHeight: '1.5', // 25
            },
            containedPrimary: {
                // backgroundColor: colors.darkTheme.blue.default,
                borderRadius: '100px',
                boxShadow: 'none',
                '&:hover': {
                    // backgroundColor: colors.darkTheme.blue.dark
                },
                '&:focus': {
                    // backgroundColor: colors.darkTheme.blue.dark,
                },
                '&:active': {
                    // backgroundColor: colors.darkTheme.blue.darker,
                    boxShadow: 'none',
                },
                '&:disabled': {
                    color: colors.theme.text,
                    backgroundColor: 'rgba(12, 80, 255, 0.53)'
                }
            },
            containedSecondary: {
                borderRadius: '100px',
                // backgroundColor: colors.webKit.primary.liveOrange,
                boxShadow: 'none',
                '&:hover': {
                    // backgroundColor: colors.webKit.hover.orangeDark
                },
            },
            containedSizeLarge: {
                fontSize: '1rem'
            },
            outlinedSecondary: {
                color: colors.theme.text,
                border: '1px solid ' + colors.theme.text,
                borderRadius: '100px',
                textDecoration: 'none',
                padding: '9px',
                '&:hover': {
                    // backgroundColor: colors.webKit.primary.white,
                    // color: colors.darkTheme.blue.darkest,
                    border: ''
                },
            },
            outlinedPrimary: {
                border: '2px solid ' + colors.theme.mediumBlue,
                borderRadius: '100px',
                color: colors.theme.mediumBlue,
                textTransform: 'none',
            }
        },

        // For Text Fields
        MuiFormLabel: {
            root: {
                // When focused, label remains white instead of blue, and underlined
                '&$focused': {
                    color: colors.theme.text,
                    // borderBottom: '1px solid' + colors.darkTheme.focus.outer,
                },
            },
        },
        MuiInputLabel: {
            root: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                // fontSize: '16px',
                // height: '21px'
            },
            // Center the placeholder/label vertically
            formControl: {
                // original: transform: 'translate(0, 24px) scale(1)'
                // transform: 'translate(0, 100%) scale(1)',
            }
        },
        MuiFormControl: {
            root:  {
                border: 'none'
            }

        },
        MuiInput: {
            // Make input bolded
            input: {
                // fontSize: '16px',
                // lineHeight: '24px',
            }
        },
        MuiOutlinedInput: {
            root: {
                color: colors.theme.text,
                borderRadius: '4px',
                // border: '2px solid ' + colors.webKit.primary.lightGrey,
                minWidth: '244px',
            },
            input: {
                padding: "0.5em",
            },
            notchedOutline: {
                border: 'none'
            }
        },
        MuiMenu: {
            list: {
                padding: 0,
            }
        },
        MuiMenuItem: {
            root: {
                whiteSpace: 'normal',
                padding: '0px 10px',
                // border: '1px solid ' + colors.webKit.primary.lightGrey,

                '&:focus': {
                    // backgroundColor: colors.webKit.primary.veryLightGrey,
                    // border: '2px solid ' + colors.webKit.primary.lightBlue,
                },
                '&:hover': {
                    // backgroundColor: colors.webKit.primary.lightBlue,
                },
                '&$selected': {
                    // backgroundColor: colors.webKit.primary.veryLightGrey,
                }
            }
        },
        MuiCheckbox: {
            root: {
                color: colors.theme.text,
                '&$checked': {
                    color: colors.theme.mediumBlue
                },
            },
            colorSecondary: {
                '&$checked': {
                    color: colors.theme.mediumBlue
                },
            },
        },

        MuiRadio: {
            root: {
                color: colors.theme.text,
                '&$checked': {
                    color: colors.theme.mediumBlue
                },
            },
            colorSecondary: {
                '&$checked': {
                    color: colors.theme.mediumBlue
                },
            },
        },
        MuiFormHelperText: {
            root: {
                color: colors.theme.text
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: colors.theme.white
            },
            elevation1: {
                boxShadow: 'none'
            }
        },
        MuiCard: {
            root: {
                padding: '10px',
                borderRadius: '16px',
                boxShadow: 'none'
            }
        },
        MuiChip: {
            root: {
                // backgroundColor: colors.webKit.transparencies.lightTransparent,
                border: "none"
            },
            label: {
                // color: colors.webKit.primary.white,
            },
            outlinedPrimary: {
                // backgroundColor: colors.webKit.transparencies.lightTransparent,
                border: 'none'
            },
            outlinedSecondary: {
                // backgroundColor: colors.webKit.primary.liveOrange,
                border: 'none'
            },
        },
        MuiCardHeader: {
            root: {
                color: colors.theme.text
            }
        },
        MuiAppBar: {
            colorPrimary: {
                color:  colors.theme.text,
                backgroundColor: colors.theme.white,
                boxShadow: 'none'
            }
        }
    },
}),
    {
        factor: 3,
    })