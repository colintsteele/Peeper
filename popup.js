var port = chrome.runtime.connect();

function hello(greeting) {
  console.log('Hello from your content script!');
}
