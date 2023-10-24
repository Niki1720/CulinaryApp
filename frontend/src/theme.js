import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#6E7180',
        },
    },
    typography: {
        fontFamily: 'Public Sans", sans-serif',
        fontSize: '20px',
    },
    tableCell: {
        fontSize: '18px',
        weight: '700',
        color: '#6E7180',
        padding: '15px 60px',
    },
    tableRow: {
        fontFamily: 'Public Sans", sans-serif',
        weight: '400',
        fontSize: '18px',
        color: '#6E7180',
        margin: '10px 60px',
    },
    tableHeadRecipe: {
        fontFamily: 'Public Sans", sans-serif',
        weight: '400',
        fontSize: '18px',
        color: '#6E7180',
        padding: '20px 60px',
        background: '#F8F9FA',
        borderRadius: '0.5px 0.5px 0.5px 0.5px',
        border: '0.5px solid #E4E0DC'
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '20px',
    },
    flexButtonContainer: {
        textAlign: 'right'
    },
    buttonStyle: {
        width: '135px',
        backgroundColor: '#867DF0',
        borderRadius: '10px',
        textTransform: 'capitalize',
    },
    buttonRecipe: {
        width: '100%',
        textTransform: 'capitalize',
        backgroundColor: '#F8F9FA',
        borderRadius: '0.5px 0.5px 0.5px 0.5px',
    },
    texAreaStyle: {
        width: "100%",
        weight: '400',
        borderRadius: "5px"
    },
    tagStyle: {
        backgroundColor: "#FCF7EF",
        borderRadius: "5px",
        display: "inline-block",
        minWidth: "60px",
        minHeight: "30px",
        textAlign: 'center',
        fontWeight: '700',
        fontSize: "15px",
        textTransform: 'capitalize',
        color: '#F4995B',
        verticalAlign: 'middle',
        marginRight: "10px",
        paddingTop: '5px'
    },
    recipeSpan: {
        fontFamily: 'Public Sans", sans-serif',
        weight: '400',
        fontSize: '18px',
        color: '#6E7180',
        marginLeft: "10px"
    }
});

export default theme;
