import { SiteClient } from 'datocms-client'

export default async function requisidor(request, response) {

    if (request.method !== 'POST') {
        response.status(404).json({
            message: 'Ainda não temos nada no GET, mas no POST tem!!!'
        });
        return;
    }

    const TOKEN = '30c0d3f3ede50c0d87b98037920f6e';

    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
        itemType: "971869",
        ...request.body
    });

    response.json({registroCriado: registroCriado});
};

