import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades) {
  return (
    <Box>
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
  const gitHubUser = 'sergiocabreu';
  const pessoasFavoritas = [
    'zacariasgsn',
    'rafaeleliasrb',
    'esmayk',
    'ivancrp',
    'marcelodsa',
    'eduardo9200',
    'rafaeldecasstro',
    'sergiocabreu'
  ];


  return (
    <> 
      <AlurakutMenu />
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

            <form onSubmit={ (event) => event.preventDefault() }>
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
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="name" 
                  arial-label="Coloque uma URL para usarmos de capa"/>
              </div>              
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>        
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
            {
              pessoasFavoritas.map((itemAtual)=> {
                return (
                  <li>
                    <a href={`users/${itemAtual}`} key={itemAtual}>
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
