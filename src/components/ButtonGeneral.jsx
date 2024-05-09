import { Button } from '@mui/material';

function ButtonGeneral( {clr, name,callback}){
    return(
        <Button variant='contained' color={clr} onClick={callback}>{name}</Button>
    );
}

export default ButtonGeneral;