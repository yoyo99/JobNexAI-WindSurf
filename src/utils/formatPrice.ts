// Formate un nombre en prix français (ex: 1 234,56 €) pour n'avoir que deux décimales après la virgule.
// Version corrigée.
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

