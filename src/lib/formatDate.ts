export const formatDatePTBR = (date: Date, locale = 'pt-BR') => {
  return new Intl.DateTimeFormat(locale).format(date)
}

export const getDaysActive = (startDate: string) => {
  const date = new Date()
  const dateBR = formatDatePTBR(date)

  const start: any = new Date(startDate?.split('/').reverse().join('-'));
  const end: any = new Date(dateBR?.split('/').reverse().join('-'));

  const difference = end - start
  const days = (difference / (1000 * 60 * 60 * 24));

  return days;
}

export const getDaysActiveDisablePool = (startDate: string, endDate: string) => {

  const start: any = new Date(startDate?.split('/').reverse().join('-'));
  const end: any = new Date(endDate?.split('/').reverse().join('-'));

  const difference = end - start
  const days = (difference / (1000 * 60 * 60 * 24));

  return days;
}