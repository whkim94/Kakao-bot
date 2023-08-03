const scriptName = "테스트봇";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

var count = {};
var preChat = {};
var parking = 0;
const PARKING_LIMIT = 2;

function getCoinMark(name) {
    var data = Utils.parse("https://api.upbit.com/v1/market/all").text();
    data = JSON.parse(data);
    for (var n = 0; n < data.length; n++) {
        if (data[n].market.startsWith("KRW-") && data[n].korean_name == name) return data[n].market;
    }
    return null;
};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    // 안읽은 메세지가 10개 넘어갈경우 읽음 처리
    // if (count[room] == undefined) {
    //     count[room] = 0;
    // }
    // count[room]++;
    
    // if (count[room] > 10) {
    //     replier.markAsRead();
    //     count[room] = 0;
    // }

    if (room == "김우현") {
        var cmd = msg.split(" ");
        
        // 커맨드
        switch (cmd[0]) {  
            case "/커맨드":
                replier.reply(
                    "0. \"/코인\": 현 코인시세\n"
                );
                break;
            
            case "/코인":
                var mark = getCoinMark(cmd[1]);
                if (mark == null) {
                    replier.reply(cmd[1] + "(이)라는 암호화폐를 찾을 수 없습니다.");
                } else {
                    var data = Utils.parse("https://api.upbit.com/v1/ticker?markets=" + mark).text();
                    data = JSON.parse(data);
                    replier.reply("현재 " + cmd[1] + " 시세는 " + data[0].trade_price + "원입니다.");
                }
                break;
            }

        // 특정 단어에 반응
    }
 
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Starting the KakaoBot");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}