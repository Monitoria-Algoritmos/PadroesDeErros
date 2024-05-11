import Data from "../challenges.json";

export async function GET() {
  return new Response(JSON.stringify(Data), {
    headers: { "Content-Type": "application/json" },
  });
}
