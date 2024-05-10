import { Card, CardContent, Stack } from '@mui/material';
import ButtonR from '../ButtonR';
import BoxConfigSignaturee from './BoxConfigMateria';

function CardDraft(){

    return(
        <Card sx={{maxWidth: 500, bgcolor: '#CACAFA'} }>
            <Stack spacing={1}>
                <BoxConfigSignaturee />
            </Stack>
            
        </Card>
    );
}
export default CardDraft;