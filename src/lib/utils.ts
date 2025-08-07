import { AllPoolsProps } from "@/interfaces/interfaces"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

interface finalPnLProps {
  pool: AllPoolsProps
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function finalPnL({ pool }: finalPnLProps) {

  const pnl = parseFloat(pool.fees.replace(/\$\s?|/g, '').replace(',', '.'))
    + ((parseFloat(pool.endValue.replace(/\$\s?|/g, '').replace(',', '.')) -
      parseFloat(pool.startValue.replace(/\$\s?|/g, '').replace(',', '.'))))

  return pnl
}

export function poolYield({ pool }: finalPnLProps) {

  const profit = (parseFloat(pool.fees.replace(/\$\s?|/g, '').replace(',', '.')) /
    parseFloat(pool.startValue.replace(/\$\s?|/g, '').replace(',', '.'))) * 100

  return profit
}