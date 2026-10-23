import { getCollection } from 'astro:content';

export async function GET() {
  const siteUrl = 'https://www.cricbreakdown.com';
  const articles = (await getCollection('articles')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const articleLines = articles.map((article) =>
    `- ${siteUrl}/articles/${article.id} — ${article.data.title}. ${article.data.description}`
  );

  const content = [
    '# CricBreakdown',
    '',
    '> Independent cricket analysis covering IPL, international cricket, statistics, team breakdowns, player trades, auctions and cricket history.',
    '',
    '## Key Pages',
    '',
    `- ${siteUrl}/articles — All published cricket analysis articles.`,
    `- ${siteUrl}/icc-mens-cricket-world-cup-2027-schedule — Interactive ICC Men\'s Cricket World Cup 2027 schedule and fixtures.`,
    `- ${siteUrl}/category/ipl — IPL analysis, auction strategy, player trades and team breakdowns.`,
    `- ${siteUrl}/category/international — International cricket analysis.`,
    `- ${siteUrl}/category/history — Cricket history and retrospectives.`,
    `- ${siteUrl}/category/stats — Statistical breakdowns.`,
    `- ${siteUrl}/about — About CricBreakdown.`,
    '',
    '## All Articles',
    '',
    ...articleLines,
    '',
    '## Editorial Note',
    '',
    'CricBreakdown publishes independent cricket analysis and is not affiliated with the BCCI, ICC, or any cricket franchise.',
    ''
  ].join('\\n');

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
