document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(['savedImages'], (result) => {
    if (result.savedImages) {
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = "";
      
      result.savedImages.forEach((imageUrl) => {
        const wrapper = document.createElement("div");
        wrapper.className = "image-wrapper";

        const img = document.createElement("img");
        img.src = imageUrl;
        
        const downloadBtn = document.createElement("button");
        downloadBtn.className = "download-btn";
        downloadBtn.textContent = "Save";
        downloadBtn.onclick = () => {
          // 画像をダウンロード
          const link = document.createElement('a');
          link.href = imageUrl;
          // URLから画像のファイル名を抽出
          const filename = imageUrl.split('/').pop().split('?')[0] + '.jpg';
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        wrapper.appendChild(img);
        wrapper.appendChild(downloadBtn);
        imageContainer.appendChild(wrapper);
      });
    }
  });
});