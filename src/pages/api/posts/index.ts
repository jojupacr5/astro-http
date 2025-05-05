import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (slug) {
    const post = await getEntry("blog", slug);
    if (!post) {
      return new Response(
        JSON.stringify({ error: "Post not found" }),
        { 
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          }
        }
      );
    }

    return new Response(
      JSON.stringify(post),
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

  const posts = await getCollection("blog");

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