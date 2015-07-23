/*
The function takes a 16 byte input and gives a 16 byte output. It uses multiplication (*), bit-wise exclusive OR (XOR) and modulo (%) to calculate an element of the digest based on elements of the input message: 

digest [i] = ( (129 * message[i]) XOR message[i-1]) % 256

For the first element, the value of message[-1] is 0.

For example, if message[0] - 1 and message[1] = 129, then:
For digest[0]:
129*message[0] = 129
129 XOR message[-1] = 129
129 % 256 = 129
Thus digest[0] = 129.

For digest[1]:
129*message[1] = 16641
16641 XOR message[0] = 16640
16640 % 256 = 0
Thus digest[1] = 0.

Write a function answer(digest) that takes an array of 16 integers and returns another array of 16 that correspond to the unique message that created this digest. Since each value is a single byte, the values are 0 to 255 for both message and digest.

Languages
=========

To provide a Python solution, edit solution.py
To provide a Java solution, edit solution.java

Test cases
==========

Inputs:
    (int list) digest = [0, 129, 3, 129, 7, 129, 3, 129, 15, 129, 3, 129, 7, 129, 3, 129]
Output:
    (int list) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

Inputs:
    (int list) digest = [0, 129, 5, 141, 25, 137, 61, 149, 113, 145, 53, 157, 233, 185, 109, 165]
Output:
    (int list) [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225]

Use verify [file] to test your solution and see how it does. When you are finished editing your code, use submit [file] to submit your answer. If your solution passes the test cases, it will be removed from your home folder.

*/

function hashMessage(message) {
	var digits = [];
	var prevMessage = 0;
	for(var i = 0; i < message.length; i++) {
		digits[i] = ((129 * message[i]) ^ prevMessage) % 256;
		prevMessage = message[i];
	}
	return digits;
}
function reverseHash(digits) {
	var message = [];
	var prevMessage = 0;
	for(var i = 0; i < 16; i++){
		message[i] = digits[i] ^ prevMessage;
		if(message[i] % 2 == 1) {
			if(digits[i] > 128) { 
				if(prevMessage > 128) {
					//129 * message[i] % 256 < 128
					//message[i] > 128
					message[i] += 128;
					
				} else {
					//129 * message[i] % 256 > 128
					//message[i] < 128
					message[i] -= 128;
				}
			} else {
				if(prevMessage < 128) {
					// 129 * message[i] % 256  < 128
					//message[i] > 128
					//should not run into here...
					message[i] += 128;
				} else {
					// 129 * message[i] % 256  > 128
					//message[i] < 128
					message[i] -= 128;
				}
			}
			message[i] = (message[i] + 256) % 256;
		}
		prevMessage = message[i];
	}
	return message;
}



var digits1 = [0, 129, 3, 129, 7, 129, 3, 129, 15, 129, 3, 129, 7, 129, 3, 129];

var message2 =[0,  1,  4,  9,  16, 25,  36, 49,  64,  81,  100, 121, 144, 169, 196, 225];
var digits2 = [0, 129, 5, 141, 25, 137, 61, 149, 113, 145, 53,  157, 233, 185, 109, 165];

//var a2 =      [0, 4, 6, 7, 8, 2, 5, 6, 7, 8, 5, 7, 45, 63, 14, 87];
var a2 = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];
//var a2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
console.log(reverseHash(digits2));
var hashDigits = hashMessage(a2);
console.log(hashDigits);
console.log(reverseHash(hashDigits));




