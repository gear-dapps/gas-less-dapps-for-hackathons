import path from 'path';

import config from '../config';

export async function gearBackendReq(endpoint: string, data: any) {
  const url = path.join(config.gearBackend.address, endpoint);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status === 200) {
    const json = await res.json();
    return json;
  } else {
    console.error(res.status);
    console.error(await res.text());
    throw new Error(res.statusText);
  }
}
