export function generateId(length?: number) {
  const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(length || 4)
    .join()
    .split(",")
    .map(function () {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join("");
}
