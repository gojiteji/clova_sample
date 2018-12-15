const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');

const clovaSkillHandler = clova.Client
    .configureSkill()

    //起動時に喋る
    .onLaunchRequest(responseHelper => {
        responseHelper.setSimpleSpeech({
            lang: 'ja',
            type: 'PlainText',
            value: 'こちら、ファインペイ銀行です。',
        });
    })

    //ユーザーからの発話が来たら反応する箇所
    .onIntentRequest(async responseHelper => {
        const intent = responseHelper.getIntentName();
        const sessionId = responseHelper.getSessionId();
        console.log('Intent:' + intent);
        if(intent === 'CheckBalanceIntend'){
            const slots = responseHelper.getSlots();
            console.log(slots);
            //デフォルトのスピーチ内容を記載 - 該当スロットがない場合をデフォルト設定
            let speech = {
                lang: 'ja',
                type: 'PlainText',
                value: `わたくしの　辞書には存在しない命令ですね・・・。`
            }
            if(slots.area === '残高'){
                speech.value = /*${slots.area}*/`残高は`+balance+'ポイントです';
            }else if(slots.area === '何ポイント'){
                speech.value = /*${slots.area}*/`あと`+balance+'ポイント使えます';
            }else if(slots.area === '100ポイント'){
                speech.value = `${slots.area}使いました。残りは`+balance+`ポイントです`;
            }else if(slots.area === '200ポイント'){
                speech.value = `${slots.area}使いました。残りは`+balance+`ポイントです`;
            }else if(slots.area === '300ポイント'){
                speech.value = `${slots.area}使いました。残りは`+balance+`ポイントです`;
            }else if(slots.area === '400ポイント'){
                speech.value = `${slots.area}使いました。残りは`+balance+`ポイントです`;
            }else if(slots.area === '500ポイント'){
                speech.value = `${slots.area}使いました。残りは`+balance+`ポイントです`;
            
            }else if(slots.area === ''){
                speech.value = `ええっと。ごめんなさい、不器用なもので。`;
            }
            
            responseHelper.setSimpleSpeech(speech);
            responseHelper.setSimpleSpeech(speech, true);
        }
    })

    //終了時
    .onSessionEndedRequest(responseHelper => {
        const sessionId = responseHelper.getSessionId();
    })
    .handle();


const app = new express();
const port = process.env.PORT || 3000;

//リクエストの検証を行う場合。環境変数APPLICATION_ID(値はClova Developer Center上で入力したExtension ID)が必須
const clovaMiddleware = clova.Middleware({applicationId: 'com.family.finepay'});
app.post('/clova', clovaMiddleware, clovaSkillHandler);

app.listen(port, () => console.log(`Server running on ${port}`));