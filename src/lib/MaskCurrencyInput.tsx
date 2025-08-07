'use client'

import { Input } from '@/components/ui/input';
import React from 'react';


interface MaskedCurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MaskedCurrencyInput: React.FC<MaskedCurrencyInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Remove tudo que não é número
    inputValue = inputValue.replace(/R\$\s?|[\.\-]/g, '').replace(/\D/g, '');

    // Formata o valor para $x,xx
    const formattedValue = inputValue
      ? '$' + (parseFloat(inputValue) / 100).toFixed(2).replace('.', ',')
      : '$0,00';

    onChange(formattedValue);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      className="col-span-3"
      placeholder="$0,00"
      required
    />
  );
};

export default MaskedCurrencyInput;