import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa";


const CardNotificacaoCandidatura = () => {
    return (
        <div className="card w-100 shadow rounded my-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        <h6 className="text-success card-title small font-weight-bold">
                            <FaBookmark/> Candidatura</h6>

                        <p className="card-text"><strong>Nome</strong> tem interesse na sua postagem <Link
                            to="#">Nome da Postagem</Link>.</p>
                    </div>
                    <div className="col">
                        <img className="float-right img-fluid rounded-circle border" width="100px" src="#"
                             alt="Nome da pessoa"/>
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-around">
                <Link to="#" className="font-weight-bold text-decoration-none txt-secondary_">CONTATAR</Link>
                <Link to="#" className="font-weight-bold text-decoration-none text-danger">ARQUIVAR</Link>
            </div>
        </div>
    );
};

export default CardNotificacaoCandidatura;