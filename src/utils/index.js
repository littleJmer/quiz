import { questions } from '../mocks';
import api from '../api';

/**
 * 
 * @param {*} arr 
 * @param {*} n 
 * 
 */
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

/**
 * 
 * @param {*} callback 
 */
function getQuestions(callback, numberOfCuestions) {

    // api().get('questions?n='+numberOfCuestions)
    //     .then((status, data) => {
    //         if (status === 200) {
    //             if (data.error) {
    //                 //
    //                 return;
    //             }
    //             callback(data);
    //         }
    //     })
    //     .catch(err => {
    //         //
    //     });

    // Simulate HTTP Request
    setTimeout(() => {
        callback(getRandom(questions, numberOfCuestions));
    }, 1500);

}

export {
    getRandom,
    getQuestions
}