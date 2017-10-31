
const testUser = [{
    id:1,name:"李金珂"
}]
//模拟家庭数据
const testFamily = [
    {id:1,sex:"男",age:18,father: "李大哥",mother: "李大姐"},
    {id:2,sex:"女",age:28,father: "赵日天",mother: "叶良辰"}
]
const resolvers = {
    Query:{
        user(root,params){
            console.log('user',root,params);
            return testUser
        }
    },
    User:{
        family(user){
            console.log('family',user);
            return testFamily
        }
    },
    // Family:{
    //     user(family){
    //         console.log('user',family);
    //         return testUser
    //     }
    // }
}

module.exports = resolvers