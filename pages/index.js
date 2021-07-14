import { useEffect, useState } from 'react';
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

export default function Home() {
  
  const [comunidades, setComunidades] = useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const [seguidores, setSeguidores] = useState([]);

  const gitHubUser = 'sergiocabreu';
  const pessoasFavoritas = [
    'zacariasgsn',
    'esmayk',
    'ivancrp',
    'marcelodsa',
    'eduardo9200',
    'rafaeldecasstro',
  ];

  useEffect( () => {
    fetch('https://api.github.com/users/sergiocabreu/followers')
    .then(r => {return r.json()})
    .then(r => setSeguidores(r));
  }, [])


  return (
    <> 
      <AlurakutMenu githubUser={gitHubUser}/>
      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitHubUser={gitHubUser}/>
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

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosFormulario.get('title'),
                  link: dadosFormulario.get('link'),
                  image: `https://picsum.photos/200/300?random=${new Date().toTimeString()}`
                };

                setComunidades([...comunidades, comunidade]);
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
                <button>
                  Criar comunidade
                </button>
            </form>
          </Box>        
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
                {seguidores.length}
              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>
              <ul>
              {
                comunidades.map((itemAtual)=> {
                  return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.link}>
                        <img src={itemAtual.image}/>
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })
              }
              </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
            {
              pessoasFavoritas.map((itemAtual)=> {
                return (
                  <li key={itemAtual}>
                    <a href={`users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })
            }
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
