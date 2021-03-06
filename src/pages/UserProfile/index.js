import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams, Redirect } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/auth";

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import SkeletonPage from "../../components/SkeletonPage";
import NoPhoto from "../../assets/images/user_profile/no-image.png";
import Loading from "../../components/Loading";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState({});
  let { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    async function getPerfil(perfilID) {
      await api
        .get(`/api/perfil/${perfilID == 0 ? user.id : perfilID}`)
        .then((res) => {
          console.log(res.data);
          setPerfil({ ...res.data });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.status);
          setLoading(false);
        });
    }
    getPerfil(id);
  }, []);

  if (loading) {
    return <Loading />;
  }

  function servicesList(servicos) {
    let keys = Object.keys(servicos);

    let list = keys.filter((key) => servicos[key] && key != "id");

    return list;
  }

  function socialMediaList(midias) {
    let list = Object.entries(midias).filter((midia) => {
      return midia[1] != null && midia[0] != "id";
    });
    console.log(list);

    return list;
  }

  // const naoHaServicos = () => {
  //   if(perfil.servicos.design === false &&
  //     perfil.servicos.edicao === false &&
  //     perfil.servicos.fotografia === false &&
  //     perfil.servicos.ilustracao === false &&
  //     perfil.servicos.redacao === false
  //     ){
  //       return true
  //     } else {
  //       return false
  //     }
  // }

  // useEffect(() => {
  //   console.log('primeiro useEffect')
  //   async function getProposta(){
  //     // console.log(`url /api/vagas/${id}/candidaturas/${perfilId}`)
  //     await api.get(`/api/vagas/${id}/candidaturas/${perfilId}`)
  //     .then(response => {
  //       setProposta(response.data);
  //       getPerfil(response.data.id)
  //     })
  //     .catch(err => {
  //       alert('Ops! Ocorreu um erro ao obter os dados da proposta.')
  //       console.log(err.response.data);
  //     });
  //   }
  //   async function getPerfil(idPerfil){
  //     // console.log(`url /api/vagas/candidaturas/${proposta.id}/perfilCandidato`)
  //     await api.get(`/api/vagas/candidaturas/${idPerfil}/perfilCandidato`)
  //     .then(response => {
  //       setPerfil(response.data)
  //       setLoading(false)
  //     })
  //     .catch(err => {
  //       alert('Ops! Ocorreu um erro ao obter os dados do perfil.')
  //       console.log(err.response.data)
  //     });
  //   }
  //   getProposta();
  //   },[])

  function socialMediaLink(midia) {
    const site = midia[0];
    const link = midia[1];
    if (site === "facebook") {
      return (
        <a
          href={`${link}`}
          target="_blank"
          rel="noreferrer"
          className="social-media-link"
        >
          <FaFacebookSquare size={36} />
        </a>
      );
    } else if (site === "twitter") {
      return (
        <a
          href={`${link}`}
          target="_blank"
          rel="noreferrer"
          className="social-media-link"
        >
          <FaTwitterSquare size={36} />
        </a>
      );
    } else if (site === "instagram") {
      return (
        <a
          href={`${link}`}
          target="_blank"
          rel="noreferrer"
          className="social-media-link"
        >
          <FaInstagramSquare size={36} />
        </a>
      );
    } else if (site === "linkedin") {
      return (
        <a
          href={`${link}`}
          target="_blank"
          rel="noreferrer"
          className="social-media-link"
        >
          <FaLinkedin size={36} />
        </a>
      );
    }
  }

  return (
    <SkeletonPage footer={true} sidebar={true}>
      {!loading && Object.keys(perfil).length === 0 ? (
        <h1 className="text-white">Perfil não encontrado...</h1>
      ) : (
        <main className="container">
          <div className="row">
            <div className="col-sm-3 img-container d-flex justify-content-center align-content-center">
              <img
                src={perfil.imageURL == null ? NoPhoto : perfil.imageURL}
                alt="imagem de perfil do usuário"
                className="img-round w-100"
              />
            </div>
            <div className="col-sm-9 text-white">
              <h1>{perfil.nome}</h1>
              <h4>Tipo de freelancer: {perfil.type}</h4>
              <h4>Bio:</h4>
              <p>{perfil.bio}</p>
            </div>
          </div>
          <hr className="divider" />
          <div className="text-white servicos">
            <h4>Serviços oferecidos:</h4>
            <ul className="ml-5">
              {servicesList(perfil.servicos).length > 0 ? (
                servicesList(perfil.servicos).map((servico, index) => (
                  <li key={index}>
                    {servico.charAt(0).toUpperCase() + servico.slice(1)}
                  </li>
                ))
              ) : (
                <p>Não há serviços cadastrados</p>
              )}
            </ul>
          </div>
          {perfil.interesses != null ? (
            <>
              <hr className="divider" />
              <div className="text-white interesses">
                <h4>Interesses</h4>
                <ul className="ml-5">
                  {perfil.interesses.split(",").map((interesse, index) => (
                    <li key={index}>{interesse}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}

          <hr className="divider" />
          <div className="midias-sociais text-white">
            <h4>Midias sociais</h4>
            <div className="links">
              {socialMediaList(perfil.midiasSociais).length > 0 ? (
                socialMediaList(perfil.midiasSociais).map((midia, index) => {
                  return (
                    <span key={index} className="mr-5">
                      {socialMediaLink(midia)}
                    </span>
                  );
                })
              ) : (
                <p className="ml-5">Não há mídias sociais cadastradas</p>
              )}
            </div>
          </div>
        </main>
      )}
    </SkeletonPage>
  );
};

export default UserProfile;
