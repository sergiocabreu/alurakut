import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box'
import { AlurakutMenu } from '../src/components/lib/AluraKutCommons';

function ProfileSideBar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.gitHubUser}.png`} style={{borderRadius: '8px'}}/>
    </Box>
  );
}

export default function Home() {
  const gitHubUser = 'sergiocabreu'
  return (
    <> 
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitHubUser={gitHubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            Bem vindo
          </Box>        
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <Box>
            Pessoas
          </Box>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
