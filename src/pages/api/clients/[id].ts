import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {

  const clientId = params.id;

  return new Response(
    JSON.stringify({
      method: "GET",
      clientId: clientId,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export const PATCH: APIRoute = async ({ request, params }) => {

  const clientId = params.id ?? '';

  try {
  
      const { id, ...body } = await request.json();
  
      const results = await db.update(Clients).set(body).where( eq(Clients.id, +clientId) );
      const updatedClient = await db.select().from(Clients).where( eq(Clients.id, +clientId) );

      return new Response(
        JSON.stringify({
          method: "POST",
          updatedClient: updatedClient,
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
  
    } catch (error) {
  
      return new Response(
        JSON.stringify({
          msg: "Error creating client",
          error: error,
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
  
    }
}

export const DELETE: APIRoute = async ({ request, params }) => {

  const clientId = params.id ?? '';
  const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +clientId));

  if( rowsAffected > 0 ) {
    return new Response(
      JSON.stringify({
        method: "DELETE",
        msg: "Client deleted",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({
      method: "DELETE",
      msg: `Client with id ${clientId} not found`,
    }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
}