import styled from 'styled-components'

const Box = styled.div`
  background: #ffffff;
  border-radius: 8px;
`;

export default function Home() {
  return (
    <main>
      <Box>
        Imagem
      </Box>
      <Box>
        Bem vindo
      </Box>
      <Box>
        Comunidades
      </Box>
    </main>
  )
}
