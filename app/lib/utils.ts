import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // 合併條件式 className，並處理 Tailwind 衝突。
  return twMerge(clsx(inputs));
}
