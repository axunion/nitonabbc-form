/** クラス名を結合し、falsy な値を除外する */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
