import queryString from 'query-string';

export const convertQueryString = (obj) => {
  return queryString.stringify(obj, {
    skipNull: true,
    skipEmptyString: true
  })
};

export const parseJwt = (token) => {
  try {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null
  }
};

export const convertObjToQueryString = (queryObj) => {
  const queryArr = [];

  for (let i in queryObj) {
    if (queryObj[i]) {
      queryArr.push(`${i}=${queryObj[i]}`);
    }
  }

  return queryArr.join('&');
}

export const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;


/**
 * **************** VALIDATE FOR ANTD
 */
export const checkVNPhone = (rule, value) => {
  if (!value) {
    return Promise.reject();
  } else {
    if (isVNPhoneMobile.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject('Invalid phone number');
  }
};

export const checkSpecifiedRadius = (rule, value) => {
  // const pattern = /^\d+$/;
  const pattern = /^-?\d*\d+$/;
  if (!value) {
    return Promise.reject();
  } else {
    if (pattern.test(value)) {
      if (value <= 2147483647 && value >= -2147483648) {
        return Promise.resolve();
      }

      return Promise.reject('Please must be between -2147483648 and 2147483647');
    }

    return Promise.reject('Please must be a integer number');
  }
}

export const validateMessages = {
  required: 'Please input your ${label}',
  types: {
    email: 'The input is not valid ${label}'
  }
};

/**
 * 
 */

export const subMonthFromNow = (num_of_month) => {
  const options = [];

  for (let i = 0; i < num_of_month; i++) {
    let event = new Date();
    event.setMonth(event.getMonth() - i);
    options.push({
      label: (event.getMonth() + 1) + '/' + event.getFullYear(),
      value: event.toISOString()
    });
  }

  return options;
}

export const getFullTime = (d) => {
  if (!d) {
    return {
      date_time: null,
      date: null,
      time: null,
    };
  }

  const newDate = new Date(d);

  let year = newDate.getFullYear() + "";
  let month = newDate.getMonth() + 1 + "";
  let date = newDate.getDate() + "";
  let hour = newDate.getHours() + "";
  let min = newDate.getMinutes() + "";
  let sec = newDate.getSeconds() + "";

  if (month.length === 1) {
    month = "0" + month;
  }
  if (date.length === 1) {
    date = "0" + date;
  }
  if (hour.length === 1) {
    hour = "0" + hour;
  }
  if (min.length === 1) {
    min = "0" + min;
  }
  if (sec.length === 1) {
    sec = "0" + sec;
  }

  return {
    date_time: `${date}-${month}-${year} ${hour}:${min}:${sec}`,
    date: `${date}-${month}-${year}`,
    time: `${hour}:${min}:${sec}`,
    get_month_year: `${month}-${year}`,
  };
};