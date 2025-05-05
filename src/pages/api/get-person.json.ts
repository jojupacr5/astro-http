import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {

  const person = {
    name: "Joseph Paucar",
    age: 33,
  }

  return new Response(
    JSON.stringify(person),
    { 
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    }
  );
}