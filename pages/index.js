import { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.gitHubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.gitHubUser}`}>
          @{propriedades.gitHubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({titulo, itens}) {
  return (
    <>
      <h2 className="smallTitle">
        {titulo} ({itens.length})
      </h2>
      <ul> {
        itens.map((item)=> {
          return (
            <li key={item.id}>
              <a href={item.link ? item.link : ''}>
                <img src={item.imageUrl}/>
                <span>{item.title}</span>
              </a>
            </li>
          )
        })
      }
      </ul>
    </>

  );
}

export default function Home({githubUser}) {
  
  const [comunidades, setComunidades] = useState([]);

  const [seguidores, setSeguidores] = useState([]);

  useEffect( () => {

    fetch(`https://api.github.com/users/${githubUser}/followers`)
        .then(r => {return r.json()})
        .then(git => {
            const novosSeguidores = git.map( seguidor => { 
              return {
                id: seguidor.login,
                link: seguidor.html_url,
                title: seguidor.login,
                imageUrl: seguidor.avatar_url
              }
          });
          setSeguidores(novosSeguidores);
        }
    );
  }, [])

  useEffect( () => {
    fetch('https://graphql.datocms.com', 
    {
      method: 'POST',
      headers: {
        'Authorization': 'f7f95b575bd7a6d6fc54383c1ed032',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query {
                                        allCommunities {
                                          id
                                          title
                                          imageUrl
                                        }
                                      }
      `})
    })
    .then( (resposta) => resposta.json())
    .then( (resposta) => {
      const novasComunidades = resposta.data.allCommunities;
      setComunidades(novasComunidades);
    });

  }, []);


  return (
    <> 
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitHubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box className="title">
            <h1>
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={ (event) => { 
                event.preventDefault();

                const dadosFormulario = new FormData(event.target);

                const urlImage = dadosFormulario.get('image') ? dadosFormulario.get('image') : `https://picsum.photos/200/300?random=${new Date().toTimeString()}`;
                
                const comunidade = {
                  title: dadosFormulario.get('title'),
                  link: dadosFormulario.get('link'),
                  imageUrl: urlImage,
                  creatorSlug: gitHubUser
                };

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                }).then(async (response) => {
                      const dados = await response.json();
                      const comunidade = dados.registroCriado;
                      const novasComunidades = [...comunidades, comunidade];
                      setComunidades(novasComunidades);
                });

                } }>
                <div>
                  <input 
                    type="text"
                    placeholder="Qual vai ser o nome da sua comunidade?" 
                    name="title" 
                    arial-label="Qual vai ser o nome da sua comunidade?"/>
                </div>
                <div>
                  <input 
                    type="text"
                    placeholder="Coloque o link da comunidade" 
                    name="link" 
                    arial-label="Coloque o link da comunidade"/>
                </div>
                <div>
                  <input 
                    type="text"
                    name="image"
                    placeholder="Coloque o link da capa"
                    arial-label="Coloque o link da capa"
                  />
                </div>                
                <button>
                  Criar comunidade
                </button>
            </form>
          </Box>        
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
              <ProfileRelationsBox titulo="Seguidores" itens={seguidores}/>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <ProfileRelationsBox titulo="Comunidades" itens={comunidades}/>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {

  const token = nookies.get(context).USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    hearders: {
      Autorization: token
    }
  })
  .then( response => response.json())

  if (isAuthenticated || !token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const {githubUser} = jwt.decode(token);

  return {
    props: {
      githubUser
    }
  };
}