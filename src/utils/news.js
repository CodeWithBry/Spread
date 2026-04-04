export function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return { label: 'just now', days };
  if (minutes < 60) return { label: `${minutes}m ago`, days };
  if (hours < 24) return { label: `${hours}h ago`, days };
  if (days < 7) return { label: `${days}d ago`, days };
  if (weeks < 4) return { label: `${weeks}w ago`, days };
  if (months < 12) return { label: `${months}mo ago`, days };
  return { label: `${years}y ago`, days };
}

export function filterBySearch(articles, query) {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q)
  );
}

export function toSearchSlug(input) {
  return input.trim().split(/\s+/).join('_');
}

export function processArticleData(rawData, existingWorldNews = []) {
  const isValid = (a) => a.urlToImage != null && a.description != null;

  const merged =
    existingWorldNews.length > 0
      ? [...existingWorldNews, ...rawData.worldNews.filter(isValid)]
      : rawData.worldNews.filter(isValid);

  const phFiltered = rawData.phNews
    ? rawData.phNews.filter(isValid)
    : [];

  const withIds = (list) => list.map((a) => ({ ...a, aid: crypto.randomUUID() }));

  return {
    worldNews: withIds(merged),
    phNews: withIds(phFiltered),
  };
}
