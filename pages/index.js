/*import styled from 'styled-components'*/
/*Não tem nada na frente do nome do diretorio por motivo que ele encaixa com o index por default*/
import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

//Cookies
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

/*Pessoas que seguem o github alvo*/
function ProfileRelationsFollowersBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h1 className="smallTitle">
        {props.title} ({props.items.length})
      </h1>
      <ul>
        {props.items.slice(0,6).map((valorAtual) => {
          return (
            <li key={valorAtual.id}>
              <a href={`${valorAtual.html_url}`} key={valorAtual.id}>
                <img src={`${valorAtual.avatar_url}`} />
                <span>{valorAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

/*
promessa de buscar um valor
Funcionamento de chuncks -> Partes de recebimento de informacao

fetch("https://api.github.com/users/guilhermeG23").then(function (retornoDados){
  console.log(retornoDados);
})

fetch("https://api.github.com/users/guilhermeG23").then(function (retornoDados){
    return retornoDados.json();
}).then(function (retornoConvertido){
    console.log(retornoConvertido);
})


fetch("https://api.github.com/users/guilhermeG231").then(function (retornoDados){
    return retornoDados.json();
}).then(function (retornoConvertido){
    console.log(retornoConvertido);
}).catch(function (error) {
    console.error(error);
})

O then envelopa uma promessa e faz a operação ser assincrona, necessitando seguir os passos para apresentar os resultados


fetch("https://api.github.com/users/guilhermeG231").then(function (retornoDados){
    if(retornoDados.ok) {    
      return retornoDados.json();
    }
    throw new Error('Conexão falhou :( ' + retornoDados.status)
}).then(function (retornoConvertido){
    console.log(retornoConvertido);
}).catch(function (error) {
    console.error(error);
})
*/

//Return só entende um componente, isso é, tudo tem que estar dentro de uma tag para ser interpretado pela parte que recebe o return
//Props é usado para compartilhando de informações entre os componentes
export default function Home(props) {
  console.log(props.githubUser);
  //Rookies -> Ganchos
  //const usuarioAleatorio = 'guilhermeG23';
  const usuarioAleatorio = props.githubUser;
  const pessoasFavortias = ['juunegreiros', 'omariosouto', 'peas', 'LINUXtips']  
  //Setar o primeiro estado
  const [comunidades, setComunidades] = React.useState([]);
  /*
  {
    idData: new Date().toISOString(), 
    title: "teste", 
    imageUrl:"https://images.sftcdn.net/images/t_app-cover-m,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg",
    url: "https://youtube.com/",
  }
  ]);
  */
  //console.log(comunidades.length);
  //const comunidades = ['']  

  //Só dar render depois de terminar a operacao e só fazer isso depois de processar a ação
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function () {
    //Seguidores do github
    const seguidores = fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`).then(function (recebimentoDaConexao){
      return recebimentoDaConexao.json();
    }).then(function (dadosConvertidos){
      setSeguidores(dadosConvertidos); 
    })

    //Dato CMS - API Gaph
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization' : '95c53c1490e23e05f0f2debbf29ca3',
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }, 
      body: JSON.stringify({"query": `query {
        allCommunities {
          iddata,
          title,
          imageurl,
          url
        }
      }`})
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      //console.log(comunidadesDato);
      setComunidades(comunidadesDato);
    })
  }, []);

  //console.log(seguidores);

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
                  iddata: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  imageurl: dadosDoForm.get('image'),
                  url: dadosDoForm.get('url'),
                }

                //Insert no datocms
                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.registro;
                  const comunidadesTotais = [...comunidades, comunidade];
                  setComunidades(comunidadesTotais);
                })
              
                /*
                console.log(dadosDoForm.get('title'));
                console.log(dadosDoForm.get('image'));
                */
                //console.log(e);

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
          {/*Pessoas do github*/}
          <ProfileRelationsFollowersBox title="Seguidores" items={seguidores} />
          {/*Comunidades*/}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0,6).map((valorAtual) => {
                return (
                  <li key={valorAtual.iddata}>
                    <a href={`${valorAtual.url}`} key={valorAtual.title}>
                      <img src={`${valorAtual.imageurl}`} />
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

//Só funciona do lado do server
//Pegar o token e carregar o usuario
export async function getServerSideProps(context) {
  //console.log('teste', nookies.get(context).USER_TOKEN);
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  //Autenticando o usuario via endpoint
  //Return true or false para o token
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  //Se não houver autenticacao do token, volta para o /login
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  //Depois de tudo, o token é colocando em uma variavel para o props
  console.log(jwt.decode(token));
  //Pega o nome de usuario -> Esta selecionando o mesmo nome de campo do token traduzido
  const { githubUser } = jwt.decode(token)

  //props podem ser recuperadas pelos componentes
  //O githubUser aqui não recebe nada por motivos que o campo é de mesmo nome aquele que carrega um valor
  return {
      props: {
          githubUser
      },
  }
}