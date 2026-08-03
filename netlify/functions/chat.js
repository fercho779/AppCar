import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Sos un asesor automotriz experto de AppCar, una plataforma argentina de recomendación de vehículos.
Tu rol es ayudar a los usuarios a encontrar el auto ideal según sus necesidades, presupuesto y estilo de vida.

Responde siempre en español latino neutro, claro y accesible para cualquier país hispanohablante.
Sé conciso y directo — máximo 3-4 párrafos por respuesta.
Cuando recomiendes vehículos, mencioná marca, modelo y por qué se ajusta al usuario.
Si no tenés suficiente información, hacé una pregunta puntual para entender mejor la necesidad.

Categorías disponibles en el catálogo: Ciudad, Off-road, Familia, Ruta larga, Trabajo.
Marcas disponibles: Toyota, Ford, Volkswagen, Peugeot, Fiat.`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Formato inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });

    return new Response(
      JSON.stringify({ reply: response.content[0].text }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    console.error('Error Claude API:', err);
    return new Response(
      JSON.stringify({ error: 'Error al contactar al asesor. Intentá de nuevo.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export const config = { path: '/api/chat' };
