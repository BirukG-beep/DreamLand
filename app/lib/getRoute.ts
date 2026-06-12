export async function getRoute(
  start: [number, number],
  end: [number, number]
) {
  const res = await fetch("/api/getRoutes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinates: [
        [start[1], start[0]],
        [end[1], end[0]],
      ],
    }),
  });

  if (!res.ok) throw new Error("Route failed");

  return res.json();
}