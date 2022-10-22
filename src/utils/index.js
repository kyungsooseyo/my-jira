import { useEffect, useState } from "react";

//~ 在一个函数里 改变传入的的对象本身是不好的
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const isFalsy = (value) => (value === 0 ? false : !value);
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
export const useDebounce = (value, delay) => {
  //? 好像会多次执行呢
  console.log("vv", value);
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // ~ 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // ~ 每次在上一个useEffect处理完以后再运行
    return () => {
      console.log("clear");
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
};
/**
 *降频函数
 *这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
 *调用:	debounce(function() {}, 250)
 * @param {*} func回调函数
 * @param {*} wait等待时间,推荐250
 * @param {*} immediate
 * @returns
 */
export const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
