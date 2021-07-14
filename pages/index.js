/*import styled from 'styled-components'*/
/*Não tem nada na frente do nome do diretorio por motivo que ele encaixa com o index por default*/
import React from 'react';
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
  {/*console.log(propriedades);*/}
  return (
    <Box as="aside">
      {/*`` -> Usar JS dentro do html */}
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      {/*<br />*/}
      <hr />
      <p>
        <a className="boxLink" href={`https://www.github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

//Return só entende um componente, isso é, tudo tem que estar dentro de uma tag para ser interpretado pela parte que recebe o return
export default function Home() {
  //Rookies -> Ganchos
  const usuarioAleatorio = 'guilhermeG23';
  const pessoasFavortias = ['juunegreiros', 'omariosouto', 'peas', 'LINUXtips']  
  //Setar o primeiro estado
  const [comunidades, setComunidades] = React.useState([{
    id: new Date().toISOString(), 
    title: "teste", 
    image:"https://images.sftcdn.net/images/t_app-cover-m,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg",
    url: "https://youtube.com/",
  }]);
  //console.log(comunidades.length);
  //const comunidades = ['']  
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
          <Box>
            <h2 className="smallTitle">
              Escolha seu wallpaper
            </h2>
            <form onSubmit={function handleSetWallpaper(e) {
              /*E = entrada padrão do submit*/
              e.preventDefault();
              /*transforma os dados do formulario*/
              const dadosDoForm = new FormData(e.target);
              /**/
              if (dadosDoForm.get('wallpaper').length != 0) {
                document.body.style.backgroundImage = `url('${dadosDoForm.get('wallpaper')}')`;  
              }
            }}>
              <div>
                <input 
                  placeholder="Escolha seu wallpaper?"
                  name="wallpaper"
                  aria-label="Escolha seu wallpaper?"
                  type="text"
                />
              </div>
              <button>
                Aplicar wallpaper
              </button>
            </form>
          </Box>
          <Box>
            <h2 className="smallTitle">O que deseja fazer?</h2>
            {/*Coloca no ciclo de vida do componente*/}
            <form onSubmit={function handleCreateCommunity(e){
              /*E = entrada padrão do submit*/
              e.preventDefault();
              /*transforma os dados do formulario*/
              const dadosDoForm = new FormData(e.target);
              /**/
              if (
                (dadosDoForm.get('title').length != 0) && 
                (dadosDoForm.get('image').length != 0) &&
                (dadosDoForm.get('url').length != 0) 
              ) {
                /*Criando um objeto com o capturado*/
                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                  url: dadosDoForm.get('url'),
                }
              
                /*
                console.log(dadosDoForm.get('title'));
                console.log(dadosDoForm.get('image'));
                */
                //console.log(e);
                const comunidadesTotais = [...comunidades, comunidade];
                setComunidades(comunidadesTotais);
            }

            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidadei?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Imagem de fundo da comunidade?"
                  name="image"
                  aria-label="Imagem de fundo da comunidadei?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Link para a comunidade?"
                  name="url"
                  aria-label="Link para a comunidadei?"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div class="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          {/*Comunidades*/}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0,6).map((valorAtual) => {
                return (
                  <li key={valorAtual.id}>
                    <a href={`${valorAtual.url}`} key={valorAtual.title}>
                      <img src={`${valorAtual.image}`} />
                      <span>{valorAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          {/*Pessoas favoritas*/}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavortias.length})
            </h2>
            <ul>
              {pessoasFavortias.slice(0,6).map((valorAtual) => {
                return (
                  <li key={valorAtual}>
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
