export async function GET() {
    return new Response(JSON.stringify({ message: "Non disponible" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
    })
}
