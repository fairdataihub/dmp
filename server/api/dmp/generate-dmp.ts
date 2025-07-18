export async function query(payload: any) {
  try {
    const res = await fetch("http://localhost:5001/query", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!res.ok) {
      const text = await res.text();

      console.error("Flask API response:", text);
      throw new Error(`Server error: ${res.status} ${text}`);
    }

    const data = await res.json();

    console.log("Response from Flask API:", data);

    return data;
  } catch (err) {
    console.error("Query error:", err);
    throw err;
  }
}

// Main handler for the API route
export default defineEventHandler(async (event) => {
  const form = await readBody(event);

  const response = await query(form);

  return { response };
});
