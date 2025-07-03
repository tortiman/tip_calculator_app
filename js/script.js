document.addEventListener('DOMContentLoaded',()=>{
    const moneyId=document.getElementById('moneyId');
    const _5Percent=document.getElementById('5Id');
    const _10Percent=document.getElementById('10Id');
    const _15Percent=document.getElementById('15Id');
    const _25Percent=document.getElementById('25Id');
    const _50Percent=document.getElementById('50Id');
    const customId=document.getElementById('customId');
    const errorId=document.getElementById('errorId');
    const numberPeopleId=document.getElementById('numberPeopleId');
    const quantityPersonId=document.getElementById('quantityPersonId')
    const totalQuantityId=document.getElementById('totalQuantityId');
    const resetId=document.getElementById('resetId');
    
    let percentage='';
    let valuePercentage=0;
    // let valueCustom=0;
    /* --- LISTENERS ---*/
    
    const gridButtons=document.querySelectorAll('.button-normal');
    let buttonPressed=false;
    
    gridButtons.forEach(function(button){
            button.addEventListener('click',function(){
                gridButtons.forEach(function(btn){
                    btn.style.backgroundColor='hsl(183, 100%, 15%)';

                })
                buttonPressed=true;
                button.style.backgroundColor='hsl(172, 67%, 45%)';
                percentage=button.textContent;
                console.log('boton presionado en grid',button.textContent);
                principal();
            });
        });

    moneyId.addEventListener('input',()=>{
        if(validatorNumberNoZeroOrNegative(moneyId.value)){
            principal();
        }else{
            resetScreen();
        }
    });

    numberPeopleId.addEventListener('input',()=>{
        if(numberPeopleNoZeroOrNegative(numberPeopleId.value)){
            errorId.style.visibility='hidden';
        }else{
            errorId.style.visibility='visible';
            principal();
        }
    });

    resetId.addEventListener('click',()=>{
        resetScreen();
    })

    customId.addEventListener('input',()=>{
        if(customNoZeroOrNegative(customId.value)){
            percentage=customId.value;
            principal();
        }
    });

    /* --- END LISTENERS --- */

    /* --- PRINCIPAL FUNCTION ---*/

    function principal(){
        if(validatorNumberNoZeroOrNegative(moneyId.value) && numberPeopleNoZeroOrNegative(numberPeopleId.value) && (pressButton() || customNoZeroOrNegative(customId.value))){
            console.log('entra en la funcion principal',totalPerson());
            totalQuantityId.textContent=`$${totalPerson()}`;
            quantityPersonId.textContent=`$${tipAmountPerson()}`;
        }else{
            console.log('No se cumplen todas las condiciones');
        }
    }

    /* --- END PRINCIPAL FUNCTION ---*/
    

    function totalPerson(){
        // const total=0;
        console.log(percentage);
        
        if (percentage ==='5%'){
            valuePercentage=1.05;
        }else if (percentage ==='10%')
        {
            valuePercentage=1.1;
         }else if (percentage ==='15%')
         {
            valuePercentage=1.15;
         }else if (percentage ==='25%')
         {
            valuePercentage=1.25;
         }else if (percentage ==='50%')
         {
            valuePercentage=1.5;
        }else{
             valuePercentage=(parseInt(percentage)/100)+1;
             console.log(valuePercentage);
          }
        console.log('porcentaje antes del retorno', valuePercentage);
         return ((moneyId.value*valuePercentage)/numberPeopleId.value).toFixed(2);
    }

    function tipAmountPerson(){
        console.log(valuePercentage)
        return ((moneyId.value*valuePercentage-moneyId.value)/(numberPeopleId.value)).toFixed(2);
    }

    function resetScreen(){
        moneyId.value='';
        numberPeopleId.value='';
        quantityPersonId.textContent='$0.00';
        totalQuantityId.textContent='$0.00';
        gridButtons.forEach(function(button){
            button.style.backgroundColor='hsl(183, 100%, 15%)';
        })
    }

    /** --- VALIDATORS FUNCTIONS */

    function validatorNumberNoZeroOrNegative(value){
        return !isNaN(value) && Number(value)>0;
    }
    function numberPeopleNoZeroOrNegative(number){
        return !isNaN(number) && Number(number)>0;
    }

    function pressButton(){
        return buttonPressed;
    }

    function customNoZeroOrNegative(value){
        console.log(value);
        return !isNaN(value) && Number(value)>0;
    }

    /** ---END VALIDATORS FUNCTIONS */

});