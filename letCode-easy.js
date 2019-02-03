//letcode中简单算法题的JavaScript解法记录  算法学习中...仅供记录，如有错误烦请指正。

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

/**
 13. 罗马数字转整数
 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

示例 1:

输入: "III"
输出: 3
示例 2:

输入: "IV"
输出: 4
示例 3:

输入: "IX"
输出: 9
示例 4:

输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
示例 5:

输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
*/
// 解法1：思路见注释（不作是否是罗马数字的判断等非法情况的处理）
var romanToInt = function(s) {
    const theRule={'I' :1, 'V': 5, 'X': 10, 'L':50, 'C':100, 'D': 500,'M':1000}
    let returnNumber=0;//转换之后的结果
    if(s.length==1) return theRule[s] //如果只有一位 直接返回对应数值
    for(let i=0;i<s.length-1;i++){
        if(theRule[s[i+1]]>theRule[s[i]]){
            //如果后一位对应的数字大于当前的，returnNumber = returnNumber+（后-前）；
            // 如果当前是倒数第三个字母，则还要再加上最后字母对应的数字
            //由于后一位与当前字母合计为一个数字，所以i++  跳过后一位，
            returnNumber+=(theRule[s[i+1]]-theRule[s[i]])+(i==s.length-3?theRule[s[i+2]]:0)
            i++
        }else{
            // 如果当前是倒数第二个字母，则还要再加上最后字母对应的数字
           returnNumber+=theRule[s[i]]+(i==s.length-2?theRule[s[i+1]]:0)
        }
    } 
    return returnNumber;
};

/**
 14.最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z 。

在不考虑容错的情况下
解法1：任取一个 传入的字符串数组成员，这里取下标为0的，由于公共前缀 最长的情况 就是一个完整的字符串，
    所以从下标0 开始 截取取此字符串，通过indexOf是否等于0 判断 是否是后续字符串的前缀，
    一旦不等于0，return 结束循环及函数
    如果循环结束还没有return 的话，表示数组成员都是相同的，返回下标为0的元素即可
 */
var longestCommonPrefix = function(strs) {
    if(strs.length==0||strs[0]=='') return '';
    if(strs.length==1) return strs[0];
    for(let i=1;i<=strs[0].length;i++){
        let pStr=strs[0].substr(0,i);
        for(let j=1;j<strs.length;j++){
            if(strs[j].length==0) return '';
            if(strs[j].indexOf(pStr)!=0){
                return strs[0].substr(0,Math.max(0,i-1))
            }
        } 
    }
    return strs[0]
};
    /**
     * 20.有效的括号
     * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

    有效字符串需满足：

    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    注意空字符串可被认为是有效字符串。

    示例 1:

    输入: "()"
    输出: true
    示例 2:

    输入: "()[]{}"
    输出: true
    示例 3:

    输入: "(]"
    输出: false
    示例 4:

    输入: "([)]"
    输出: false
    示例 5:

    输入: "{[]}"
    输出: true

    解法1：（本解法同letcode官方）
        1.针对集中特殊情况做处理，免除语法错误以及不必要的循环。
        2.从下标 0 开始 遍历传参 s ,
            如果碰到‘(’,'['.'{'，push进数组 arr 。
            如果碰到‘)’,']'.'}'，判断 是否和 arr 最后一位是同类型括号：
                是：删除 arr 最后一位。
                否：不是有效括号，return false 结束函数。
        2.遍历完后如果数组还有值，表示不是有效括号
    * 
    */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let arr=[];
    if(s=='') return true;
    if(s.length<2) return false;
    let sLength=s.length-1;
    if(s[0]==')'||s[0]==']'||s[0]=='}'||s[sLength]=='('||s[sLength]=='['||s[sLength]=='{') return false;
    for(let i=0;i<s.length;i++){
        if(s[i]=='('||s[i]=='['||s[i]=='{'){
            arr.push(s[i]);
        }else {
            switch(s[i])
            {
                case ')':if(arr[arr.length-1]=='('){
                    arr.pop();
                }  else{
                    return false
                };break;
                case ']':if(arr[arr.length-1]=='['){
                    arr.pop();
                }  else{
                    return false
                };break;
                case '}':if(arr[arr.length-1]=='{'){
                    arr.pop();
                }  else{
                    return false
                };break;
            }
        }
    }
    return arr.length===0?true:false; 
};