import "./Bloc.scss";

function Bloc(data) {
  console.log(data, "blocc");
  if (Array.isArray(data.props)) {
    return (
      <div className="container">
        <div className="fr-bloc">
          <ul>
            {data.props.slice(0, 4).map((key,index) => (
              <li key={index}>
                <span className="title-bloc">{key.nomenclature.libelle}</span>
                <span className="title-update">
                  Dernière mise à jour : <br /> JJ/MM/AAAA
                </span>
                <a className="title-source" href="#">
                  Source : Legifrance
                </a>
              </li>
            ))}
          </ul>
          <div className="section-text">
          <p>
            {" "}
            CodIT est une application de la Direction Générale du Travail qui
            permet de consulter les articles du Code du travail ou des
            dispositions relative au travail présentes dans d’autres Codes.
          </p>
          <p>
            Il intègre les codes NATINF à jour pour les dispositions relatives
            aux infractions.
          </p>
          <p>
            Il se destine prioritairement aux agents du système d’inspection du
            travail mais est aussi librement accessible aux utilisateurs qui
            n’en relèvent pas.
          </p>
          <p>
            Il fait l’objet d’une mise à jour quotidienne régulière à partir des
            données de Légifrance mais ne constitue pas une référence juridique
            officielle.
          </p>
        </div>
        </div>

      </div>
    );
  }
}

export default Bloc;
