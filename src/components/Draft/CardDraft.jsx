import { Card, CardContent, Stack } from '@mui/material';
import ButtonR from '../ButtonR';
import BoxConfigSignaturee from './BoxConfigMateria';

function CardDraft(){

    const despedir = () => {
        alert("chaAAAUuU")
    }
    return(
        <Card sx={{maxWidth: 500, bgcolor: '#CACAFA'} }>
            <CardContent>
                <h3>Prueba</h3>
                <p>Lorem ipsum dolor sit amet.</p>
                <Stack direction={'row'} spacing = {4}>
                    <ButtonR 
                        name='ACCIÓN 1'
                        callback={() => alert('Bien Heecho!')}
                    />
                    <ButtonR 
                        clr='success'
                        name='ACCIÓN 2'
                        callback={despedir}
                    />
                </Stack>

            </CardContent>
            <BoxConfigSignaturee />
        </Card>
    );
}
export default CardDraft;