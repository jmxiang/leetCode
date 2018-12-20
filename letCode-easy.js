//letcode中简单算法题的JavaScript解法记录  算法学习中...仅供记录

//一、两数之和
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