import React, {useState} from 'react';

import { FiLogIn } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import './styles.css';

import heroesImg from '../../assets/heroes.png';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Login(){
    
    const[ id  , setLogin ]  = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            id
        }
        try{
            const response = await api.post('sessions',{id});

            console.log(response.data.name);

            localStorage.setItem('ongName',response.data.name);
            localStorage.setItem('ongId',id);

            history.push('/profile');

        }
        catch(err){
            alert('Falha no login, tente novamente.');
        }
        
    }
    
    return(

        <div  className="login-container" >

            <section className="form">

                <img src={logoImg} alt="Be The Hero"></img>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input  placeholder="Sua ID"
                        value={id}
                        onChange={(e =>setLogin( e.target.value))}
                    ></input>

                    <button className="button" type="Submit">Entrar</button>

                    <Link className=".back-link" to="Register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>

                </form>

            </section>

            <img src={heroesImg} alt="Heroes"></img>

        </div>

    );
}