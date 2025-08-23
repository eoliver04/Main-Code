import { key } from "./keys.js";
import { listar } from "./keys.js";
export const list = async () => {
  try {
    const response = await fetch(listar, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.erro("error al listar elementos");
      return [];
    }
  } catch (err) {
    console.error("Error al llamar a la funcion:", err);
    return [];
  }
};
