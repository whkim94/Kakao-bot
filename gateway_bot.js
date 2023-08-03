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

    if (room == "게이트웨") {
        var cmd = msg.split(" ");
        
        // 커맨드
        switch (cmd[0]) {  
            case "/커맨드":
                replier.reply(
                    "0. \"/주차 or /ㅈㅊ\": 현재 그라지 주차 상황\n" +
                    "1. \"/오안 or /ㅇㅇ\": 그라지에 주차하기\n" +
                    "2. \"/오밖 or /ㅇㅂ\": 밖에다 주차함을 알리기\n" +
                    "3. \"/ㅂㅂ\": 외출 알림. 안에 주차했을경우 ㅂㅂ 입력 부탁\n" +
                    "4. \"/리셋 or /ㄹㅅ\": 주차상황 리셋"
                );
                break;

            case "/주차":
                text = "현재 주차된 차량: " + parking + "/" + PARKING_LIMIT;
                if (parking == PARKING_LIMIT) {
                    text += "\n\n주차자리 없지롱~" ;
                }
                replier.reply(text);
                
                break;
            
            case "/ㅈㅊ":
                text = "현재 주차된 차량: " + parking + "/" + PARKING_LIMIT;
                if (parking == PARKING_LIMIT) {
                    text += "\n\n주차자리 없지롱~" ;
                }
                replier.reply(text);
                
                break;
        
            case "/오안":
                if (parking == PARKING_LIMIT) {
                    replier.reply(
                        "주차자리 꽉 찼으니까 밖에다 대라"
                    );
                } else {
                    parking += 1;
                    replier.reply(
                        "현재 주차 된/예정 차량: " + parking + "/" + PARKING_LIMIT
                    );
                }
                break;
            
            case "/ㅇㅇ":
                if (parking == PARKING_LIMIT) {
                    replier.reply(
                        "주차자리 꽉 찼으니까 밖에다 대라"
                    );
                } else {
                    parking += 1;
                    replier.reply(
                        "현재 주차 된/예정 차량: " + parking + "/" + PARKING_LIMIT
                    );
                }
                break;
        
            case "/오밖":
                replier.reply(
                    "그대의 배려에 감사를 전합니다..\n" + 
                    "현재 주차된 차량: " + parking + "/" + PARKING_LIMIT
                );
                break;
            
            case "/ㅇㅂ":
                replier.reply(
                    "그대의 배려에 감사를 전합니다..\n" + 
                    "현재 주차된 차량: " + parking + "/" + PARKING_LIMIT
                );
                break;
            
            case "/ㅂㅂ":
                if (parking > 0) {
                    parking -= 1;
                } 

                replier.reply(
                    "잘다녀와유~~\n" + 
                    "현재 주차된 차량: " + parking + "/" + PARKING_LIMIT
                );

                break;
            
            case "/리셋":
                parking = 0;
                replier.reply(
                    "현재 주차된 차량: " + parking + "/" + PARKING_LIMIT
                );
                break;
        
            case "/ㄹㅅ":
                parking = 0;
                replier.reply(
                    "현재 주차된 차량: " + parking + "/" + PARKING_LIMIT
                );
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