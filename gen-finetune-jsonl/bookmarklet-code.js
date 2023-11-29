javascript: (function () {
    // Function to display a toast message
    function showToast(message) {
        var toast = document.createElement('div');
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: '1000',
            fontSize: '14px'
        });
        document.body.appendChild(toast);
        setTimeout(function () { document.body.removeChild(toast); }, 3000);
    }

    console.log('Checking URL...');
    // Check the URL
    if (window.location.href.startsWith('https://platform.openai.com/playground')) {
        console.log('URL is correct.');
        // Select the button with XPath
        var xpath = "//button[contains(., 'View code')]";
        var viewCodeButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (viewCodeButton) {
            console.log('View code button found.');
            viewCodeButton.click();

            setTimeout(function () {
                var modalContent = document.querySelector('.modal-body');
                if (modalContent) {
                    console.log('Modal content found.');
                    // Select JSON in the dropdown
                    var select = document.querySelector('.code-sample-select.api-code-lang-select');
                    if (select) {
                        console.log('Dropdown found.');
                        select.value = 'json';
                        var event = new Event('change', { bubbles: true });
                        select.dispatchEvent(event);
                    }

                    var text = modalContent.innerText;
                    // find first { and last }
                    var jsonPart = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
                    jsonPart = JSON.parse(jsonPart);
                    // stringify the messages array
                    var messages = JSON.stringify(jsonPart['messages']);
                    console.log('messages', messages);
                    // formattedContent is a JSON object with a messages array as value for the key "messages"
                    var formattedContent = JSON.stringify({ "messages": JSON.parse(messages) });
                    // minify the JSON
                    console.log(JSON.parse(formattedContent));

                    var textArea = document.createElement('textarea');
                    textArea.value = formattedContent;
                    document.body.appendChild(textArea);
                    textArea.select();
                    navigator.clipboard.writeText(textArea.value)
                        .then(() => {
                            console.log('Content copied to clipboard.');
                            document.body.removeChild(textArea);
                            showToast('Finetune example was copied to clipboard');
                            // Dismiss the modal
                            var closeButton = document.querySelector('.modal-footer button');
                            if (closeButton) closeButton.click();

                            // download a text file with the content
                            var element = document.createElement('a');
                            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(formattedContent));
                            // create a hash for the filename based on the text
                            var hash = 0, i, chr;
                            if (formattedContent.length === 0) hash = 1;
                            for (i = 0; i < formattedContent.length; i++) {
                                chr = formattedContent.charCodeAt(i);
                                hash = ((hash << 5) - hash) + chr;
                                hash |= 0; // Convert to 32bit integer
                            }
                            element.setAttribute('download', 'openai-ft-example-'+hash+'.json');
                            element.style.display = 'none';
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                            showToast('Finetune example was downloaded and copied to clipboard');
                        })
                        .catch((error) => {
                            console.error('Failed to copy text: ', error);
                            showToast('Error copying to clipboard');
                        });
                }
            }, 1000);
        } else {
            showToast('Button with "View Code" not found');
        }
    } else {
        showToast('This bookmarklet only works on https://platform.openai.com/playground');
    }
})();