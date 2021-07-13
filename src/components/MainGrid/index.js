import styled from 'styled-components'

const MainGrid = styled.main`
  /*display: grid;*/
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea {
      display: none;
      @media(min-width: 860px) {
          display:block;
      }
  }
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    /*grid-template-columns: 159px 618px 312px;*/ 
    grid-template-columns: 159px 1fr 312px; 
  }
`;

export default MainGrid;