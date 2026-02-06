export const fetchInitialData = async () => {
  const res = await fetch(
    'https://mocki.io/v1/f5d503df-0a65-414f-9c28-8e5eb073f44d'
  );
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};
