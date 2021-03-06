import React, { useEffect, useState } from "react";
import CardVaga from "../../components/CardVaga";
import SkeletonPage from "../../components/SkeletonPage";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const Vagas = () => {
  let { status, tipoUsuario } = useParams();
  let { user } = useAuth();
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  const titulo = () => {
    let usuario =
      tipoUsuario.charAt(0).charAt(0).toUpperCase() + tipoUsuario.slice(1);
    let tipo = status.toLowerCase();
    if (tipo === "ativa") {
      tipo = "ativas";
    } else if (tipo === "bloqueada") {
      tipo = "bloqueadas";
    } else if (tipo === "concluida") {
      tipo = "concluídas";
    } else {
      tipo = "em andamento";
    }
    return (
      <p className="text-light text-center">
        {usuario} - Vagas {tipo}
      </p>
    );
  };

  useEffect(() => {
    async function getVagas() {
      const url =
        tipoUsuario === "freelancer"
          ? `/api/vagas/candidaturas/freelancer?statusVaga=${status.toUpperCase()}`
          : `/api/vagas/contratante/${
              user.id
            }?statusVaga=${status.toUpperCase()}`;
      console.log(url);
      await api
        .get(url)
        .then((response) => {
          setVagas(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          return [];
        });
    }
    getVagas();
  }, [status, tipoUsuario]);

  if (loading) {
    return (
      <SkeletonPage sidebar={true} footer={false}>
        <Loading />
      </SkeletonPage>
    );
  }

  return (
    <SkeletonPage sidebar={true} footer={false}>
      {titulo()}
      <hr className="bg-light"/>
      {vagas.length > 0 ? (
        vagas.map((vaga) => {
          return <CardVaga key={vaga.id} vaga={vaga}/>;
        })
      ) : (
        <h3 className="text-light">Não há vagas com status "{status}"...</h3>
      )}
    </SkeletonPage>
  );
};

export default Vagas;
