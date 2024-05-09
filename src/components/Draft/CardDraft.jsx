import { Card, CardContent } from '@mui/material';
import ButtonGeneral from '../ButtonGeneral';

function CardDraft(){
    return(
        <Card sx={{maxWidth: 300}}>
            <CardContent>
                <h3>Prueba</h3>
                <p>Lorem ipsum dolor sit amet.</p>
                <ButtonGeneral 
                    clr={"secondary"}
                    name={"ACCIÓN 1"}
                />
                <ButtonGeneral 
                    clr={"succeess"}
                    name={"ACCIÓN 2"}
                />
            </CardContent>

        </Card>
    );
}
export default CardDraft;