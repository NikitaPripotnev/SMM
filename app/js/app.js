const TelegramBot = require("node-telegram-bot-api");
const requestMain = require("request");
const token = "683367496:AAHN6uJmBtP3kLRmRYJznSkt4U1VDd_Dja4";
const phone2 = "+7 952 234-96-71";
const phone = "79522349671";
const fromDate = "2019-01-29T00:00:00+07:00";
const toDate = "2019-01-29T23:59:59+07:00";
const API_URL = "https://spb.tele2.ru/api/subscribers/"+phone;
const API_URL_PAYMENTS = API_URL+"/payments";
const API_URL_BALANCE = API_URL+"/balance";
const API_URL_PAYMENTS_DAYS = API_URL_PAYMENTS+"?fromDate="+encodeURIComponent(fromDate)+'&toDate='+encodeURIComponent(toDate);
const password = "546834";
const proxy = "http://54.37.131.15:8080/";

let status = false;
const request = requestMain.defaults({ proxy: proxy, jar: true });

//https://spb.tele2.ru/api/subscribers/79522349671/payments?fromDate=2019-01-01T00%3A00%3A00%2B07%3A00&toDate=2019-01-31T23%3A59%3A59%2B07%3A00
console.log(API_URL_PAYMENTS_DAYS);
const bot = new TelegramBot(token, {
  polling: true,
  request: {
    proxy: proxy
  }
});

function UpdateSert(html) {
  const sert = html.match(/value="(.*?)" name="_csrf"/i)[1];
  if (!sert) {
    throw new Exception("(-1) Не найден сертификат", 1); // смысла выполнять код нет, так как без сертификата API помашет ручкой
  }
  return sert;
}

function start(){
  return new Promise(function(resolved, rejected) {

  request(
    "https://login.tele2.ru/ssotele2/wap/auth?serviceId=681&returnUrl=https://spb.tele2.ru/api/auth/sso/successLogin",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {

        let sert = UpdateSert(body);
        const headers = {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
        };
        const options = {
          url: "https://login.tele2.ru/ssotele2/wap/auth/submitLoginAndPassword",
          method: "POST",
          headers: headers,
          form: {
            _csrf: sert,
            authBy: "BY_PASS",
            pNumber: phone2,
            password: password,
            rememberMe: "true"
          }
        };
        //API_URL
        request(options, function(error, response, body) {
          if (!error && response.statusCode == 302) {
            console.log("Success");
            console.log("ЭТО ПОСТ ЗАПРОС");
            resolved(true);
          } else {
            console.log("No(");
            rejected(new Error("Request failed"));
          }
        });
      }
      else{
        rejected(new Error("Request failed"));
      }
    });
  });
}

function getInfo(url){
  return new Promise(function(resolved, rejected) {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      resolved(JSON.parse(body));
    } else {
      console.log("No(");
      rejected(new Error("Request failed"));
    }
  });
});
}

bot.onText(/\/startuem/, (msg, match) => {
  const chatId = msg.chat.id;
  if(!status){
  bot.sendMessage(chatId, "Подожди пару секунд, бро, подключаюсь...");
  start().then(result => {
      status = true;
      bot.sendMessage(chatId, "Теперь можно идти дальше, бро)");
    },
    error => {
      bot.sendMessage(chatId, "Не получилось подключиться, бро(");
    }
  );
}
else{
  bot.sendMessage(chatId, "Все подключено уже, бро)");
}});

bot.onText(/\/balance/, (msg, match) => {
  const chatId = msg.chat.id;
  if(status){
    getInfo(API_URL_BALANCE).then(result => {
      bot.sendMessage(chatId, "Балик: "+ result.data.value);
    },
    error => {
      bot.sendMessage(chatId, "Не получилось узнать балик, бро(");
    });
  }
  else{
    bot.sendMessage(chatId, "Для начала подключись через /start, бро)");
  }
});

bot.onText(/\/payments/, (msg, match) => {
  const chatId = msg.chat.id;
  if(status){
    getInfo(API_URL_PAYMENTS_DAYS).then(result => {
      if(result){
        const messagePayments = result.data.map((elem)=>{
          return " "+elem.sum.amount+" "+elem.sum.currency+"\n";
        });
        bot.sendMessage(chatId, "Переводы:\n"+ messagePayments.slice(0,5));
      }

    },
    error => {
      bot.sendMessage(chatId, "Не получилось узнать переводы, бро(");
    });
  }
  else{
    bot.sendMessage(chatId, "Для начала подключись через /start, бро)");
  }
});

// $post = "_csrf={$sert}&pNumber={$Phone}&password={$Password}&rememberMe=true&submit=Вoйти&formid=password-form";
// curl_setopt($curl, CURLOPT_URL, 'https://login.tele2.ru/ssotele2/wap/auth/submitLoginAndPassword');
// curl_setopt($curl, CURLOPT_POSTFIELDS, $post);

// $html = curl_exec($curl);

//данные пользователя
//$URL = $API_URL.'profile';
//curl_setopt($curl, CURLOPT_URL, $URL);
//$html = curl_exec($curl);
//print_r($html);
//print(PHP_EOL);

// //платежи

// curl_setopt($curl, CURLOPT_URL, $URL);
// $html = curl_exec($curl);
// print_r($html);
// print(PHP_EOL);

// //баланс
// $URL = $API_URL.'balance';
// curl_setopt($curl, CURLOPT_URL, $URL);
// $html = curl_exec($curl);
// print_r($html);

bot.on("callback_query", query => {
  const id = query.message.chat.id;

  request(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
    function(error, response, body) {
      const data = JSON.parse(body);
      const result = data.filter(item => item.ccy === query.data)[0];
      const flag = {
        EUR: "🇪🇺",
        USD: "🇺🇸",
        RUR: "🇷🇺",
        UAH: "🇺🇦"
      };
      let md = `
      *${flag[result.ccy]} ${result.ccy} 💱 ${result.base_ccy} ${
        flag[result.base_ccy]
      }*
      Buy: _${result.buy}_
      Sale: _${result.sale}_
    `;
      bot.sendMessage(id, md, { parse_mode: "Markdown" });
    }
  );
});
