let formValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        formValidator.clearErrors();

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let check = formValidator.checkInput(input);

            if(check !== true){
                send = false;
                formValidator.showError(input, check);
            }
        }


        if(send){
            form.submit();
        }
    },

    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let ruleDetails = rules[k].split('=');
                switch (ruleDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatório.';
                        }
                        break;

                    case 'min':
                        if(input.value.length < ruleDetails[1]){
                            return 'Precisa de no mínimo '+ruleDetails[1]+' caracteres. ' 
                        }
                        break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                            if(!regex.test(input.value.toLowerCase())){
                                return 'Insira um e-mail válido.';
                            }
                        }
                        break;
                }
            }
        }  

        return true;
    },

    showError:(input, error)=>{
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style.borderColor = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.formValidator');
form.addEventListener('submit', formValidator.handleSubmit);