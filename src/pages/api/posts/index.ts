import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;


export const GET: APIRoute = async ({ params, request }) => {

  const posts = await getCollection("blog");
  console.log(request)

  return new Response(
    JSON.stringify(posts),
    { 
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      }
    }
  );
}