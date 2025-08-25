import { key } from "./keys.js";
import { listar } from "./keys.js";
export const list = async (userId) => {
  try {
    
    const response = await fetch(`${listar}?userId${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("error al listar elementos");
      return [];
    }
  } catch (err) {
    console.error("Error al llamar a la funcion:", err);
    return [];
  }
};
