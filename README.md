# gen-finetune-jsonl
Browser Extension/bookmarklet to quickly generate a finetuning example

To use, create new bookmark in your browser with the following code as the content:
```js
javascript:(function(){var b=document.querySelectorAll('button'),f=!1;for(var i=0;i<b.length;i++){if(b[i].textContent.trim().includes('View code')){b[i].click();f=!0;break;}}if(f){setTimeout(function(){var m=document.querySelector('.modal-body');if(m){var t=m.innerText,s=t.indexOf('"messages": ['),e=t.indexOf(']',s)+1,mC=t.substring(s,e),fC='{'+mC.replace(/\n/g,'\\n').replace(/\t/g,'\\t')+'}',tA=document.createElement('textarea');tA.value=fC;document.body.appendChild(tA);tA.select();document.execCommand('copy');document.body.removeChild(tA);var toast=document.createElement('div');toast.textContent='Finetune example was copied to clipboard';Object.assign(toast.style,{position:'fixed',bottom:'20px',left:'50%',transform:'translateX(-50%)',backgroundColor:'black',color:'white',padding:'10px',borderRadius:'5px',zIndex:'1000',fontSize:'14px'});document.body.appendChild(toast);setTimeout(function(){document.body.removeChild(toast);},3000);var cB=document.querySelector('.modal-footer button');if(cB)cB.click();}},1000);}else{console.log('Button with "View Code" not found');}})();
```

Bookmarklet code: https://gist.github.com/dhruv-anand-aintech/e56219d16bb0b5d6d8321b4b15b85d07
