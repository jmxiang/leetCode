//letcode中简单算法题的JavaScript解法记录  算法学习中...仅供记录

//1、两数之和
/*
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

*/
//解法1  两层循环  
var twoSum = function(nums, target) {
    for(let i=0;i<nums.length-1;i++){
    	 for(let j=i+1;j<nums.length;j++){
    		if(nums[i]+nums[j]==target){
    			return [i,j]
    		}
    }
    }
};
//解法2  es6+拓展方法(并不是优化解法)
var twoSum = function(nums, target) {
    for(let [index, n] of nums.entries()){
        let otherIndex=nums.findIndex(function(value,index2,arr){
        	return value==target-n&&index2!=index;
        })
        if(otherIndex>0&&otherIndex!=index){
        	return [index,otherIndex]
        }

    }
};

//7、整数反转
/*
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321
 示例 2:

输入: -123
输出: -321
示例 3:

输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。 */
/*
解法1：转为字符串，从个位开始添加到空字符串末尾。判断给定整数正负，决定结束的索引。为正的话从索引0结束。为负的话首先给字符串加上“-”号，从索引1结束
*/
var reverse = function(x) {
    if(x>-10&&x<10) return(x)
    let num="";
    const max=x.toString();
    let i=max.length;
    let min=0;
    if(x<0) {
    	min=1;
    	num+='-'
    }
    while(i>min){
        num+=max[--i];
    }
    return (Number(num)>Math.pow(2,31) ||Number(num)<-Math.pow(2,31) )?0:(Number(num))
};

//9、回文数
/*
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

输入: 121
输出: true
示例 2:

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
示例 3:

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
进阶:

你能不将整数转为字符串来解决这个问题吗？

解法1：不将整数转为字符串的情况，定义一个用来存反转后的数字的变量newNum，初试为0,将目标数字num取余10，即得到目标数字的个位，newNum=newNum*10+目标数字的个位,再把目标数字除以10向下取整得到新的目标数字。循环到新目标数字为0.
*/
var isPalindrome = function(x) {
    if(x<0) return false;
    let [newNum,oldNum]=[0,x];
    while(x!=0){
    	newNum=newNum*10+(x%10);
    	x=Math.floor(x/10);
    }
    return newNum==oldNum?true:false
};