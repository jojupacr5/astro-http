import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {

  // Select all clients from the database
  const users = await db.select().from(Clients);

  return new Response(
    JSON.stringify({
      method: "GET",
      users: users,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export const POST: APIRoute = async ({ request }) => {
  
  try {

    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    return new Response(
      JSON.stringify({
        method: "POST",
        id: +lastInsertRowid!.toString(),
        ...body,
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