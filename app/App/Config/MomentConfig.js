import moment from 'moment'

moment.updateLocale('pt-BR', {
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  calendar: {
    sameDay: '[Hoje às] LT',
    nextDay: '[Amanhã às] LT',
    lastDay: '[Ontem às] LT',
    lastWeek: '[Último(a)] dddd [às] LT',
    nextWeek: '[Próximo(a)] dddd [às] LT',
    sameElse: 'L [às] LT'
  },
  longDateFormat: {
    LT: 'HH:mm',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] LT',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LT'
  }
})
