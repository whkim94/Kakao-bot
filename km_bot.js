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
var reactionList = ["(쫑긋)", "(나 불렀나..?)", "(외면)", "(귀가 간지럽네..)", "(관심받아서 기쁨)"];


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    // 안읽은 메세지가 10개 넘어갈경우 읽음 처리
    if (count[room] == undefined) {
        count[room] = 0;
    }
    count[room]++;
    
    if (count[room] > 10) {
        replier.markAsRead();
        count[room] = 0;
    }

    // 하늘꿈 자체 도배 방지
    // if (preChat[room] == msg) return;
    // preChat[room] = msg;

    if (!isGroupChat) {
        replier.reply("1:1 대화기능은 아직 준비중이에요! 그룹톡에서 이용해주세요 ^^");
    }

    if ((room == "KM교사방") || (room == "iom_km") || (room == "김우현")) {
        
        var cmd = msg.split(" ");
        
        // 명령어
        switch (cmd[0]) {
            case "/명령어":
                replier.reply(
                    "\"/[명령어]\"를 입력해 주시면 됩니다! \n\n" +
                    "\"/소개\": 하늘꿈Bot 소개\n" +
                    "\"/새신자\": 새신자 링크 출력\n" + 
                    "\"/생일 [이름]\": 하늘꿈Bot의 생일축하를 받을수 있습니다\n\n" + 
                    // "고민상담: 익명으로 고민상담이 가능해요! 저와 1:1 대화를 통해 가지고 있는 고민을 얘기해주세요 :)" + 
                    "앞으로 계속 기능들이 추가될 예정입니다!"
                );

                if (room == "KM교사방") {
                    replier.reply(
                        "교사방 전용 \n\n" +
                        "\"/프로필\": 학생프로필 링크 출력"
                    );
                }
                break;
            
            case "/소개":
                replier.reply(
                    "안녕하세요! 저는 IOM KM에 소속된 하늘꿈이라고 해요(하하)\n\n" + 
                    "저는 특정 명령어 입력을 통해 행동을 수행하는 Bot이에요\n" + 
                    "\"/명령어\"를 입력하면 제가 뭘 할수있는지 볼수있어요\n\n" +
                    "얼바인 온누리 KM에 오신걸 환영합니다!"
                );
                break;

            case "/프로필":
                if (room == "KM교사방") {
                    replier.reply(
                        "학생 프로필 Google Excel Sheet\n\n" + 
                        "https://docs.google.com/spreadsheets/d/1PyIa0t7KKbFibJl5KQwftuybH8ywF7_qD9rbpp66qvo/htmlview"
                    );
                }
                break;

            case "/새신자":
                replier.reply(
                    "얼바인 온누리 KM에 오신것을 환영합니다!\n\n" + 
                    "아래 링크에서 간단한 정보를 입력해주세요 :)\n\n" + 
                    "https://docs.google.com/forms/d/e/1FAIpQLSevgZPq7Ckhz56eID0fCewEL8f_DFUUnO--XBsw225Xy0s3Tw/viewform"
                );
                break;
            
            case "/생일":
                if (cmd[1]) {
                    replier.reply(
                        "우리 " + cmd[1] + " 친구의 생일을 축하해요~!!\n" +
                        "오늘 하루 행복하고 은혜로운 하루가 되길 기도할게요~~!!!"
                    );
                } else {
                    replier.reply("누구의 생일인가요? (심각)");
                }

                break;
        }

        // 특정 단어에 대한 반응
        if (msg.includes("하늘꿈")) {
            var randomReaction = reactionList[Math.floor(Math.random()*reactionList.length)];
            replier.reply(randomReaction);
        }

        if (msg.includes("아멘")) {
            replier.reply("아멘~!!");
        }
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