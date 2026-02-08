/**
 * Создает глубокую копию объекта/массива/примитива
 * @param {*} obj - объект/массив/примитив для копирования
 * @param {WeakMap} [visited] - внутренний параметр для отслеживания посещенных обьектов (чтоб циклические ссылки не ломали функцию)
 * @example
 * //returns {a: 1, b: {c: 2}}
 * deepClone({a: 1, b: {c: 2}})
 * 
 * @example
 * //returns [1, 2, 3]
 * deepClone([1, 2, 3])
 * 
 * @example
 * returns 5
 * deepClone(5)
 * 
 * @returns {*} копия объекта/массива/примитива
 */


const deepClone = (obj, visited = new WeakMap()) => {

    if (typeof obj !== 'object') return obj;

    if (visited.has(obj)) {
        return visited.get(obj);
    }

    if (obj instanceof Array) {
        const arrCopy = [];
        visited.set(obj, arrCopy); 
        return obj.map(item => deepClone(item, visited));
    }
    
    const clonedObj = {};
    visited.set(obj, clonedObj); 
    
    for (const key in obj) {
        if (Object.hasOwn(obj, key)) {
            clonedObj[key] = deepClone(obj[key], visited);
        }
    }
    return clonedObj;
};