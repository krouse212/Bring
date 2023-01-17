export default class Form {
    constructor(forms){
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Load...',
            success: 'Success!',
            failure: 'Fail'
        };
        this.path = 'assets/question.php';
    }

    async postData(url, data) {
        let res = await fetch (url, {
                method: "POST",
                body: data
        });

        return await res.text();
    }

    init(){
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessege = document.createElement('div');
                statusMessege.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;`
                item.parentNode.appendChild(statusMessege);

                statusMessege.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessege.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessege.textContent = this.message.failure;
                    });
            });
        });
    }
}