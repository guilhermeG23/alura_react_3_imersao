/*import styled from 'styled-components'*/
/*Não tem nada na frente do nome do diretorio por motivo que ele encaixa com o index por default*/
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

/*
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
*/

//Propriedades
function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box>
    {/*`` -> Usar JS dentro do html */}
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <br />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

//Return só entende um componente, isso é, tudo tem que estar dentro de uma tag para ser interpretado pela parte que recebe o return
export default function Home() {
  const usuarioAleatorio = 'guilhermeG23';
  const pessoasFavortias = ['juunegreiros', 'omariosouto', 'peas', 'LINUXtips']  
  const comunidades = ['']  
  return (
    <>
      {/*Achei onde coloca o valor do usuario no menu minimizado*/}
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        {/*Não pode usar o "" dentro do return, só conceito de chave valor*/}
        {/*<Box style="grid-area: profileArea">*/}
        <div className="profileArea" tyle={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={usuarioAleatorio}/> 
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div class="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          {/*Pessoas favoritas*/}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavortias.length})
            </h2>
            <ul>
              {pessoasFavortias.map((valorAtual) => {
                return (
                  <li>
                    <a href={`/users/${valorAtual}`} key={valorAtual}>
                      <img src={`https://github.com/${valorAtual}.png`} />
                      <span>{valorAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          {/*Comunidades*/}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade ({comunidades.length})
            </h2>
            <ul>
              {pessoasFavortias.map((valorAtual) => {
                return (
                  <li>
                    <a href={`/users/${valorAtual}`} key={valorAtual}>
                      <img src={`https://github.com/${valorAtual}.png`} />
                      <span>{valorAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
