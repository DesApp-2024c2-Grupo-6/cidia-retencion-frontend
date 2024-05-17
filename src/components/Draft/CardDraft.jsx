import { Card, CardContent, Stack } from '@mui/material';
import BoxConfigSignaturee from './BoxConfigMateria';

function CardDraft(){

    return(
        <Card sx={{maxWidth: 500} }>
            <Stack spacing={1}>
                <BoxConfigSignaturee />
            </Stack>
            
        </Card>
    );
}
export default CardDraft;