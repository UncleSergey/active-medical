const response = await fetch("https://www.active-medical.pp.ua/?audit=doctor-portraits");
const html = await response.text();
const tags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
const doctors = tags.filter((tag) => /alina-mezinova|yuliia|pohulych|fedorov/i.test(tag));
console.log(JSON.stringify({
  status: response.status,
  count: doctors.length,
  doctors: doctors.map((tag) => ({
    alt: tag.match(/alt="([^"]*)"/i)?.[1] ?? "",
    src: tag.match(/src="([^"]*)"/i)?.[1] ?? "",
    loading: tag.match(/loading="([^"]*)"/i)?.[1] ?? null,
    decoding: tag.match(/decoding="([^"]*)"/i)?.[1] ?? null,
    fetchpriority: tag.match(/fetchpriority="([^"]*)"/i)?.[1] ?? null,
  })),
}, null, 2));
