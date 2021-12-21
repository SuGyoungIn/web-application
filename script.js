let currentPlaying; // 현재 재생되고 있는 리스트 아이템의 index
let currentAudio; // 현재 재생되는 있는 리스트 아이템의 audio 태그

let a = 0

$(function () {
    songlist('daily')
})

function songlist(_mood) {
    $("#music_list").empty();
    // ===== List 생성하기 =====
    addItem('./' + _mood + '/title/1.txt', './' + _mood + '/artist/1.txt', './' + _mood + '/img/1.jpg', './' + _mood + '/musics/1.mp3', './' + _mood + '/song_info/1.txt', './' + _mood + '/lyrics/1.txt', './' + _mood + '/artist_info/1.txt');
    addItem('./' + _mood + '/title/2.txt', './' + _mood + '/artist/2.txt', './' + _mood + '/img/2.jpg', './' + _mood + '/musics/2.mp3', './' + _mood + '/song_info/2.txt', './' + _mood + '/lyrics/2.txt', './' + _mood + '/artist_info/2.txt');
    addItem('./' + _mood + '/title/3.txt', './' + _mood + '/artist/3.txt', './' + _mood + '/img/3.jpg', './' + _mood + '/musics/3.mp3', './' + _mood + '/song_info/3.txt', './' + _mood + '/lyrics/3.txt', './' + _mood + '/artist_info/3.txt');
    addItem('./' + _mood + '/title/4.txt', './' + _mood + '/artist/4.txt', './' + _mood + '/img/4.jpg', './' + _mood + '/musics/4.mp3', './' + _mood + '/song_info/4.txt', './' + _mood + '/lyrics/4.txt', './' + _mood + '/artist_info/4.txt');
    addItem('./' + _mood + '/title/5.txt', './' + _mood + '/artist/5.txt', './' + _mood + '/img/5.jpg', './' + _mood + '/musics/5.mp3', '../' + _mood + '/song_info/5.txt', './' + _mood + '/lyrics/5.txt', './' + _mood + '/artist_info/5.txt');
    addItem('./' + _mood + '/title/6.txt', './' + _mood + '/artist/6.txt', './' + _mood + '/img/6.jpg', './' + _mood + '/musics/6.mp3', './' + _mood + '/song_info/6.txt', './' + _mood + '/lyrics/6.txt', './' + _mood + '/artist_info/6.txt');
    addItem('./' + _mood + '/title/7.txt', './' + _mood + '/artist/7.txt', './' + _mood + '/img/7.jpg', './' + _mood + '/musics/7.mp3', './' + _mood + '/song_info/7.txt', './' + _mood + '/lyrics/7.txt', './' + _mood + '/artist_info/7.txt');
};

$(function () {
    // ===== 재생 이벤트 등록 =====
    $('.prev').click(function () {
        playPrev();
    });
    $('.pause').click(function () {
        pauseAndPlay();
    });

    $('.next').click(function () {
        playNext();
    });

    $('.bigsub .prev').click(function () {

        //@@@@@@수정함

        $("#sub_LP_Player").fadeIn(300);
        $("#record").css('animation', 'record_rotate 2s linear infinite');
        a = 1;

        //@@@@@@여기까지

    });

    $('.bigsub .pause').click(function () {

        //@@@@@@수정함
        if (a - 1 == 0) {
            $("#sub_LP_Player").fadeOut(600);
            $("#record").css('animation', 'record_rotate_stop 1s ease-in-out 1');
            a = 2;
        } else {
            $("#sub_LP_Player").fadeIn(300);
            $("#record").css('animation', 'record_rotate 2s linear infinite');
            a = 1;
        }

        //@@@@@@여기까지

    });

    $('.bigsub .next').click(function () {

        //@@@@@@수정함

        $("#sub_LP_Player").fadeIn(300);
        $("#record").css('animation', 'record_rotate 2s linear infinite');
        a = 1;

        //@@@@@@여기까지

    });


    // ===== 프로그래스바 채우기 =====
    setInterval(function () {
        let progress = getProgress() * 100;
        $('.player-progress > div').css('width', progress + '%');
    }, 100)
})


// ===== List에 아이템을 추가하는 함수 =====
function addItem(title, _artist, image, audio, _song_info, _lyrics, _artist_info, ) {

    let newItem = $('#example_item').clone(true);
    newItem.removeProp('id');
    newItem.show();

    // 팀별로 리스트 아이템에 맞는 클래스 정보를 찾아서 교체해주기
    // newItem.find('.item-title').text(title);
    // newItem.find('.item-artist').text(_artist);
    newItem.find('.item-img').css('background-image', "url('" + image + "')");
    newItem.find('.item-audio > source').attr('src', audio);

    // ===== text file 읽는 방법 =====교수님컨펌
    // 첫번째 해야할 것 - 파일로부터 리스트에 정보를 저장해놓는 것
    // 그 다음으로 해야할 것 - 음악 재생 시에 저장해둔 정보를 꺼내오는 것

    // get 메소드로 텍스트 정보를 song-info라는 프로퍼티에 저장

    $.get(title, function (data) {
        newItem.prop('title-info', data);
    })

    $.get(_artist, function (data) {
        newItem.prop('artist-name', data);
    })

    $.get(_song_info, function (data) {
        newItem.prop('song-info', data);
    })

    $.get(_lyrics, function (data) {
        newItem.prop('lyrics-info', data);
    })

    $.get(_artist_info, function (data) {
        newItem.prop('artist-info', data);
    })


    // 리스트 아이템 클릭시 이벤트 등록
    newItem.click(function () {
        currentAudio[0].pause(); // 재생중인 오디오 중지
        currentAudio[0].currentTime = 0; // 재생중인 오디오 위치 초기화
        $(this).find('.item-audio')[0].play(); // 선택된 오디오 재생

        //@@@@@@여기 수정함

        $("#sub_LP_Player").fadeIn(300);
        $("#record").css('animation', 'record_rotate 2s linear infinite');
        a = 1;

        //@@@@@@여기까지

        setPlayer($(this).index()); // setPlayer 함수 호출 (플레이어로 정보 전달)
    })

    // 리스트에 아이템 추가
    $('#music_list').append(newItem);
}

// ===== Player에 정보 넣는 함수 =====
function setPlayer(index) {
    currentPlaying = index;
    currentAudio = $('#music_list > .item').eq(index).find('.item-audio');

    // 아이템에 들어가는 정보에 따라 변경
    let title = $('#music_list > .item').eq(index).find('.item-title').text();
    let image = $('#music_list > .item').eq(index).find('.item-img').css('background-image');
    let _artist = $('#music_list > .item').eq(index).find('.item-artist').text();

    $('.player-img').css('background-image', image);
    $('#sub_LP_Player').css('background-image', image);


    // === 두번쨰 파트--교수님컨펌

    let __title = $('#music_list > .item').eq(index).prop('title-info');
    console.log(__title)
    $('.player-title').text(__title);
    $('.sub-player-title').text(__title);

    let __artist = $('#music_list > .item').eq(index).prop('artist-name');
    console.log(__artist)
    $('.item-artist').text(__artist);
    $('.sub-player-artist').text(__artist);

    let __song_info = $('#music_list > .item').eq(index).prop('song-info');
    console.log(__song_info)
    $('.song-info-text').text(__song_info);

    let __lyrics_info = $('#music_list > .item').eq(index).prop('lyrics-info');
    console.log(__lyrics_info)
    $('.lyrics-info-text > pre').text(__lyrics_info);

    let __artist_info = $('#music_list > .item').eq(index).prop('artist-info');
    console.log(__artist_info)
    $('.artist-info-text').text(__artist_info);


    // $('.item').eq(0).appendTo('#music_list')

    // 지금 이 몇번째 곡인가?
    // 이 곡이 4번째 곡이 되도록 하려면 몇개를 앞으로 보내거나 뒤로 보내야하는가?

    console.log("index : " + index)
    if (index > 3) {
        let count = index - 3;
        for (let i = 0; i < count; i++) {
            $('#music_list > .item').eq(0).appendTo('#music_list')
        }
    } else if (index < 3) {
        let count = 3 - index;
        for (let i = 0; i < count; i++) {
            $('#music_list > .item').eq(6).prependTo('#music_list')
        }
    }
}

// ===== 재생 컨트롤 함수 =====
function playPrev() {
    currentPlaying--;
    if (currentPlaying < 0) currentPlaying = $('#music_list > .item').length - 1;

    $('#music_list > .item').eq(currentPlaying).click();
}

function pauseAndPlay() {
    if (currentAudio[0].paused) currentAudio[0].play();
    else currentAudio[0].pause();
}

function playNext() {
    currentPlaying++;
    if (currentPlaying >= $('#music_list > .item').length) currentPlaying = 0;

    $('#music_list > .item').eq(currentPlaying).click();
}

function getProgress() {
    return currentAudio[0].currentTime / currentAudio[0].duration;
}


$('#sub_LP_Player').hide();

$('.fa-play').click(function () {
    $('.bigsub').css('opacity', '1');
    $('.info-item').hide();
    $('#subPlayer').show();

    setPlayer(3); // 0번 곡으로 초기값 설정
});

// function reload() {
//     $('.conC').load(location.href+' .conC');
//     $('.bigsub').load(location.href+' .bigsub');
// }


$('.container').click(function () {
    // $('#record').fadeOut(400);
    // setTimeout(function() {
    //     reload();
    //   }, 200);

    $('#record').removeAttr("style");
    $('.fa-play').show();
    $('#mainTonearm').removeAttr("style");
    $('.bigsub').removeAttr("style");
    $('#sub_LP_Player').hide();
});

$('#dialButton').click(function () {
    $('#sub_LP_Player').hide();
});


//index버튼

$('#songIndex').click(function () {
    $('#songIndex').toggleClass('index--opacity');
    $('#lyricsIndex').removeClass('index--opacity');
    $('#artistIndex').removeClass('index--opacity');

    if ($('#songIndex').hasClass('index--opacity')) {
        $('.info-item').hide();
        $('#subSong').show();
    } else {
        $('.info-item').hide();
        $('#subPlayer').show();
    }
});

$('#lyricsIndex').click(function () {
    $('#lyricsIndex').toggleClass('index--opacity');
    $('#songIndex').removeClass('index--opacity');
    $('#artistIndex').removeClass('index--opacity');

    if ($('#lyricsIndex').hasClass('index--opacity')) {
        $('.info-item').hide();
        $('#subLyrics').show();
    } else {
        $('.info-item').hide();
        $('#subPlayer').show();
    }
});

$('#artistIndex').click(function () {
    $('#artistIndex').toggleClass('index--opacity');
    $('#songIndex').removeClass('index--opacity');
    $('#lyricsIndex').removeClass('index--opacity');

    if ($('#artistIndex').hasClass('index--opacity')) {
        $('.info-item').hide();
        $('#subArtist').show();
    } else {
        $('.info-item').hide();
        $('#subPlayer').show();
    }
});

$('header').click(function () {
    $('#songIndex').removeClass('index--opacity');
    $('#lyricsIndex').removeClass('index--opacity');
    $('#artistIndex').removeClass('index--opacity');
})

// 플레이 눌렀을 때 애니메이션

$(".fa-play").click(function () {
    let left = $('#sub_LP').position().left - 50;
    let top = $('#sub_LP').position().top - 1250 - 50;

    $("#record").animate({
        "left": left
    }, {
        duration: 1700,
        queue: false
    });
    $("#record").animate({
        "top": top
    }, {
        duration: 1800,
        queue: false
    });
    $("#record").animate({
        "width": "500px"
    }, {
        duration: 1200,
        queue: false
    });

    $("#mainTonearm").animate({
        "left": "+=910px"
    }, {
        duration: 1700,
        queue: false
    });
    $(".fa-play").hide();
    $(".bigsub").animate({
        "bottom": "+=1250px"
    }, 1800);
    console.log('123');

    setTimeout(function () {
        if (a != 1) $("#record").css('animation', 'none');
    }, 1800);

})

$(window).resize(function () {
    if (parseInt($(".bigsub").css('bottom')) > -300) {
        let left = $('#sub_LP').position().left - 45;
        let top = $('#sub_LP').position().top - 55;

        $("#record").css({
            "left": left
        });
        $("#record").css({
            "top": top
        });
    }

})

// LP사진


$(".fa-play").click(function () {
    let left = $('#sub_LP').position().left + 50;
    let top = $('#sub_LP').position().top - 1200;

    $("#sub_LP_Player").animate({
        "left": left
    }, {
        duration: 1700,
        queue: false
    });
    $("#sub_LP_Player").animate({
        "top": top
    }, {
        duration: 1800,
        queue: false
    });


    console.log('123');

    // 노래가 재생되고 있다면
    if (a == 1) {
        $("#sub_LP_Player").delay(1700).fadeIn(300);
        $("#record").css('animation', 'record_rotate 2s linear infinite');
    }

})

//노래 재생 중에 다이얼 버튼 누르면 서브LP판 사라지게
$('#dialButton').click (function () {
    $('#sub_LP_Player').hide();
    a = 2;
})




$(window).resize(function () {
    if (parseInt($(".bigsub").css('bottom')) > -300) {
        let left = $('#sub_LP').position().left + 50;
        let top = $('#sub_LP').position().top + 50;

        $("#sub_LP_Player").css({
            "left": left
        });
        $("#sub_LP_Player").css({
            "top": top
        });
    }

})

setInterval(function () {
    if (parseInt($(".bigsub").css('bottom')) < -300) {
        $("#sub_LP_Player").hide();
    }
}, 50);


// progressbar motion 부분!


$(".pause").click(function () {
    $("#progressbar").toggleClass("progressbar-locate")
})

$(".item-img").click(function () {
    $("#progressbar").addClass("progressbar-locate")
})

$("#dialButton").click(function () {
    $("#progressbar").removeClass("progressbar-locate")
})


// 다이얼 모션 부분

$(function () {
    let angle = 0;
    $("#dialButton").click(function () {
        angle += +60;
        $("#dialIcon").css("transform", "rotate(" + angle + "deg)");

        if (angle == 0 || angle % 360 == 0) {
            $(".conA").css("background-image", "url(./img/Background/drive/Daily.jpg)");
            $("#record").attr("src", "./img/LP/drive/Daily_LP.png");
            $("h1").empty();
            $("h1").text('DAILY');
            songlist('daily');
        } else if (angle == 60 || angle % 360 == 60) {
            $(".conA").css("background-image", "url(./img/Background/drive/Mad.jpg)");
            $("#record").attr("src", "./img/LP/drive/Mad_LP.png");
            $("h1").empty();
            $("h1").text('MAD');
            songlist('mad');
        } else if (angle == 120 || angle % 360 == 120) {
            $(".conA").css("background-image", "url(./img/Background/drive/Romantic.jpg)");
            $("#record").attr("src", "./img/LP/drive/Romantic_LP.png");
            $("h1").empty();
            $("h1").text('ROMANTIC');
            songlist('romantic');

        } else if (angle == 180 || angle % 360 == 180) {
            $(".conA").css("background-image", "url(./img/Background/drive/Bright.jpg)");
            $("#record").attr("src", "./img/LP/drive/Bright_LP.png");
            $("h1").empty();
            $("h1").text('BRIGHT');
            songlist('bright');
        } else if (angle == 240 || angle % 360 == 240) {
            $(".conA").css("background-image", "url(./img/Background/drive/Chill.jpg)");
            $("#record").attr("src", "./img/LP/drive/Chill_LP.png");
            $("h1").empty();
            $("h1").text('CHILL');
            songlist('chill');
        } else {
            $(".conA").css("background-image", "url(./img/Background/drive/Gloomy.jpg)");
            $("#record").attr("src", "./img/LP/drive/Gloomy_LP.png");
            $("h1").empty();
            $("h1").text('GLOOMY');
            songlist('gloomy')
        }
    })
})

// play button toggle되는거

$(function () {
    $('.pause').click(function () {
        let origsrc = $('.changeButton').attr('src');
        let pro_origsrc = $('.pro-changeButton').attr('src');
        let src = ''

        if (origsrc == './img/bp.png') src = './img/bc.png';
        if (origsrc == './img/bc.png') src = './img/bp.png';
        $('.changeButton').attr('src', src);

        if (pro_origsrc == './img/gp.png') src = './img/gc.png';
        if (pro_origsrc == './img/gc.png') src = './img/gp.png';
        $('.pro-changeButton').attr('src', src);
    })

    $('#dialButton').click(function () {
        let origsrc = $('.changeButton').attr('src');
        let pro_origsrc = $('.pro-changeButton').attr('src');
        let src = ''

        if (origsrc == './img/bc.png') src = './img/bp.png';
        if (origsrc == './img/bp.png') src = './img/bp.png';

        $('.changeButton').attr('src', src);

        if (pro_origsrc == './img/gc.png') src = './img/gp.png';
        if (pro_origsrc == './img/gp.png') src = './img/gp.png';
        $('.pro-changeButton').attr('src', src);
    })

    $('.item-img').click(function () {
        $('.changeButton').attr('src', './img/bc.png');
        $('.pro-changeButton').attr('src', './img/gc.png');
    })
})









// $('#rotate_images').on({
//     'click': function () {
//         var origsrc = $(this).attr('src');
//         var src = '';
//         if (origsrc == 'img1_on.png') src = 'img2_on.png';
//         if (origsrc == 'img2_on.png') src = 'img3_on.png';
//         if (origsrc == 'img3_on.png') src = 'img1_on.png';
//         $(this).attr('src', src);
//     }
// })

// if($("#changeButton").attr("src","./img/gp.png") == true){
//         $("#changeButton").attr("src","./img/gc.png");
//     } else {
//         $("#changeButton").attr("src","./img/gp.png")
//     }

//    -----------------------아티스트인덱스

/* 언젠간 쓰일문법일수도 있으니 보관즁...  
   $("#songIndex").click(function(){
       $('#musicInfo').css('opacity' , '1');
       $('#SubPlayer').css('opacity' , '0');
       $('#musicTxt').css('opacity' , '0');
       $('#artistInfo').css('opacity' , '0');      
   });
   
     $("#lyricsIndex").click(function(){
       $('#musicInfo').css('opacity' , '0');
       $('#SubPlayer').css('opacity' , '0');
       $('#musicTxt').css('opacity' , '1');
       $('#artistInfo').css('opacity' , '0');      
   });
   
     $("#artistIndex").click(function(){
       $('#musicInfo').css('opacity' , '0');
       $('#SubPlayer').css('opacity' , '0');
       $('#musicTxt').css('opacity' , '0');
       $('#artistInfo').css('opacity' , '1');      
   });
*/
// //index버튼

/*       $("#songIndex").click(function(){
        $('#musicInfo').toggleClass('selected');

        if( $("#musicInfo").hasClass('selected') ){
            $('#musicInfo').css('opacity' , '1');
        }else{
            $('#musicInfo').css('opacity' , '0');

        }
    });

      $("#songIndex").click(function(){
        $('#SubPlayer').toggleClass('selected');

        if( $("#SubPlayer").hasClass('selected') ){
            $('#SubPlayer').css('opacity' , '0');
        }else{
            $('#SubPlayer').css('opacity' , '1');

        }
    });

// --------------곡인덱스

  $("#lyricsIndex").click(function(){
    $('#musicTxt').toggleClass('selected');

    if( $("#musicTxt").hasClass('selected') ){
        $('#musicTxt').css('opacity' , '1');
    }else{
        $('#musicTxt').css('opacity' , '0');

    }
});

  $("#lyricsIndex").click(function(){
    $('#SubPlayer').toggleClass('selected');

    if( $("#SubPlayer").hasClass('selected') ){
        $('#SubPlayer').css('opacity' , '0');
    }else{
        $('#SubPlayer').css('opacity' , '1');

    }
});

// -------------가사인덱스

  $("#artistIndex").click(function(){
    $('#artistInfo').toggleClass('selected');

    if( $("#artistInfo").hasClass('selected') ){
        $('#artistInfo').css('opacity' , '1');
    }else{
        $('#artistInfo').css('opacity' , '0');

    }
});

  $("#artistIndex").click(function(){
    $('#SubPlayer').toggleClass('selected');

    if( $("#SubPlayer").hasClass('selected') ){
        $('#SubPlayer').css('opacity' , '0');
    }else{
        $('#SubPlayer').css('opacity' , '1');

    }
});

     */