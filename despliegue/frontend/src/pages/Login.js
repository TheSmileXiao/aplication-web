import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
const axios = require('axios').default;

var user;
var pass;

function Login() {
    const navigate = useNavigate();

    const autenticacion = () => {
        axios.post('/api/login', null, {
            params:{
                'user': user,
                'password': pass
            }
        })
            .then(function (response) {
            console.log('Login OK')
            navigate('/Notas');
        })
            .catch(function (error) {
            console.log(error);
            alert("El usuario no existe");
        });
    }
    return(

        <div className='containerLogin'> 
            <div>
                <label>Usuario:*</label>
                <br/>
                <input type='usuario' className='form-control' onChange={(e)=>{
                    user = e.target.value;
                }}/>
                <br/>
                <label>Contraseña:*</label>
                <br/>
                <input type='password' className='form-control' onChange={(e) =>{
                    pass = e.target.value;
                }}/>
                <br/>
                <Button variant='contained' value='Login' onClick={autenticacion}>Login</Button>
            </div>
        </div>
    );
}
export {user};
export default Login;