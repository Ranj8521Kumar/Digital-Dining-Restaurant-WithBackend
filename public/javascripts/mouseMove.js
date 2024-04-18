function changeSizeOfCircleOnMove() {
    var xScale = 1;
    var yScale = 1;

    var xPrev = 0;
    var yPrev = 0;

    var timer; // Declare timer variable outside the event listener

    window.addEventListener('mousemove', function(det) {
        clearTimeout(timer);

        var xDiff = det.clientX - xPrev;
        var yDiff = det.clientY - yPrev;

        xScale = gsap.utils.clamp(0.8, 1.2, xDiff);
        yScale = gsap.utils.clamp(0.8, 1.2, yDiff);

        xPrev = det.clientX;
        yPrev = det.clientY;

        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const mouseX = det.clientX + scrollX;
        const mouseY = det.clientY + scrollY;

        mouseFollower(xScale, yScale, mouseX, mouseY);

        timer = setTimeout(function() {
            document.querySelector('.mini-circle').style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1, 1)`;
        }, 100);
    })
}

function mouseFollower(xScale, yScale, mouseX, mouseY) {
    document.querySelectorAll('.mini-circle')[0].style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${xScale},${yScale})`;
}

changeSizeOfCircleOnMove();
