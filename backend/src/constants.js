export const TOKEN_TYPE = {
  EMAIL : "EMAIL",
  SMS   : "SMS",
};

export const USER_PERMISSION = {
  ADMIN     : "ADMIN",
  MARKETING : "MARKETING",
  SALES     : "SALES",
  FINANCE   : "FINANCE"
};

export const USER_STATUS = {
  ACTIVE   : "ACTIVE",
  INACTIVE : "INACTIVE",
};

export const USER_SPEC = {
  _id         : true,
  firstName   : true,
  lastName    : true,
  email       : true,
  permissions : true,
  status      : true,
  createdAt   : true
};
