export async function getCurrentIP() {
  const result = await fetch("https://domains.google.com/checkip");

  if (!result.ok) {
    throw new Error("Failed to get current IP Address.");
  }

  return await result.text();
}

export function getElapsedTime(from: Date, to: Date) {
  return to.getTime() - from.getTime();
}

export async function updateDNS(
  hostName: string,
  userName: string,
  password: string,
  ip: string
) {
  const res = await fetch(
    `https://domains.google.com/nic/update?hostname=${hostName}&myip=${ip}`,
    {
      credentials: "include",
      headers: new Headers({
        Authorization: `Basic ${btoa(userName + ":" + password)}`,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update DNS for an unknown reason.");
  }

  const dnsResponse = await res.text();
  const [code, arg] = dnsResponse.split(" ");

  return { code, arg };
}
