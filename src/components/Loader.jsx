import { CircularProgress, Grid } from "@mui/material"


export const Loader = () => {
  return (
    <Grid 
      container
      direction="column"
      spacing={ 0 }
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
      >
        <CircularProgress size="80px" color="primary" />
      </Grid>
    </Grid>
  )
}
