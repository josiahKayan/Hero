import React , {useEffect, useState} from 'react';
import './styles.css';


import heroesImg from '../../assets/heroes.png';

import logoImg from '../../assets/logo.svg';

import { FiPower,FiTrash2 } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';

import api from '../../services/api';

export default function NewIncident(){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try{
            const response = await api.post('incidents',data,{
                headers:{
                    Authorization: ongId,
                }
            });

           alert('Cadastrado com sucesso');

           history.push('/profile');
            
        }
        catch(err){
            alert('Erro ao cadastrar');
        }

    }

    return(
        <div className="new-incident-container">
                <div className="content">

                    <section>

                        <img  src={logoImg} alt="Be The Hero" ></img>

                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                        <Link className=".back-link" to="/profile">
                            <FiLogOut size={16} color="#E02041"/>
                            Voltar para a Home
                        </Link>

                    </section>
                    <form onSubmit={handleNewIncident}>
                        <input placeholder="Título do caso"
                            value={title}
                            onChange={(e =>setTitle( e.target.value))}
                        ></input>
                        <textarea  placeholder="Descrição"
                            value={description}
                            onChange={(e =>setDescription( e.target.value))}
                        ></textarea>
                        <input placeholder="Valor em reais"
                            value={value}
                            onChange={(e =>setValue( e.target.value))}
                        ></input>


                        <button className="button" type="submit">Cadastrar</button>

                    </form>

                </div>
            </div>
    );
}