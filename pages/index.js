import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/components/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.gitHubUser}.png`} style={{borderRadius: '8px'}}/>
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
    'eduardo9200'
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
