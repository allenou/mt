window.onload = function () {
    var file = document.querySelector('#file')
    file.addEventListener('change', function (e) {
        var blob = e.target.files[0]
        var reader = new FileReader();
        reader.readAsText(blob, 'UTF-8')
        reader.onload = function () {
            document.querySelector('.content').innerHTML = marked(this.result)
        }
    })

    var covert = document.querySelector('.covert')
    covert.addEventListener('click', function (e) {
        var event = e || window.event
        var type = event.target.textContent
        if (event.target.tagName === 'LI') {
            toCanvas(type,document.querySelector('.content'))
        }
    })
    function toCanvas(type, element) {
        html2canvas(element).then(function (canvas) {
            document.body.appendChild(canvas);
            toImage(type)
        });
    }
    function toImage(type) {
        const canvas = document.querySelector('canvas');
        download(canvas.toDataURL("image/" + type))
    }
    function download(dataUrl) {
        var tag = document.createElement("a");
        tag.download = 'test';
        tag.style.display = "none";
        tag.href = dataUrl;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }

}