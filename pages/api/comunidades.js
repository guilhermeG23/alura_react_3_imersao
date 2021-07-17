import { SiteClient } from 'datocms-client';

/*
export async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '4b6e6083b21cebab31b6581ae68cf0';
        const client = new SiteClient(TOKEN);
        
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "975679", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/omariosouto.png",
            // creatorSlug: "omariosouto"
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}
*/

export default async function receberRequest(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '4b6e6083b21cebab31b6581ae68cf0';

        const client = new SiteClient(TOKEN);

        //await é esperar esposta 
        const registro = await client.items.create({
            itemType: "975679", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            //idData: "testeeee",
            //title: "testewwww1",
            //imageUrl : "testeste",
            //url: "testeeeeeeaaaa",
        })
        
        response.json({
            //dados: 'Algum dado',
            registro: registro,
        })
        return;
    } 

    response.status(404).json({
        message: "Nada de GET, mas o POST tem",
    })
}

/*
Evitar grandes quantidades de then
fetch('').then(async function(retorno) {
    const reposta = await retorno.json()
    console.log(respota)
})
*/

