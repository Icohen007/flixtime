export default function unavailableProps(ctx) {
  ctx.res.statusCode = 503;
  ctx.res.setHeader('Cache-Control', 'no-store');
  return { props: { tmdbUnavailable: true } };
}
