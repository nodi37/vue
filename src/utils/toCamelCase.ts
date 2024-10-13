import _ from "lodash";

const objKeysToCamelCase: any = (obj: Object) => {
  if (!_.isObject(obj)) {
    return obj;
  } else if (_.isArray(obj)) {
    return obj.map((v) => objKeysToCamelCase(v));
  }
  return _.reduce(
    obj,
    (r, v, k) => {
      return {
        ...r,
        [_.camelCase(k)]: objKeysToCamelCase(v),
      };
    },
    {}
  );
};

export { objKeysToCamelCase };
