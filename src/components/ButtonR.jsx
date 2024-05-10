import { Button } from '@mui/material';

function ButtonR( {clr, name,startIcon,callback}){
    return(
            
        <Button variant='contained' color={clr} startIcon={startIcon} onClick={callback}>{name}</Button>
        
    );
}

export default ButtonR;