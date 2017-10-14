import createMuiTheme from 'material-ui/styles/createMuiTheme';

export default function( style = "light" ){
    const theme =  {
        style,
        primaryColor  : "#CC0000",
        secondaryColor: "#00DD00",
        themeStyle    : {
            light:{
                bgColor       : "#F2F2F2",
                fontColor     : "#444444",
                primaryColor  : "rgba(194,24,91 ,1)",
                secondaryColor: "rgba(2,119,189 ,1)"
            },
            dark:{
                bgColor       : "rgba(38,50,56 ,1)",
                fontColor     : "#CCC",
                primaryColor  : "rgba(240,98,146 ,1)",
                secondaryColor: "rgba(3,169,244 ,1)"
            }
        },
        currentStyle:{}
    };

    theme.currentStyle = theme.themeStyle[style];

    return createMuiTheme(theme);
}