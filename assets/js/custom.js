
//imageProgress
function imagesProgress() {
    var $container = $("#progress"),
        $progressBar = $container.find(".progress-bar"),
        $progressText = $container.find(".progress-text"),
        imgLoad = imagesLoaded("body"),
        imgTotal = imgLoad.images.length,
        imgLoaded = 0,
        current = 0,
        progressTimer = setInterval(updateProgress, 1000 / 60);

    imgLoad.on("progress", function () {
        imgLoaded++;
    });

    function updateProgress() {
        var target = (imgLoaded / imgTotal) * 100;

        current += (target - current) * 0.1;
        $progressBar.css({
            width: current + '%'
        });
        $progressText.text(Math.floor(current) + '%');

        if (current >= 100) {
            clearInterval(progressTimer);
            $progressBar.add($progressText)
                .delay(500)
                .animate({opacity: 0}, 250, function () {
                    $container.animate({opacity: '0'}, 1000, 'easeInOutQuint');
                });
            $("body").addClass("active");
        }
        if (current > 99.9) {
            current = 100;
        }
    }
};




//메인 로고 애니메이션 효과
$(window).scroll(function(){
    var wScroll = $(this).scrollTop();
    //console.log(wScroll)

    if (wScroll >= $("#section1").offset().top - $(window).height()/2) {
        $("#section1 sec1").addClass("show");
    }
});

//이미지 애니메이션효과
$(window).scroll(function(){
    var wScroll = $(this).scrollTop();
    //console.log(wScroll)

    if (wScroll >= $("#section5").offset().top - $(window).height()/2) {
        $("#section5 .sec5").addClass("show");
    }
});

var path = document.querySelector(".rect4");
var total_length = path.getTotalLength();
//alert(total_length);
