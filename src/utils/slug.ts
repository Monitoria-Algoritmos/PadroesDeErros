export default function stringToSlug(texto: string) {
  return texto
    .toLowerCase() // converter para minúsculas
    .normalize("NFD") // normalizar caracteres com acentos
    .replace(/[\u0300-\u036f]/g, "") // remover acentos
    .replace(/[^\w\s-]/g, "") // remover caracteres especiais exceto hífens e espaços
    .replace(/\s+/g, "-") // substituir espaços por hífens
    .replace(/^-+|-+$/g, ""); // remover hífens no início e no final
}
