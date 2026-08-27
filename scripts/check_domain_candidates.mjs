const candidates = [
  "active-denta.pp.ua",
  "activedenta.pp.ua",
  "denta-active.pp.ua",
  "active-medical-denta.pp.ua",
];

for (const domain of candidates) {
  const url = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`;
  try {
    const response = await fetch(url, { headers: { accept: "application/dns-json" } });
    const data = await response.json();
    const answers = Array.isArray(data.Answer) ? data.Answer.map((answer) => answer.data) : [];
    console.log(JSON.stringify({ domain, httpStatus: response.status, status: data.Status, answers }));
  } catch (error) {
    console.log(JSON.stringify({ domain, error: String(error) }));
  }
}
