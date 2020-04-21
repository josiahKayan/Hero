import React, {useEffect, useState} from 'react';
import './styles.css';

import heroesImg from '../../assets/heroes.png';

import logoImg from '../../assets/logo.svg';

import { FiPower,FiTrash2 } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

export default function Profile(){
    

    const [incidents,SetIncident] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

     useEffect(() => {
        
        async function loadCasos(){

            const response = await api.get('/incidents',{
                headers:{
                    Authorization: ongId,
                }
            })
             
            SetIncident(  incidents.concat( response.data.incidents)  );
        }

        loadCasos();
        
    },[]);
    
    async function handleDeleteIncident(id){
        try{
            await api.delete('incidents/'+id,{
                headers:{
                    Authorization: ongId,
                }
            })

            SetIncident(  incidents.filter(  f => f.id != id   )  );


            alert('Deletado com sucesso');

        }
        catch(err){
            alert('Erro ao deletar');
        }
    }

    async function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"></img>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>

            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                
                {
                
                incidents.map( incident =>(

                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>

                    </li>

                   

                ))}

            </ul>

        </div>

    );

}