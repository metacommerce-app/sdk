export const isNullOrEmpty = (maybeString?: string | number) => {
  return maybeString === null || maybeString === undefined || maybeString === "";
};

export const isNullOrEmptyObject = (maybeObject?: object) => {
  return maybeObject === null || maybeObject === undefined || Object.keys(maybeObject).length === 0;
};
