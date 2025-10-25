export function formatPhoneUK(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits.replace(/(\d{5})(\d{3})(\d{3})/, "$1 $2 $3");
}

export function toTitleCase(value: string): string {
  return value.replace(
    /\w\S*/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
  );
}

export function truncate(value: string, max = 80): string {
  if (value.length <= max) return value;
  return value.slice(0, max - 1) + "…";
}
