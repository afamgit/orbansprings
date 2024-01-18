export const formatCurrency = (amount: number) => {
  if(amount === 0) {
    return 'NGN - - -'
  }
  return (amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'NGN',
  });
};

export const formatAmount = (amount: number) => {
  if (amount > 0) {
    const formatter = Intl.NumberFormat("en");
    return `${formatter.format(amount)}.00`;
  } else {
    return `-`;
  }
};

export const monthsMap = [
  {"name":"January", "abbr": "01"},
  {"name":"February", "abbr": "02"},
  {"name":"March", "abbr": "03"},
  {"name":"April", "abbr": "04"},
  {"name":"May", "abbr": "05"},
  {"name":"June", "abbr": "06"},
  {"name":"July", "abbr": "07"},
  {"name":"August", "abbr": "08"},
  {"name":"September", "abbr": "09"},
  {"name":"October", "abbr": "10"},
  {"name":"November", "abbr": "11"},
  {"name":"December", "abbr": "12"},
];

export const weeksMap = [
  {"name":"1", "date": ["01-01", "01-07"]},
  {"name":"2", "date": ["01-08", "01-14"]},
  {"name":"3", "date": ["01-15", "01-21"]},
  {"name":"4", "date": ["01-22", "01-28"]},
  {"name":"5", "date": ["01-29", "02-04"]},
  {"name":"6", "date": ["02-05", "02-11"]},
  {"name":"7", "date": ["02-12", "02-18"]},
  {"name":"8", "date": ["02-19", "02-25"]},
  {"name":"9", "date": ["02-26", "03-03"]},
  {"name":"10", "date": ["03-04", "03-10"]},
  {"name":"11", "date": ["03-11", "03-17"]},
  {"name":"12", "date": ["03-18", "03-24"]},
  {"name":"13", "date": ["03-25", "03-31"]},
  {"name":"14", "date": ["04-01", "03-07"]},
  {"name":"15", "date": ["04-08", "04-14"]},
  {"name":"16", "date": ["04-15", "04-21"]},
  {"name":"17", "date": ["04-22", "04-28"]},
  {"name":"18", "date": ["04-29", "05-06"]},
  {"name":"19", "date": ["05-07", "05-13"]},
  {"name":"20", "date": ["05-14", "05-20"]},
  {"name":"21", "date": ["05-21", "05-27"]},
  {"name":"22", "date": ["05-28", "06-03"]},
  {"name":"23", "date": ["06-04", "06-10"]},
  {"name":"24", "date": ["06-11", "06-17"]},
  {"name":"25", "date": ["06-18", "06-24"]},
  {"name":"26", "date": ["06-25", "07-01"]},
  {"name":"27", "date": ["07-02", "07-08"]},
  {"name":"28", "date": ["07-09", "07-15"]},
  {"name":"29", "date": ["07-16", "07-22"]},
  {"name":"30", "date": ["07-23", "07-29"]},
  {"name":"31", "date": ["07-30", "08-05"]},
  {"name":"32", "date": ["08-06", "08-12"]},
  {"name":"33", "date": ["08-13", "08-19"]},
  {"name":"34", "date": ["08-20", "08-26"]},
  {"name":"35", "date": ["08-27", "09-02"]},
  {"name":"36", "date": ["09-03", "09-09"]},
  {"name":"37", "date": ["09-10", "09-16"]},
  {"name":"38", "date": ["09-17", "09-23"]},
  {"name":"39", "date": ["09-24", "09-30"]},
  {"name":"40", "date": ["10-01", "10-07"]},
  {"name":"41", "date": ["10-08", "10-14"]},
  {"name":"42", "date": ["10-15", "10-21"]},
  {"name":"43", "date": ["10-22", "10-28"]},
  {"name":"44", "date": ["10-29", "11-04"]},
  {"name":"45", "date": ["11-05", "11-11"]},
  {"name":"46", "date": ["11-12", "11-18"]},
  {"name":"47", "date": ["11-19", "11-25"]},
  {"name":"48", "date": ["11-26", "12-02"]},
  {"name":"49", "date": ["12-03", "12-09"]},
  {"name":"50", "date": ["12-10", "12-16"]},
  {"name":"51", "date": ["12-17", "12-23"]},
  {"name":"52", "date": ["12-24", "12-30"]},
  {"name":"53", "date": ["12-31", "12-31"]},
];

export const getMonthsFromMap = (month: string) => {
  const themonth = monthsMap.filter((item) => item.name  === month)
    return themonth[0]['abbr']

}

export const getMonthsFromWeekMap = (week: string) => {
  const thedate = weeksMap.filter((item) => item.name  === week)
    return thedate[0]['date']
}


export const incrementNumber = (num: string) => {
  const newnum = parseInt(num)
  if(newnum < 10) {
    return `0${newnum + 1}`
  }
  return `${newnum + 1}`
}

export const createArrayOfNumber = (start:number, end:number) => {
  let myArray = [];
  for (let i = start; i <= end; i++) {
    myArray.push(JSON.stringify(i));
  }
  return myArray;
};

export function addOneYear(date: any) {
  date.setFullYear(date.getFullYear() + 1);
  return date;
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
