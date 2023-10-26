import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    buttonRecipe: {
        width: '100%',
        textTransform: 'capitalize',
        backgroundColor: '#F8F9FA',
        borderRadius: '0.5px 0.5px 0.5px 0.5px',
    },
    buttonStyle: {
        width: '135px',
        backgroundColor: '#867DF0',
        borderRadius: '10px',
        textTransform: 'capitalize',
    },
    customSpan: {
        color: '#6E7180',
        fontFamily: 'Public Sans", sans-serif',
        fontSize: '18px',
        marginLeft: '10px',
        weight: '400',
    },
    flexButtonContainer: {
        textAlign: 'right',
    },
    flexContainer: {
        alignItems: 'center',
        display: 'flex',
        fontSize: '20px',
    },
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#6E7180',
        },
    },
    tableCell: {
        color: '#6E7180',
        fontSize: '18px',
        padding: '15px 60px',
        weight: '700',
    },
    tableHeadRecipe: {
        background: '#F8F9FA',
        border: '0.5px solid #E4E0DC',
        color: '#6E7180',
        fontFamily: 'Public Sans", sans-serif',
        fontSize: '18px',
        padding: '20px 60px',
        borderRadius: '0.5px 0.5px 0.5px 0.5px',
        weight: '400',
    },
    tableRow: {
        color: '#6E7180',
        fontFamily: 'Public Sans", sans-serif',
        fontSize: '18px',
        margin: '10px 60px',
        weight: '400',
    },
    texAreaStyle: {
        borderRadius: '5px',
        weight: '400',
        width: '100%',
    },
    tagStyle: {
        backgroundColor: '#FCF7EF',
        borderRadius: '5px',
        color: '#F4995B',
        display: 'inline-block',
        fontSize: '15px',
        fontWeight: '700',
        margin: '10px',
        minHeight: '30px',
        minWidth: '60px',
        paddingTop: '5px',
        textAlign: 'center',
        textTransform: 'capitalize',
        verticalAlign: 'middle',
    },
    typography: {
        fontFamily: 'Public Sans", sans-serif',
        fontSize: '20px',
    },
});

export default theme;