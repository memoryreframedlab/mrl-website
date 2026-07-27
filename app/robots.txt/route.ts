export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://memoryreframedlab.com/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
