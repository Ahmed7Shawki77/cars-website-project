<><script>
    let btn = document.getElementById("toggleMode");

    btn.onclick = function() {document.body.classList.toggle("light")};
    ;
</script>
<script>
        let popup = document.getElementById("popup");
        let popupImg = document.getElementById("popup-img");

        document.querySelectorAll(".car img").forEach(img => {img.onclick = function () {
            popup.style.display = "flex";
            popupImg.src = this.src;
        } };
        );

        popup.onclick = function() {popup.style.display = "none"};
        ;
    </script></>