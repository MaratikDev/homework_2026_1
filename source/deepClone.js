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

    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (visited.has(obj)) {
        return visited.get(obj);
    }

    if (Array.isArray(obj)) {
        const arrCopy = [];
        visited.set(obj, arrCopy);

        obj.forEach((item, index) => {
            arrCopy[index] = deepClone(item, visited);
        });
        
        return arrCopy;
    }
    
    const clonedObj = {};
    visited.set(obj, clonedObj); 
    
    Object.entries(obj).forEach(([key, value]) => {
        clonedObj[key] = deepClone(value, visited);
    });

    return clonedObj;
};