let changeColor = document.querySelector('#changeColor');

chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color;
})

changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setPageBackgroundColor
  })
})

function setPageBackgroundColor(){
  chrome.storage.sync.get('color', function({ color }){
    document.body.style.backgroundColor = color;
  })
}