const input = require("readline-sync");
const axios = require("axios");
const url = "http://localhost:3000/posts"; // is url me data push kar rahe hai
const fatchUrl = "https://api.github.com/users"; // is url se data nikal rahe hai
console.log("\nPress 1. For Create\nPress 2. For Read\nPress 3. For Update\nPress 4. For Delete\nPress 5. For Breack\n");
const cheak_id=()=>{
    const number=input.questionInt('Please enter your User-id => ');
    if(Number.isSafeInteger(number)){
        return number;
    }else{
        console.log('\nYour id is not right\nPlease enter your right id\n');
        return cheak_id();
    };
};
const Creat = async (d) => {
  const dic = {};
  try {
    const Data = await axios.get(d);
    const info1 = Data.data;
    for (let i of info1) {
        dic.login = i.login;
        dic.id = i.id;
        dic.html_url = i.html_url;
        dic.subscriptions_url = i.subscriptions_url;
        await axios.post(url, dic);
    }
  } catch (err) {
    console.log(err.message, ".......>");
  }
};
const read = async (url) =>{
    try {
        console.log(`\nPress 1. For Read all Data\nPress 2. For Read ID Data\n`);
        const choice = input.questionInt('Please enter your Choice => ');
        if( choice === 1 ){
            const Data = await axios.get(url);
            const info = Data.data;
            console.log(info);
        }else if( choice === 2 ){
            const id = cheak_id();
            const Data = await axios.get(url+'/'+id)
            const info = Data.data;
            console.log(`Your ID Data`,info);
        }
    } catch (error) {
        console.log(error.message);
    }
}
const Update = async () =>{
    try {
        const id = cheak_id();
        const Data = await axios.get(url+'/'+id);
        const info = Data.data
        console.log(info);
        console.log('\nPress 1. For full id data updated\nPress 2. For singal data updated\nPress 3. For Break\n');
        const choice2 = input.questionInt('Please enter your Choice => ');
        if( choice2 === 1 ){
            const login = input.question('Please enter your new login => ');
            const html_url = input.question('Please enter your new html_url => ');
            const subscriptions_url = input.question('Please enter your new  subscription_urls => ');
            await axios.patch(url+'/'+id,{'login':login,'id':id,'html_url':html_url,'subscriptions_url':subscriptions_url});
            console.log('Your login Updated successfully.......',"👍");
        }else if( choice2 === 2 ){
            console.log('\nPress 1. For Update login\nPress 2. For Update html_url\nPress 3. For Update subscriptions_url\nPress 4. For Break\n');
            const choice = input.questionInt('Please enter your Choice => ');
            if( choice === 1 ){
                const login = input.question('Please enter your new login => ');
                await axios.patch(url+'/'+id,{'login':login});
                console.log('Your login Updated successfully.......',"👍");
            }else if( choice === 2 ){
                const html_url = input.question('Please enter your new html_url => ');
                await axios.patch(url+'/'+id,{'html_url':html_url});
                console.log('Your html_url Updated successfully.......',"👍");
            }else if( choice === 3 ){
                const subscription_urls = input.question('Please enter your new  subscription_urls => ');
                await axios.patch(url+'/'+id,{'subscriptions_url':subscription_urls});
                console.log('Your  subscription_urls Updated successfully.......',"👍");
            }else if( choice === 4 ){
                console.log('Your program stoped ;');
                process.exit();
            }
        }else if( choice2 === 3 ){
            process.exit()
        }
    } catch (error) {
        console.log(error.message);
    }
} 
const delete1 = async () =>{
    try {
        const id = cheak_id();
        const Data = await axios.delete(url+'/'+id)
        console.log('Your id data deleted ');
    } catch (error) {
        console.log(error.message);
    }
}
const Choice = input.questionInt("Please enter your Choice => ");
if (Choice === 1) {
  Creat(fatchUrl);
} else if (Choice === 2) {
  read(url);
}else if (Choice === 3){
    Update();
}else if ( Choice === 4){
    delete1();
}else if (Choice === 5){
    console.log('Your program stoped ;');
    process.exit();
}
